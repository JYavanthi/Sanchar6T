// import { useState } from "react";
// import { Eye, EyeOff, User, Lock } from "lucide-react";
// import logo from "@/assets/logo.jpeg";

// export default function LoginPage() {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-[#0b4d71]">
//       <div className="flex w-[900px] max-w-full rounded-2xl overflow-hidden shadow-lg">
        
//         {/* Left Image Section */}
//         <div className="w-1/2 relative">
//           <img
//             src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"
//             alt="Travel"
//             className="h-full w-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center p-6">
//             <h1 className="text-white text-2xl font-semibold text-center leading-relaxed">
//               TRAVEL IS THE ONLY THING YOU BUY THAT MAKES YOU RICHER
//             </h1>
//           </div>
//         </div>

//         {/* Right Login Form */}
//         <div className="w-1/2 bg-[#0f6a8a] flex flex-col items-center justify-center p-10">
//           {/* Logo */}
//           <div className="flex items-center gap-2 mb-6">
//             <img
//                src="https://cdn-icons-png.flaticon.com/512/854/854894.png"
//             // src={logo}
//               alt="Logo"
//               className="w-10 h-10"
//             />
//             <h2 className="text-2xl font-bold text-white">
//               Sanchar<span className="text-yellow-400">6T</span>
//             </h2>
//           </div>

//           {/* Social Icons */}
//           <div className="flex gap-6 text-white text-xl mb-8">
//             <i className="fab fa-facebook"></i>
//             <i className="fab fa-instagram"></i>
//             <i className="fas fa-globe"></i>
//           </div>

//           {/* Email Input */}
//           <div className="w-full mb-5">
//             <div className="flex items-center border-b border-white pb-2">
//               <User className="text-white mr-3" />
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="bg-transparent text-white placeholder-white focus:outline-none w-full"
//               />
//             </div>
//           </div>

//           {/* Password Input */}
//           <div className="w-full mb-3">
//             <div className="flex items-center border-b border-white pb-2">
//               <Lock className="text-white mr-3" />
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 className="bg-transparent text-white placeholder-white focus:outline-none w-full"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="ml-2 text-white"
//               >
//                 {showPassword ? <EyeOff /> : <Eye />}
//               </button>
//             </div>
//           </div>

//           {/* Forgot Password */}
//           <div className="w-full text-right mb-6">
//             <a href="#" className="text-sm text-white underline">
//               Forgot Your Password?
//             </a>
//           </div>

//           {/* Submit Button */}
//           <button className="w-40 bg-white text-[#0f6a8a] py-2 rounded-full font-medium hover:bg-gray-100">
//             Enter
//           </button>

//           {/* Signup */}
//           <p className="text-white mt-6 text-sm">
//             Don’t have an Account?{" "}
//             <a href="#" className="underline">
//               Sign In
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";

export default function SignupLogin() {
  const [isLogin, setIsLogin] = useState(true);
  const [isEmail, setIsEmail] = useState(true);
  const [isPhone, setIsPhone] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    Fname: "",
    Mname: "",
    Lname: "",
    gender: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const toggleMode = () => setIsLogin(!isLogin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(isLogin ? "Sign In Data:" : "Sign Up Data:", formData);
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen bg-white">
      {/* Banner */}
      <div
        className="flex-1 flex flex-col justify-center items-center text-white p-6"
        style={{
          backgroundImage: "url('/assets/login banner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: isLogin ? "500px" : "700px",
        }}
      >
        <div className="bg-black bg-opacity-50 p-6 rounded-xl text-center">
          <span className="text-3xl font-semibold leading-snug">
            Your Journey,<br />Our Priority.
          </span>
          <p className="mt-2">Emphasizes reliability and customer focus.</p>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 bg-gray-50">
        <span className="text-xl font-semibold mb-4">
          {isLogin ? "Welcome Back" : "Create an Account"}{" "}
          {!isLogin && (
            <span className="text-sm ml-2">
              Already have an Account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={toggleMode}
              >
                Log in
              </button>
            </span>
          )}
        </span>

        {isLogin && (
          <div className="flex gap-4 mb-4">
            <button
              className={`px-4 py-2 rounded-md border ${
                isEmail ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                setIsEmail(true);
                setIsPhone(false);
              }}
            >
              📧 Sign in with Email
            </button>
            <button
              className={`px-4 py-2 rounded-md border ${
                isPhone ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => {
                setIsEmail(false);
                setIsPhone(true);
              }}
            >
              📞 Sign in with Phone
            </button>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 w-full max-w-sm"
        >
          {!isLogin && (
            <>
              <label className="font-medium">First Name *</label>
              <input
                type="text"
                name="Fname"
                value={formData.Fname}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <label>Middle Name</label>
              <input
                type="text"
                name="Mname"
                value={formData.Mname}
                onChange={handleChange}
                className="border p-2 rounded"
              />
              <label className="font-medium">Last Name *</label>
              <input
                type="text"
                name="Lname"
                value={formData.Lname}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <label className="font-medium">Gender *</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </>
          )}

          {(isEmail || !isLogin) && (
            <>
              <label>Email {isLogin && "*"}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border p-2 rounded"
                required={isLogin || !isPhone}
              />
            </>
          )}

          {(isPhone || !isLogin) && (
            <>
              <label>Phone Number {isLogin && "*"}</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                maxLength="10"
                className="border p-2 rounded"
                required={isLogin || !isEmail}
              />
            </>
          )}

          <label className="font-medium">Password *</label>
          <div className="relative">
            <input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded w-full"
              required
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 rounded mt-4"
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        {isLogin ? (
          <span className="mt-4">
            Don’t have an account yet?{" "}
            <button className="text-blue-600 underline" onClick={toggleMode}>
              Sign Up
            </button>
          </span>
        ) : (
          <span className="mt-4 text-center text-sm">
            By signing up to create an account I accept <br />
            Company’s{" "}
            <a href="#" className="font-bold text-blue-600">
              Terms of Use and Privacy Policy
            </a>
          </span>
        )}
      </div>
    </div>
  );
}
