import React, { useLayoutEffect, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MarathonResult from 'components/features/Quiz/MarathonResult/MarathonResult';

const MarathonResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      navigate('/home');
    }
  });

  return !location?.state ? (
    <div></div>
  ) : (
    <MarathonResult correctNum={location?.state?.correctNum ?? 0} />
  );
};

export default MarathonResultPage;
