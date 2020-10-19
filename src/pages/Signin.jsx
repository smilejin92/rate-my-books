import React from 'react';
import styled from 'styled-components';
import SigninForm from '../components/SigninForm';

const FlexMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 876px) {
    background-color: #fafafa;
  }
`;

const a11yHidden = `
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  background-color: blue;
  clip: rect(0, 0, 0, 0);
  clip-path: polygon(0 0, 0 0, 0 0);
`;

const A11yHiddenH1 = styled.h1`
  ${a11yHidden}
`;

const A11yHiddenH2 = styled.h2`
  ${a11yHidden}
`;

const SigninSection = styled.section`
  position: relative;
  height: 100vh;
`;

const Signin = () => (
  <FlexMain>
    <A11yHiddenH1>로그인 페이지</A11yHiddenH1>
    <SigninSection>
      <A11yHiddenH2>로그인</A11yHiddenH2>
      <SigninForm />
    </SigninSection>
  </FlexMain>
);

export default Signin;
