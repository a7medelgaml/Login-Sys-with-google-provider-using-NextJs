"use client"
import { useSession } from 'next-auth/react'
import SignInWithGoogle from './SignInWithGoogle'
import SignOut from './SignOut'

const ClientComponent = () => {
  const {data,status} = useSession()
    return (
    <div>
        {status === 'loading' &&  <p>Loading...</p>}
        {status === 'unauthenticated' && <div className="d-flex flex-column text-center align-items-center justify-content-center"><SignInWithGoogle /></div> }
        {status === 'authenticated' && (
            <div>
                <img src={data?.user?.image as string} alt="User Avatar" className='rounded-circle mb-4'/>
                <p className="text-light fw-bold fs-3">Hi {data?.user?.name || 'Guest'}</p>
                <p>لقد قمت بتسجيل الدخول بنجاح!</p>
                <div className="d-flex flex-column text-center align-items-center justify-content-center"><SignOut /></div>
                
            </div>
        )}
    </div>
  )
}

export default ClientComponent