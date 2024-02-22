import './App.css';
import { Outlet, Route, Routes } from 'react-router-dom';
import Nav from './components/nav';
import LoginPage from './pages/loginPage';
import MainPage from './pages/mainPage';
import DetailPage from './pages/detailPage';
import SearchPage from './pages/searchPage';

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />
    </div>
  );
};

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path='main' element={<MainPage />} />
          <Route path=':movieId' element={<DetailPage />} />
          <Route path='search' element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
