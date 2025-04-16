import React from 'react';
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

export default function App() {
  return (
    <div className="App">
      <header>
        <h1>Welcome to StayEase!</h1>
        
        <SignedOut>
          <p>You are not signed in.</p>
          <SignInButton />
        </SignedOut>
        
        <SignedIn>
          <p>You are signed in!</p>
          <UserButton />
        </SignedIn>
      </header>
    </div>
  );
}
