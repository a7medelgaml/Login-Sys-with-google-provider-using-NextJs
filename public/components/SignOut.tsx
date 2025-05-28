"use client"
import { signIn, signOut } from 'next-auth/react'
import React from 'react'

function SignOut() {
  return (
    <button type='button' className='btn btn-outline-primary d-flex align-items-center gap-2' onClick={() => {signOut() }}>
        <span> Sign Out </span>

    </button>
  )
}

export default SignOut