import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Page/Home/Home'
import Thanks from './Page/Thanks/Thanks';

import './App.css';

function App() {

  return (
    <div className='content-app'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}  />
          <Route path='/gracias' element={<Thanks />}  />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
