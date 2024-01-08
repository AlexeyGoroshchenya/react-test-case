
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ImagePage from './pages/ImagePage';

function App() {
  return (

    <BrowserRouter>

          <Routes>

            <Route path='/image/:id' element={<ImagePage />} exact={true} />

            <Route
                    path="*"
                    element={<Navigate to='/image/1' replace />}
                />

          </Routes>


    </BrowserRouter>
    
  );
}

export default App;
