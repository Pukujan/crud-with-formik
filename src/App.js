import React from 'react'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Update from './Components/Update'
import Detail from './pages/Detail'

const App = () => {
  return (
    <div>

      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/update' element={<Update />} />

        <Route path='detail/:id' element={<Detail />} />
      </Routes>

    </div>
  )
}

export default App