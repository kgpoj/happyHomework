import styled from "styled-components";

export const Button = styled.button`
  color: white;
  height: 100%;
  width: 15%;
  background-color: #1677ff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all .2s cubic-bezier(.645, .045, .355, 1);

  &:hover {
    background-color: #4096ff
  }
`