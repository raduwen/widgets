import React, { VFC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase';

type SignInFormProps = {
  redirectTo: string;
};

const SignInForm: VFC<SignInFormProps> = ({ redirectTo }) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
      router.push(redirectTo);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form onSubmit={signin}>
      <div>
        <label>Email</label>
        <input
          type="email"
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">
          Sign In
        </button>
      </div>
    </form>
  );
};

export { SignInForm };
