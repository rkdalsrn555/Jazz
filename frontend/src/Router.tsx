import { Route, Routes } from 'react-router-dom';
import Home from 'pages/Home/index';
import SocketGame from 'pages/SocketGame/SocketGame';
import CompanySearch from 'pages/CompanySearch/CompanySearch';

const Router = () => {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/game" element={<SocketGame />} />
      <Route path="/companySearch" element={<CompanySearch />} />
    </Routes>
  );
};
export default Router;
