import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getUser } from '@/supabase/data/user-service';
import ChangePasswordForm from './ChangePasswordForm';
import ProfileForm from './ProfileForm';

async function ProfileContent() {
  const user = await getUser();
  if (!user) throw new Error('User not found');

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and profile picture. Changes will be
            reflected across your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm user={user} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>
            We&apos;ll send a password reset link to your email address. Click
            the link to securely update your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </>
  );
}

export default ProfileContent;
