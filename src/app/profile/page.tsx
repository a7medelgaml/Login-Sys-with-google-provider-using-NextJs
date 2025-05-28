import ClientComponent from "@/public/components/ClientComponent"
import ParticlesBackground from "@/public/components/ParticlesBackground"
import { authOptions } from "../lib/nextAuth";
import { getServerSession } from "next-auth";
import SignOut from "@/public/components/SignOut";

const Profile = async () => {
  const session = await getServerSession(authOptions);
  return (
<>
      <ParticlesBackground />
        
      <main className="position-relative z-1">
        <div className="container text-center text-white py-5">

      {session && (
          <div>
                <img src={session?.user?.image as string} alt="User Avatar" className='rounded-circle mb-4'/>
                <p className="text-light fw-bold fs-3">Hi {session?.user?.name || 'Guest'}</p>
                <p>لقد قمت بتسجيل الدخول بنجاح!</p>
                <div className="d-flex flex-column text-center align-items-center justify-content-center"><SignOut /></div>
                
            </div>
            )}

      
        </div>
      </main>
    </>
  )
}

export default Profile