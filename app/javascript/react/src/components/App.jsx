import React, { useEffect } from 'react'
import ReactDom from 'react-dom/client'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SigIn from './auth/SignIn'
import SignUp from './auth/SignUp'
import store from '../store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import './App.css'
import Custom from './Custom'
import { currentUser } from '../features/auth/authThunks'

const App = () => {
  const dispatch = useDispatch()
  const { isLogin } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    if(!isLogin && token) {
      dispatch(currentUser())
    }
  }, [dispatch, isLogin]);

  return (
    <>
    <Routes>
      <Route path='/' element={<Custom />} />
      <Route path='/signin' element={<SigIn />} />
      <Route path='/signup' element={<SignUp />} />
    </Routes>

    <ToastContainer />
    </>
  )
}

const root = ReactDom.createRoot(document.getElementById('root'))
root.render(
<React.StrictMode>
<Provider store={store}>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </Provider>
</React.StrictMode>
 )

export default App