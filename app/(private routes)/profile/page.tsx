// app/(private routes)/profile/page.tsx





import { Metadata } from 'next';


import ProfileClient from '@/app/(private routes)/profile/ProfileClient';


import { serverAuthApi } from '@/lib/api/serverApi';

export const metadata: Metadata = {
  title: 'User Profile - NoteHub',
  description: 'View and manage your profile information',
};

export default async function ProfilePage() {
  const user = await serverAuthApi.getSession();

  if (!user) {
    return <div>Not authenticated</div>;
  }

  return <ProfileClient user={user} />;
}