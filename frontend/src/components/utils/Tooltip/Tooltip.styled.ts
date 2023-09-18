import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';

export const Tooltip = styled(motion.div)`
  background: rgba(0, 0, 0, 0.85);
  color: white;
  pointer-events: none;
  border-radius: 6px;
  padding: 8px 18px;
  font-size: 0.85rem;
  max-width: 400px;
  z-index: 9999999999;
`;
