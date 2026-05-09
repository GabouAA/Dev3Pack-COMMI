import Navbar from '@/components/layout/Navbar';
import UserProfile from '@/components/ui/profile/UserProfile';

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <UserProfile />
    </div>
  );
}
