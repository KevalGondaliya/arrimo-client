import React, { useEffect } from 'react'
import { getUserToken } from '@/utils/localStorage';
import { useRouter } from 'next/router';

interface ILayoutProps {
    children : React.ReactNode
  }
export const PrivateLayout: React.FC<ILayoutProps> = ({children}) => {
    const token = getUserToken()
    const router = useRouter()
    useEffect(() => {
        if (!token) {
          router.push('/');
        }
      }, [token]);
  return (
    <div>
        <main>{children}</main>
    </div>
  )
}
