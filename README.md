# GadgetHub

This project is a React/TypeScript application consisting of two parts: a quiz application for users to take tests and view their results in their profiles, and an admin panel for managing quiz topics and questions (adding, editing, and deleting) and also visit all of the test result taken by users with their grades.

for accessing admin panel:
1.username: adminzadeh
2.email: adminzadeh@gmail.com
3.password: 123456

## Table of Contents

- [Installation](#Installation)
- [Usage](#Usage)
- [Scripts](#Scripts)
- [Components](#Components)
- [Technologies](#Technologies)
- [License](#License)

## Installation

1. **Clone the front-end repository**

```bash
git clone https://github.com/MahdiPourkeshavarz/interview-test-react.git
```

2. **Navigate to the project directory**

```bash
cd interview-test-react
```

3. **Install dependencies**

```bash
npm install
```

4. **Run the project**

```bash
npm run dev
```

## Usage

1. **Run the development server for the front project**

```bash
cd interview-test-react
npm run dev
```

2. **Run the json-server backend on another terminal**

```bash
npm run server
```

2. **Open the browser and navigate to**

```
http://localhost:5175
```

## Scripts

- **`npm run dev`**: Starts the development server.
- **`npm run server`**: Starts the json-server backend.
- **`npm run build`**: Builds the app for production.
- **`npm run preview`**: Previews the production build.
- **`npm run lint`**: Runs the linter.

## Components

- **AdminPage**: Main admin panel component.
  - **ButtonGroup**: Handles selection between different data views.
  - **Topic**: Mui module for adding new topic to the topics list.
  - **Question**: Mui module for adding new question based on selected topic.
  - **Product**: Mui module for adding new product based on selected category
    and subcategory to the list.
  - **Pages**: based on adminLayout there are three virtual pages that will
    render in the middle of screen.
    - **Results**: list of all submitted results by all users. admin has the ability to filter results by username or topic.
    - **Questions**: list of registered questions and admin can filter questions by topic. this page has the edit and delete feature for all of questions.
- **AuthenticationPage**: Access page to the website's tests page and admin panel.
  - **AuthForm** : Handle the entered data and after validating it sends the
    requests to backend for authorization.
- **HomePage**: the landing page of the website. user or admin can
  browse the tests or check his history of taken tests.
- **ErrorPage**: this page will appear only if the url doesn't matches with any
  specified routes and helps user get back to the home page.
- **TestsPage**: shows all the available tests and user can enter the test process by clicking on them.
- **TestPage**: this page will show questions one by one and user can answer questions or leave them unanswered.
- **TestResultPage**: user can check the test status and see the correct answer for all questions.
  information. after this page user will navigate to payment link on the other
  project.
- **UserProfile**: user can browse through his taken test and see the correct answer for all of questions
- **Header** : it is fixed to the top of the screen and handles routing
- **AppRoute** : Main component for displaying the pages with routing logic
  behind it

## Technologies

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain
  JavaScript.
- **Vite**: A fast build tool and development server for modern web projects.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TanStack Query**: Powerful asynchronous state management for data fetching.
- **Axios**: Promise-based HTTP client for making requests.
- **React-Hook-Form** : A reusable for component and helpful logic for handling
  submitted data.
- **Zustand**: A fast and easy to use context management tool.
- **Mui**: A complete Ui toolkit for using through the whole application
- **Yup**: A dependency like package for react-hook-form input data validation.
- **React Hot Toast**: a clean and easy to use toaster for notification.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file
for more details.
