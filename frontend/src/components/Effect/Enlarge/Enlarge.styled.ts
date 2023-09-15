import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export const EnlargeConatiner = styled(motion.div)`
  /* border: solid red; */
  display: flex;
  flex-direction: row;
  border-radius: 0.3rem;
  transition: all 0.1ms;
  position: relative;
  height: 100%;

  &:hover {
    filter: brightness(95%);
  }
`;
