import { useState, useEffect } from 'react';
import { Eye, EyeOff, Book } from 'lucide-react';

export default function TeacherLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Apply full-screen styles when component mounts
  useEffect(() => {
    // Apply styles to html and body
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';
    
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100%';  
    document.body.style.width = '100%';
    document.body.style.backgroundColor = '#f3f3f3';
    document.body.style.overflowX = 'hidden';

    // Clean up function
    return () => {
      document.documentElement.style.removeProperty('margin');
      document.documentElement.style.removeProperty('padding');
      document.documentElement.style.removeProperty('height');
      document.documentElement.style.removeProperty('width');
      
      document.body.style.removeProperty('margin');
      document.body.style.removeProperty('padding');
      document.body.style.removeProperty('height');
      document.body.style.removeProperty('width');
      document.body.style.removeProperty('backgroundColor');
      document.body.style.removeProperty('overflowX');
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt with:', { email, password, rememberMe });
  };

  return (
    <div className="min-h-screen w-full bg-[#f3f3f3] flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center px-4 py-8">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6">
          <img 
            src="/images/Teacher_Login.png" 
            alt="Education illustration" 
            className="w-full max-w-lg mb-6"
          />
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#374258] mb-2">Welcome to SchoolMate</h2>
            <p className="text-[#6a7285] max-w-md">
              An integrated learning management platform designed to empower educators and enhance student learning experiences.
            </p>
          </div>
        </div>

        {/* Right side - Login Box */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Logo and Brand */}
            <div className="text-center pt-8 pb-4">
              <div className="flex items-center justify-center mb-2">
                <Book size={28} className="text-[#f74464]" />
                <h1 className="text-2xl font-bold ml-2 text-[#374258]">SchoolMate</h1>
              </div>
              <p className="text-sm text-[#6a7285]">Learning Management Platform</p>
            </div>

            {/* Login Header */}
            <div className="bg-[#374258] py-3">
              <h2 className="text-center text-lg font-medium text-white">Teacher Login</h2>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit}>
                {/* Email Input */}
                <div className="mb-4">
                  <label className="block text-[#374258] text-sm font-medium mb-2" htmlFor="email">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 border border-[#c4c4c4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f74464]"
                    placeholder="name@school.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password Input */}
                <div className="mb-4">
                  <label className="block text-[#374258] text-sm font-medium mb-2" htmlFor="password">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full px-3 py-2 border border-[#c4c4c4] rounded-md focus:outline-none focus:ring-2 focus:ring-[#f74464]"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#6a7285]"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-[#f74464] border-[#c4c4c4] rounded focus:ring-[#f74464]"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-[#6a7285]">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a href="#" className="text-sm text-[#f74464] hover:underline">
                      Forgot password?
                    </a>
                  </div>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  className="w-full bg-[#f74464] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-300 font-medium"
                >
                  Sign In
                </button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-sm text-[#6a7285]">
                  Need help? <a href="#" className="text-[#374258] font-medium hover:underline">Contact Support</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center text-sm text-[#6a7285]">
        <p>© 2025 SchoolMate LMS. All rights reserved.</p>
      </div>
    </div>
  );
}