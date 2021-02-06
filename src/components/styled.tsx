import styled, { css } from 'styled-components';

const CenterIt = styled('div')`
  display: flex;
  justify-content: center;
  flex-direction: column;
  ${({ text = false }: { text?: boolean }): any =>
    text &&
    css`
      align-items: center;
      text-align: center;
    `};
`;

export { CenterIt }