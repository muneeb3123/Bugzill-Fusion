import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../features/auth/authThunks'
import { useNavigate } from 'react-router-dom'

const Custom = () => {
    const { isLogin } = useSelector((state) => state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (!isLogin) {
            console.log('User not logged in')
            navigate('/signin')
        }
    }, [navigate, isLogin])
  return (
    <div>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  )
}

export default Custom
