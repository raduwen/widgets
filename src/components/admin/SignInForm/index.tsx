import React, { VFC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { auth } from '@/lib/firebase';

const Button = styled.button`
  padding: 0.5rem 1rem;
  color: #fff;
  background-color: #33bbff;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #1188dd;
  }
`;

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

const Input = styled.input`
  outline: 1px solid #eee;
  padding: 0.25rem 0.5rem;
`;

type SignInFormProps = {
  redirectTo: string;
};

const SignInForm: VFC<SignInFormProps> = ({ redirectTo }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form onSubmit={signin}>
      <FormGroup>
        <label>Email</label>
        <Input
          type="email"
          placeholder="example@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <label>Password</label>
        <Input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormGroup>
      <div>
        <Button type="submit">
          Sign In
        </Button>
      </div>
    </form>
  );
};

export { SignInForm };
