import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

interface AuthProps {
  children: React.ReactNode
  isAdmin?: boolean
}

const ProtectedRoute: React.FC<AuthProps> = ({ children, isAdmin }) => {
  const { userInfo } = useAppSelector((state) => state.auth)
  const token = userInfo?.token

  if (!!token) {
    if (isAdmin && userInfo?.isAdmin) {
      return <>{children}</>
    } else if (!isAdmin) {
      return <>{children}</>
    }
  }

  return <Navigate to={token ? `/` : `/sign-in`} />
}

export default ProtectedRoute
