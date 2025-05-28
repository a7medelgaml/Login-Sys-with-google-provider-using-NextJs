"use client"
import { signIn } from 'next-auth/react'
import React from 'react'

function SignInWithGoogle() {
  return (
    <button type='button' className='btn btn-outline-primary d-flex align-items-center gap-2' onClick={() => {signIn('google',{redirect: true, callbackUrl: '/profile'})}}>
        <span>Sign in with Google</span>

    </button>
  )
}

export default SignInWithGoogle