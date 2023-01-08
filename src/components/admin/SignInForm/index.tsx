import { useRef } from 'react';
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
  const emailRef= useRef(null);
  const passwordRef = useRef(null);

  const signin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value);
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
          inputRef={emailRef}
        />
      </FormGroup>
      <FormGroup>
        <TextField
          type="password"
          label="Password"
          fullWidth
          inputRef={passwordRef}
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
