import styled from 'styled-components';

import { device } from '../../styles/theme/devices';

export const Button = styled.button`
  border: none;
  border-radius: 50px;
  cursor: pointer;
  color: #00000000;
  background-color: #00000000;
  font-size: 18px;
  font-family: 'Poppins';
  font-weight: 500;
  padding: 10px 50px;
  margin: 30px 0;
  width: fit-content;

  @media ${device.mobileL} {
    font-size: 18px;
    padding: 20px 70px;
  }

  &.small {
    font-size: 24px;
    padding: 18px 22px;

    @media ${device.laptopS} {
      font-size: 20px;
    }

    @media ${device.mobileS} {
      font-size: 18px;
    }
  }
  
  :hover {
    background-color: #00000000;
    color: #00000000;
  }
`

export const ButtonOutline = styled.button`
  border: 1px solid white;
  border-radius: 50px;
  cursor: pointer;
  color:#00000000;
  background-color: #00000000;
  font-size: 18px;
  font-family: 'Poppins';
  font-weight: 500;
  padding: 10px 50px;
  margin: 30px 0;
  width: fit-content;

  @media ${device.mobileL} {
    font-size: 18px;
    padding: 20px 70px;
  }

  &.small {
    font-size: 24px;
    padding: 18px 22px;

    @media ${device.laptopS} {
      font-size: 20px;
    }

    @media ${device.mobileS} {
      font-size: 18px;
    }
  }

  :hover {
    background-color:#00000000;
    color: #00000000;
  }
`

export const ButtonReverse = styled(Button)`
  border: 1px solid #00000000;
  background-color: transparent;
`
