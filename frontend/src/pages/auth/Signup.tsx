import { SignUp } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-white/60">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-[#ff7a00] hover:opacity-90">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex justify-center">
          <SignUp 
            routing="path" 
            path="/signup"
            signInUrl="/login"
            afterSignUpUrl="/dashboard"
          />
        </div>
      </div>
    </div>
  )
}



