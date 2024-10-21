export function LandingPage() {
  return (
    <>
      <div
        className="relative flex items-center justify-center h-screen bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: "url('landing-background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Test Your Knowledge in Programming Languages
          </h1>
          <p className="mt-4 text-lg sm:text-xl lg:text-2xl text-gray-300">
            Improve your skills in React, JavaScript, Python, C++, and more.
          </p>

          <div className="mt-10 space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center">
            <a
              href="/home"
              className="inline-block px-8 py-3 text-lg font-semibold bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Go to Home
            </a>
            <a
              href="/auth"
              className="inline-block px-8 py-3 text-lg font-semibold bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition duration-300 ease-in-out"
            >
              Login or Signup
            </a>
          </div>

          <div className="mt-8">
            <a
              href="/admin"
              className="inline-block px-6 py-2 text-base font-medium text-gray-600 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition duration-300 ease-in-out"
            >
              Admin Panel
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
