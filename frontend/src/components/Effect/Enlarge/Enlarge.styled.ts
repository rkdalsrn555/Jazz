import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export const EnlargeConatiner = styled(motion.div)`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
  transition: all 0.1ms;
  /* position: relative; */

  &:hover {
    filter: brightness(95%);
    cursor: pointer;
  }
`;
