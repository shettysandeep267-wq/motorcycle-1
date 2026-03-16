import { SignIn } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Login() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-white/60">
            Or{' '}
            <Link to="/signup" className="font-semibold text-[#ff7a00] hover:opacity-90">
              create a new account
            </Link>
          </p>
        </div>
        <div className="flex justify-center">
          <SignIn 
            routing="path" 
            path="/login"
            signUpUrl="/signup"
            afterSignInUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  )
}



