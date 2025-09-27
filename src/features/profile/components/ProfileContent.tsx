import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getUser } from '@/supabase/data/user-service';
import { getTranslations } from 'next-intl/server';
import ChangePasswordForm from './ChangePasswordForm';
import ProfileForm from './ProfileForm';

async function ProfileContent() {
  const t = await getTranslations('profile');
  const user = await getUser();
  if (!user) throw new Error(t('errors.userNotFound'));

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t('personalInfo.title')}</CardTitle>
          <CardDescription>{t('personalInfo.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm user={user} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t('changePassword.title')}</CardTitle>
          <CardDescription>{t('changePassword.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm />
        </CardContent>
      </Card>
    </>
  );
}

export default ProfileContent;
