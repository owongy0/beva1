import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex justify-center pt-16">
      <SignIn fallbackRedirectUrl="/bookings" />
    </div>
  );
}
