import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/index';
import SocketGame from 'pages/SocketGame/SocketGame';

const Router = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/game" element={<SocketGame />} />
    </Routes>
  );
};
export default Router;
