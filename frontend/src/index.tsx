import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { BrowserRouter } from 'react-router-dom';
import Main from 'pages/Main/Main';
import 'styles/css/root.css';
// import { CookiesProvider } from "react-cookie";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RecoilRoot>
    {/* <CookiesProvider> */}
    <BrowserRouter>
      <Main />
    </BrowserRouter>
    {/* </CookiesProvider> */}
  </RecoilRoot>
);
