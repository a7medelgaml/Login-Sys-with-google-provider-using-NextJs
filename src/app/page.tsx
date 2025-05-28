// app/page.tsx
import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from './lib/nextAuth';
import ParticlesBackground from '@/public/components/ParticlesBackground';
import SignInWithGoogle from '@/public/components/SignInWithGoogle';
import ClientComponent from '@/public/components/ClientComponent';
export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <ParticlesBackground />
        
      <main className="position-relative z-1">
        <div className="container text-center text-white py-5">
          <ClientComponent/>
          
      
        </div>
      </main>
    </>
  );
}