import React from 'react'
import ReactDom from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SigIn from './auth/SignIn'
import SignUp from './auth/SignUp'

const App = () => {
  return (
    <>
    <Routes>
      <Route path='/login' element={<SigIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>
    </>
  )
}

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
<React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
</React.StrictMode>
 )

export default App