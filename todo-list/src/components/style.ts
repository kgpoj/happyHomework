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
export const Checkbox = styled.input.attrs(props => ({
    type: 'checkbox',
    checked: props.checked || false
}))`
  position: relative;
  overflow: visible;
  width: 0;
  padding: 0;
  border: 0;
  margin: 0 30px 0 10px;


  &::after {
    transform: translate(-25%, -25%);
    content: " ";
    display: inline-block;
    width: 23px;
    height: 23px;
    background-color: rgb(255, 255, 255);
    border-width: 1px;
    border-style: solid;
    border-color: ${props => props.checked ? 'rgb(121, 190, 173)' : '#ccc'};
    border-radius: 50%;
  }

  &::before {
    z-index: 1;
    transform: translate(-25%, -25%);
    content: " ";
    background-image: ${props => props.checked
            ? 'url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSIjNzliZWFkIiBkPSJNMTczLjg5OCA0MzkuNDA0bC0xNjYuNC0xNjYuNGMtOS45OTctOS45OTctOS45OTctMjYuMjA2IDAtMzYuMjA0bDM2LjIwMy0zNi4yMDRjOS45OTctOS45OTggMjYuMjA3LTkuOTk4IDM2LjIwNCAwTDE5MiAzMTIuNjkgNDMyLjA5NSA3Mi41OTZjOS45OTctOS45OTcgMjYuMjA3LTkuOTk3IDM2LjIwNCAwbDM2LjIwMyAzNi4yMDRjOS45OTcgOS45OTcgOS45OTcgMjYuMjA2IDAgMzYuMjA0bC0yOTQuNCAyOTQuNDAxYy05Ljk5OCA5Ljk5Ny0yNi4yMDcgOS45OTctMzYuMjA0LS4wMDF6Ii8+PC9zdmc+")'
            : 'none'
    };
    background-repeat: no-repeat;
    background-size: 15px 15px;
    background-position: center center;
    position: absolute;
    height: 25px;
    width: 25px;
  }
`