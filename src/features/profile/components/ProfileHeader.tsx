import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { H3 } from '@/components/typography/H3';
import { P } from '@/components/typography/P';
import { User } from '@supabase/supabase-js';
import { format } from 'date-fns';
import { Calendar, Mail, Phone, Shield } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ProfileHeaderProps = {
  user: User;
};

function ProfileHeader({ user }: ProfileHeaderProps) {
  const t = useTranslations('profile');
  const userInitials =
    user.email?.split('@')[0].slice(0, 2).toUpperCase() || 'U';

  const displayName =
    user.user_metadata?.first_name && user.user_metadata?.last_name
      ? `${user.user_metadata.first_name} ${user.user_metadata.last_name}`
      : user.user_metadata?.name || user.email?.split('@')[0];

  return (
    <div className='flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left'>
      <Avatar className='ring-primary/20 h-20 w-20 ring-2'>
        <AvatarImage
          src={user.user_metadata?.avatar_url}
          alt='Profile picture'
          className='object-cover'
        />
        <AvatarFallback className='bg-primary/5 text-primary text-xl font-bold'>
          {userInitials}
        </AvatarFallback>
      </Avatar>

      <div className='flex-1 space-y-2'>
        <div>
          <H3>{displayName}</H3>
          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4'>
            <div className='flex items-center gap-1'>
              <Mail className='text-muted-foreground h-4 w-4' />
              <P>{user.email}</P>
            </div>

            {user.user_metadata?.phone && (
              <div className='flex items-center gap-1'>
                <Phone className='text-muted-foreground h-4 w-4' />
                <P>{user.user_metadata.phone}</P>
              </div>
            )}
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          <Badge variant='secondary' className='flex items-center gap-1'>
            <Shield className='h-3 w-3' />
            {user.email_confirmed_at
              ? t('status.verified')
              : t('status.unverified')}
          </Badge>

          <Badge variant='outline' className='flex items-center gap-1'>
            <Calendar className='h-3 w-3' />
            {t('status.joined', {
              date: format(new Date(user.created_at), 'MMM yyyy'),
            })}
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
