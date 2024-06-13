import React, { useEffect } from 'react'
import ReactDom from 'react-dom/client'
import Layout from './components/layout/Layout'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SigIn from './components/auth/SignIn'
import SignUp from './components/auth/SignUp'
import store from './store'
import { Provider, useDispatch, useSelector } from 'react-redux'
import './App.css'
import { currentUser } from './features/auth/authThunks'
import Projects from './components/projects/Projects'
import ProjectDetail from './components/projects/ProjectDetail'
import Tickets from './components/tickets/Tickets'
import Ticket from './components/tickets/Ticket'

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
      <Route path='/signin' element={<SigIn />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path="/*" element={<Layout />}>
          <Route index element={<Projects />} />
          <Route path="projects/:id" element={<ProjectDetail />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="tickets/:id" element={<Ticket />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
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