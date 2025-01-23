import styled from 'styled-components';

export const Divider = styled.span`
    height: 1px;
    display: block;
    position: relative;
    width: 100%;

  &:before {
    content: '';
    background-color: #fff;
    height: 1px;
    opacity: 0.2;
    position: absolute;
    width: 100%;
  }
`
