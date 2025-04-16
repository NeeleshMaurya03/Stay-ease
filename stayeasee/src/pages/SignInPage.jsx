import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-green-50">
      <div className="p-6 rounded-lg shadow-lg bg-white">
        <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
};

export default SignInPage;
