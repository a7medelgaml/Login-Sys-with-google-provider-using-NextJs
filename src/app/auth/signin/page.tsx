import SignInWithGoogle from "@/public/components/SignInWithGoogle"

const SignInPage = () => {
  return (
    <div className="flex h-full w-full items-center justify-center">
    <div className="fs-1 text-center text-light m-5 font-bold d-flex flex-column justify-content-center align-items-center">
        <p>Sign In</p>
        
        <SignInWithGoogle />
        </div>
    </div>
  )
}

export default SignInPage