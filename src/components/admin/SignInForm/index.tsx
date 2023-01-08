import { useState } from 'react';
import { useRouter } from 'next/router';
import styled from '@emotion/styled';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { TextField, Button } from '@mui/material';
import { auth } from '@/lib/firebase';

const FormGroup = styled.div`
  display: flex;
  margin-bottom: 1rem;
  width: 480px;
  & > label {
    width: 20%;
  }
  & > input {
    flex-grow: 1;
  }
`;

type SignInFormProps = {
  redirectTo: string;
};

const SignInForm = ({ redirectTo }: SignInFormProps) => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push(redirectTo);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form onSubmit={signin}>
      <FormGroup>
        <TextField
          type="email"
          label="Email"
          placeholder="example@example.com"
          fullWidth
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          type="password"
          label="Password"
          fullWidth
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <div>
        <Button variant="contained" color="primary" type="submit">
          Sign In
        </Button>
      </div>
    </form>
  );
};

export { SignInForm };
