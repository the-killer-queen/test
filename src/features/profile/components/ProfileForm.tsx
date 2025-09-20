'use client';

import SubmitButton from '@/components/shared/SubmitButton';
import UploadImage from '@/components/shared/UploadImage';
import { H3 } from '@/components/typography/H3';
import { P } from '@/components/typography/P';
import { Badge } from '@/components/ui/badge';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { updateProfile } from '@/supabase/data/user-service';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { Calendar, Mail, ShieldCheck, ShieldX, UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { updateProfileSchema, UpdateProfileSchema } from '../schema';

type ProfileFormProps = {
  user: User;
};

function ProfileForm({ user }: ProfileFormProps) {
  const [firstName, ...lastName] = user.user_metadata?.full_name?.split(' ');
  const form = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      first_name: firstName || '',
      last_name: lastName?.join(' ') || '',
      phone: user.user_metadata?.phone || '',
      avatar: undefined,
    },
  });

  async function onSubmit(values: UpdateProfileSchema) {
    const { success, error } = await updateProfile(values);

    if (success) {
      toast.success('Profile updated successfully!');
      form.reset({
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        avatar: undefined,
      });
    }

    if (!success) toast.error(error);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
        {/* Avatar Upload */}
        <FormField
          name='avatar'
          control={form.control}
          render={({ field, fieldState: { error } }) => (
            <FormItem>
              <FormControl>
                <div className='flex flex-col items-center gap-2 text-center sm:flex-row sm:text-left'>
                  <UploadImage
                    avatarFallback='FA'
                    isAvatar={true}
                    error={error}
                    {...field}
                    defaultImageURL={user.user_metadata?.picture}
                  />

                  <div className='flex flex-col gap-2'>
                    <div>
                      <H3 className='capitalize'>
                        {user.user_metadata.full_name}
                      </H3>
                      <div className='flex items-center gap-1'>
                        <Mail className='text-muted-foreground h-4 w-4' />
                        <P>{user.email}</P>
                      </div>
                    </div>

                    <div className='flex flex-wrap gap-2'>
                      <Badge variant='secondary'>
                        {user.user_metadata.email_verified ? (
                          <ShieldCheck />
                        ) : (
                          <ShieldX />
                        )}

                        {user.email_confirmed_at ? 'Verified' : 'Unverified'}
                      </Badge>

                      <Badge variant='outline'>
                        <Calendar />
                        Joined {format(new Date(user.created_at), 'MMM yyyy')}
                      </Badge>
                    </div>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Name Fields */}
        <div className='grid grid-cols-1 gap-2 sm:grid-cols-2'>
          <FormField
            name='first_name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your first name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name='last_name'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter your last name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='flex w-full items-end gap-2'>
          {/* Phone Field */}
          <FormField
            name='phone'
            control={form.control}
            render={({ field }) => (
              <FormItem className='flex-1'>
                <FormLabel>Phone Number (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter your phone number'
                    type='tel'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <SubmitButton
            icon={<UserIcon />}
            className='w-min'
            label='Update Profile'
            loadinglabel='Updating...'
            isLoading={form.formState.isSubmitting}
          />
        </div>
      </form>
    </Form>
  );
}

export default ProfileForm;
