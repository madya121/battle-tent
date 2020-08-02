import React from 'react';
import TextFieldBg from '../../../assets/images/ui/text_field_bg.png';
import styled from 'styled-components';

export default function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <InputContainer>
      <input {...props} />
    </InputContainer>
  );
}

export const InputContainer = styled.div`
  background-image: url(${TextFieldBg});
  background-size: contain;
  background-repeat: no-repeat;
  padding: 8px 24px;
  input {
    background: transparent;
    font-family: inherit;
    border: none;
    text-align: center;
    font-size: 20px;
    ::placeholder {
      color: #c39a77;
    }
    :focus {
      outline: none;
    }
  }
`;
