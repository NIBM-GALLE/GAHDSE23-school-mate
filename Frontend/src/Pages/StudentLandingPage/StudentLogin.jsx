import { useState } from 'react';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    // Handle login logic here
  };

  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {/* Background Image - Fixed to cover entire screen */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{
          backgroundImage: 'url("/images/schbg.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-[#3b306c] opacity-40"></div>
      </div>

      {/* Main container - full screen with centered content */}
      <div className="relative flex items-center justify-center h-full w-full z-10">
        {/* Content wrapper for both image and login */}
        <div className="flex w-full max-w-5xl mx-8 rounded-lg overflow-hidden shadow-2xl">
          {/* Left side - Image */}
          <div className="hidden md:block w-1/2 bg-[#3b306c] p-6 flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* You can replace this with your actual image */}
              <img 
                src="/images/Login_ppl.png" 
                alt="Campus illustration" 
                className="max-w-full max-h-full object-contain"
              />
              
              {/* Optional overlay text on the image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                <p className="text-sm opacity-80">Access your learning resources and courses</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Login Form */}
          <div className="w-full md:w-1/2 p-8 bg-[#f2fbf8]">
            <h1 className="text-3xl font-semibold text-center text-[#3b306c] mb-8">
              SchoolMate Login
            </h1>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-[#3b306c] mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="block w-full px-4 py-3 text-[#3b306c] bg-white border border-gray-200 rounded-md focus:border-[#87819d] focus:ring-[#87819d] focus:outline-none focus:ring focus:ring-opacity-40"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-[#3b306c] mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="block w-full px-4 py-3 text-[#3b306c] bg-white border border-gray-200 rounded-md focus:border-[#87819d] focus:ring-[#87819d] focus:outline-none focus:ring focus:ring-opacity-40"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="w-4 h-4 text-[#3b306c] bg-gray-100 border-gray-300 rounded focus:ring-[#87819d]"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="remember-me" className="ml-2 text-sm text-[#87819d]">
                    Remember me
                  </label>
                </div>
                
                <a href="#" className="text-sm text-[#87819d] hover:underline">
                  Forgot Password?
                </a>
              </div>
              
              <button className="w-full py-3 font-medium tracking-wide text-white transition-colors duration-200 transform bg-[#3b306c] rounded-md hover:bg-[#87819d] focus:outline-none focus:bg-[#87819d]">
                Login
              </button>
            </form>

            <div className="relative flex items-center justify-center w-full mt-8 mb-8">
              <div className="absolute border-t border-gray-300 w-full"></div>
              <div className="relative px-5 bg-[#f2fbf8] text-sm text-[#87819d]">Or</div>
            </div>

            <div className="flex gap-x-4">
              <button
                type="button"
                className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="#4285F4"
                >
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"></path>
                </svg>
              </button>
              <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="#333333"
                >
                  <path d="M12,2A10,10,0,0,0,8.84,21.5c.5.08.66-.23.66-.5V19.31C6.73,19.91,6.14,18,6.14,18A2.69,2.69,0,0,0,5,16.5c-.91-.62.07-.6.07-.6a2.1,2.1,0,0,1,1.53,1,2.15,2.15,0,0,0,2.91.83,2.16,2.16,0,0,1,.63-1.34C8,16.17,5.62,15.31,5.62,11.5a3.87,3.87,0,0,1,1-2.71,3.58,3.58,0,0,1,.1-2.64s.84-.27,2.75,1a9.63,9.63,0,0,1,5,0c1.91-1.29,2.75-1,2.75-1a3.58,3.58,0,0,1,.1,2.64,3.87,3.87,0,0,1,1,2.71c0,3.82-2.34,4.66-4.57,4.91a2.39,2.39,0,0,1,.69,1.85V21c0,.27.16.59.67.5A10,10,0,0,0,12,2Z"></path>
                </svg>
              </button>
              <button className="flex items-center justify-center w-full p-3 border border-gray-300 rounded-md hover:bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                  fill="#1DA1F2"
                >
                  <path d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10V10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z"></path>
                </svg>
              </button>
            </div>

            <p className="mt-8 text-sm text-center text-[#87819d]">
              Don't have an account?{" "}
              <a
                href="#"
                className="font-medium text-[#3b306c] hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}