import React, { VFC, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import { auth } from '@/lib/firebase';
import { SignInForm } from "@/components/admin/SignInForm";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  height: 100vh;
  background-color: #444;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  margin: 4rem auto;
  padding: 2rem;

  width: 640px;
  max-width: 640px;
  height: 320px;

  background-color: #fff;

  border-radius: 0.25rem;
  box-shadow: 0px 0px 0.5rem 0.25rem rgb(0 0 0 / 10%);
`;

const H1 = styled.div`
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: bold;
  line-height: 4rem;
`;

const AdminSigninIndexPage: VFC = () => {
  const router = useRouter();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user && router.push('/admin');
    });
  });

  return (
    <Wrapper>
      <Container>
        <H1>Sign In</H1>
        <SignInForm redirectTo="/admin" />
      </Container>
    </Wrapper>
  );
};

export default AdminSigninIndexPage;
