import * as S from './Enlarge.styled';

const Enlarge = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return (
    <S.EnlargeConatiner
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 1 }}
      transition={{ duration: 0.05 }}
    >
      {children}
    </S.EnlargeConatiner>
  );
};

export default Enlarge;
