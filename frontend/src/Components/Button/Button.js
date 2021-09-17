import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  border-radius: 5px;
  /* width: ${({ update }) => (update ? `` : `50%`)}; */
  font-size: 1rem;
  /* font-weight: 500;   */
  margin-top: 10px;
  /* padding: ${({ update }) => (update ? `10px 35px` : `7px 45px`)}; */
  outline: none;
  background-color: ${({ clear, add, update }) =>
    clear ? `#bd1b1b` : add ? `#3532ff` : update ? `#f3de1f` : `transparent`};
  color: ${({ clear, add, update }) =>
    clear ? `#fff` : add ? `#000` : update ? `#fff` : `#000`};
  cursor: pointer;
`;
