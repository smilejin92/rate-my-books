import React, { useCallback, useState, useMemo } from 'react';
import axios from 'axios';
import styled, { css } from 'styled-components';
import { Alert } from 'antd';
import posterImage from '../assets/posterImage.jpg';
import { useHistory } from 'react-router-dom';

const Form = styled.form`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-50%, -50%);
  font-size: 1.8rem;
  background-color: #fff;

  @media screen and (min-width: 876px) {
    display: flex;
    width: 64rem;
    align-items: center;
    background-color: #fff;
  }
`;

const Poster = styled.div`
  @media screen and (min-width: 876px) {
    width: 50%;
    height: 47rem;
    background-image: url(${posterImage});
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: contain;
  }
`;

const Fieldset = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 32rem;
  padding: 1rem;
  padding-top: 2rem;

  @media screen and (min-width: 876px) {
    width: 50%;
  }
`;

const Legend = styled.legend`
  margin-bottom: 3rem;
  font-size: 3.5rem;
  text-align: center;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  padding: 0 1rem;
`;

const Field = styled.p`
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem 0;
  padding-left: 1rem;
  background: #fafafa;
  border-radius: 0.2rem;
  border: 1px solid rgb(219, 219, 219);
  font-size: 1.5rem;

  &:focus {
    outline: none;
    border-color: rgb(168, 168, 168);
  }
`;

const SigninBtn = styled.button`
  padding: 0.7rem 0;
  margin-top: 1rem;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  background: rgba(0, 149, 246, 0.3);

  ${({ clickable }) =>
    clickable &&
    css`
      background: rgb(0, 149, 246);
    `}
`;

const Error = styled(Alert).attrs(() => ({
  type: 'error',
}))`
  position: absolute;
  bottom: -7rem;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
`;

export default function SigninForm() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [invalidated, setInvalidated] = useState({
    value: false,
    message: '',
  });

  const errorMessage = useMemo(
    () => ({
      PASSWORD_NOT_MATCH: '비밀번호가 일치하지 않습니다.',
      USER_NOT_EXIST: '존재하지 않는 사용자입니다.',
      UNKNOWN: '다음에 다시 시도해주세요.',
    }),
    [],
  );

  const history = useHistory();

  const handleChange = useCallback(({ target }) => {
    setInput((prevInput) => ({
      ...prevInput,
      [target.id]: target.value,
    }));
  }, []);

  const handleClick = useCallback(
    async (e) => {
      e.preventDefault();
      console.log(input);

      try {
        const { email, password } = input;
        const { data } = await axios.post('https://api.marktube.tv/v1/me', {
          email,
          password,
        });

        setInvalidated({
          value: false,
          message: '',
        });

        console.log(data.token);
        localStorage.setItem('token', data.token);
        history.push('/');
      } catch (error) {
        const type = error?.response?.data?.error || 'UNKNOWN';
        const message = errorMessage[type];

        setInvalidated({
          value: true,
          message,
        });

        console.error(error);
      }
    },
    [input, errorMessage, history],
  );

  return (
    <Form>
      <Poster />
      <Fieldset role="group">
        <Legend>Rate My Books</Legend>
        <FlexBox direction="column">
          <Field>
            <label htmlFor="email" aria-label="email">
              <Input
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </label>
          </Field>
          <Field>
            <label htmlFor="password" aria-label="password">
              <Input
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </label>
          </Field>
          <SigninBtn
            disabled={!input.email || !input.password}
            clickable={input.email && input.password}
            onClick={handleClick}
          >
            Sign in
          </SigninBtn>
        </FlexBox>
        {invalidated.value && <Error message={invalidated.message} showIcon />}
      </Fieldset>
    </Form>
  );
}
