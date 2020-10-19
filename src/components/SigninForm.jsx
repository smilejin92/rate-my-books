import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import posterImage from '../assets/posterImage.jpg';

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

  ${(props) =>
    props.clickable &&
    css`
      background: rgb(0, 149, 246);
    `}
`;

export default function SigninForm() {
  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const handleChange = useCallback(({ target }) => {
    setInput((prevInput) => ({
      ...prevInput,
      [target.id]: target.value,
    }));
  }, []);

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      console.log(input);
    },
    [input],
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
      </Fieldset>
    </Form>
  );
}
