import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <>
      <div className="myContainer flex flex-col gap-y-8 px-5 py-8 pb-[200px] text-slate-800">
        <div className="container mx-auto pt-3 md:pt-6 pb-5 md:pb-7">
          <div className="px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              Programming Online Test
            </h1>

            <div className="mt-3 md:mt-4">
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                QuizHub skill assessments are used by more than 1000 companies
                and 1,030,000 test takers.
              </p>
            </div>

            <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-center items-center">
              <section className="w-full md:w-1/2 text-center">
                <h2 className="text-2xl font-semibold mb-2 md:mb-3">
                  For Jobseekers
                </h2>
                <p className="mb-2 md:mb-3">
                  Practice your skills and earn a certificate of achievement
                  when you score in the top 25%.
                </p>
                <Link
                  to="/home/tests"
                  target="_self"
                  className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow hover:bg-blue-700 transition duration-300"
                >
                  Take a Practice Test
                </Link>
              </section>

              <div className="hidden md:block mx-8 h-full w-px bg-gray-300"></div>

              <section className="mt-5 md:mt-0 w-full md:w-1/2 text-center">
                <h2 className="text-2xl font-semibold mb-2 md:mb-3">
                  For Companies
                </h2>
                <p className="mb-2 md:mb-3">
                  Test candidates with real-world problems and interview the
                  best ones.
                </p>
                <Link
                  to="/auth"
                  target="_self"
                  className="inline-block px-6 py-3 bg-green-600 text-white font-medium rounded-md shadow hover:bg-green-700 transition duration-300"
                >
                  Sign Up to Offer this Test
                </Link>
              </section>
            </div>
          </div>
        </div>
        <div>
          <section className="mb-6">
            <h2 className="text-2xl font-semibold mb-3">About the test</h2>

            <div className="px-0 container mx-auto space-y-4">
              <p>
                The Programming online test assesses knowledge of building
                applications and softwares through a series of live coding
                questions.
              </p>

              <p>The assessment includes work-sample tasks such as:</p>

              <ul className="list-disc list-inside space-y-2">
                <li>Creating reusable piece of codes.</li>
                <li>
                  using new way of coding like functional programming and oop
                </li>
                <li>
                  Handling user request and updating the application based on
                  user actions.
                </li>
              </ul>

              <p>
                A good programmer should be able to work with the libraries
                effectively to create maintainable and accessible apps.
              </p>
            </div>
          </section>
        </div>
        <div className="mx-auto">
          <section id="about" className="py-5 bg-light">
            <div className="container">
              <h2 className="text-center mb-4">About Us</h2>
              <p className="text-center">
                We are a team of passionate developers dedicated to providing
                high-quality resources and solutions for developers of all
                levels. Our mission is to empower developers through knowledge
                sharing and collaboration. We believe in open-source principles
                and strive to create a supportive community.
              </p>
            </div>
          </section>
        </div>
        <footer className="bg-dark text-light py-3 mx-auto">
          <div className="container text-center">
            <p>&copy; 2024 QuizHub. All rights reserved.</p>
            <p>
              <a href="#" className="text-light">
                Privacy Policy
              </a>{" "}
              |{" "}
              <a href="#" className="text-light">
                Terms of Service
              </a>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
