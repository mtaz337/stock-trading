import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';
import StockDetailPage from './pages/StockDetailPage';
import StockOverViewPage from './pages/StockOverViewPage';
import { WatchListContextProvider } from './context/watchListContext';

function App() {
  return (
    <main className="container">
      <WatchListContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<StockOverViewPage/>}/>
        <Route path='/detail/:stock' element={<StockDetailPage/>}/>
      </Routes>
      </BrowserRouter>
      </WatchListContextProvider>
    </main>
  );
}

export default App;
