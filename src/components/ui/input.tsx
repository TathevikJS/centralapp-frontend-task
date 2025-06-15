import styled from "styled-components";
import { colors } from "@/styles/global";

export const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  color: ${colors.text};
  background: transparent;
  outline: none;
  
  &::placeholder {
    color: ${colors.textLight};
  }
`;