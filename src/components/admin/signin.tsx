import { VFC } from 'react';
import styled from 'styled-components';

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

const Signin: VFC = () => {
  return (
    <Wrapper>
      <Container>
        <H1>Sign In</H1>
        <SignInForm redirectTo="/admin" />
      </Container>
    </Wrapper>
  );
};

export { Signin };
