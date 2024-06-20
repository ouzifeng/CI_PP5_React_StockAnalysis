![Bull Street](docs/bull-street-logo.png)

# Bull Street - make better investment decisions

![Bull Street](docs/screenshots/responsive-design.png)

[View live website](https://stocks-frontend-d56c65a3a165.herokuapp.com/)

### Use Case

A Swiss based family office has contracted me to build an investment analysis platform so them to analyse dividend paying stocks for their yield bearing investment portfolio, with a strong focus on European companies. There are tools out there that cover the companies they want to look at,but one of the biggest challenges they face is building a shortlist of companies they want to understand better in the first place.

To this end, the platform needs to focus on 3 areas:

1. A stock screener that allows the filtering on stock based on yield bearing criteria, namely yield size, payout ratio and price to earnings ratio
2. Individual stock pages where a breakdown of the companies fundamental performance can be tracked
3. An investment note taking feature. As users perform the necessary financial due diligence, it is important that they can take notes of their findings, and be able to edit and delete them. They must be easily accessible as they are often copied and shared in memos internally

The project is split into a react based backend which can be found [here](https://github.com/ouzifeng/CI_PP5_API). This depository is dedicated to the frontend, which has been built using React JS 

### User Experience

#### Target Audience

* Investment managers researching a portfolio of stocks
* Investment managers performing fundamental analysis on individual stocks
* Financial auditors performing an investment audit on investment decisions

#### User Requirements

* Cover all major European exchanges
* Cover some key asian exchanges
* Clean, easy to read layout where lots of data points need to be displayed
* Login with email
* Google login (nice to have)
* Search for stock using name or ticker
* Create a shortlist of stocks the user is interested in
* Create investment notes which can be edited or deleted
* Keep up to date with global index prices
* A stock screen with various filters in to help narrow down my search for companies

#### User Stories

##### Account Registration

1. As a new user I can register an account with my email
2. As a new user I can register an account with my Google

##### Finding Stocks


3. As a user I want to be able to search the stock database for stocks based on the company name
4. As a user I want to filter stocks out of the database based on their yield
5. As a user I want to filter out stocks based on their dividend payout ratio
6. As a user I want to be able to filter stocks based on their price to earnings ratio
7. As a user I want to be able to build a shortlist of stocks I am interested in
8. As a user I want to be able to compare stocks with similar financial metrics in a table, with top level investment information available


##### Individual Stock Research

9. As a user, I want to be able to se the latest global index prices
10. As a user I want to be able to see the stock price over the previous 12 months
11. As a user I want to see key financial highlights
12. As a user I want to view basic stock information like its ticker, industry, where it is listed and a hyperlink to the company website
13. As a user I want a description of the company to help understand where it operates
14. As a user, I want to see a graphical representation of its revenue, gross and net income over the past 5 years
15. As a user, I want to see ley 5 year CAGR metrics, if available
16. If available, as a user I want to see analyst ratings as an average and the past month. It is understood thatnot all stocks are covered by analysts and that this information is not always available
17. If the company has paid a dividend over the past 5 years, as a user I want to see this displayed graphically
18. As a user, I want to see key margin metrics of the business
19. As a user, I want to see key valuation metrics of the business
20. As a user, I want to see key technical metrics of the business
21. As a user, I want to see splits and dividend related data

##### Notes

22. As a logged in user, I want to be able to take investment notes as I go about my research
23. As a logged in user, I want to be able to edit investment notes as I go about my research
24. As a logged in user, I want to be able to delete investment notes as I go about my research


### Site Structure

In an attempt to follow React best design practices, the site has been broken down into three main sections:

1. **Base Layout**
   - **Location**: `src/layouts/BaseLayout.js`
   - **Description**: This is the foundational layout upon which all other pages are built. It includes common elements such as the header, footer, and navigation menu, providing a consistent structure across the application.

2. **Pages**
   - **Location**: `src/pages/`
   - **Description**: These are the main views of the application, layered on top of the base layout. Each page represents a specific route and functionality within the app. Key pages include:
     - `ContactUs.js`: The contact information and form for user inquiries.
     - `DividendScreener.js`: A tool for users to screen and filter dividend stocks.
     - `EmailVerified.js`: The confirmation page displayed after a user verifies their email address.
     - `Following.js`: A page showing the stocks the user is following.
     - `ForgotPassword.js`: The password recovery page for users who have forgotten their password.
     - `Login.js`: The login page for user authentication.
     - `ResetPassword.js`: The page for resetting the user’s password.
     - `SignUp.js`: The registration page for new users.
     - `StockDetailPage.js`: The detailed view of an individual stock, including metrics, notes, and historical data.

3. **Components**
   - **Location**: `src/components/`
   - **Description**: Reusable UI elements and functionalities that are used across various pages and layouts. This directory is further organized into subdirectories for better manageability. Key components include:

     - **Common Components (`src/components/common/`)**:
       - **Footer.js**: 
         - **Description**: The footer component that appears at the bottom of each page. It includes links to various sections of the site and other relevant information.
         - **Usage**: Included in the `BaseLayout.js` to ensure it appears on all pages.
       - **Header.jsx**: 
         - **Description**: The header component that appears at the top of each page. It contains the logo, navigation links, and user account options.
         - **Usage**: Included in the `BaseLayout.js` to ensure it appears on all pages.
       - **MenuDrawer.js**: 
         - **Description**: A sidebar menu component that provides navigation links in a collapsible drawer format.
         - **Usage**: Used in the `Header.jsx` to provide additional navigation options for mobile and tablet users.

     - **Context (`src/context/`)**:
       - **AuthContext.js**: 
         - **Description**: Provides a context for managing authentication state across the application. It includes methods for logging in, logging out, and checking the current user's authentication status.
         - **Usage**: Wrapped around the main application component to provide authentication state to all components.

     - **Routes (`src/components/`)**:
       - **ProtectedRoute.js**: 
         - **Description**: A higher-order component (HOC) that restricts access to certain routes. It checks if the user is authenticated before rendering the route's component; otherwise, it redirects to the login page.
         - **Usage**: Used to protect pages that require user authentication, such as the `StockDetailPage.js`.
       - **RestrictedRoute.js**: 
         - **Description**: Similar to `ProtectedRoute.js`, but used to restrict routes for authenticated users only. It renders a different component or redirects based on the user's authentication status.
         - **Usage**: Used for routes like `Login.js` and `SignUp.js` to prevent authenticated users from accessing them.

     - **Utility Components**:
       - **useDebounce.js**: 
         - **Description**: A custom hook that debounces a given value. Useful for optimizing performance by limiting the rate at which a function is executed, such as search input handlers.
         - **Usage**: Used in components that require debounced input handling, like search bars.

       - **MessageAndRedirect.js**: 
         - **Description**: A component that displays a message to the user and redirects them after a certain period.
         - **Usage**: Used for actions that require user feedback and subsequent redirection, such as after a successful form submission.

4. **Assets**
   - **Location**: `src/assets/`
   - **Description**: Static files such as images and stylesheets. This directory is organized to include:
     - `images/`: All image files used in the application.
     - `styles/`: Custom CSS files like `custom.css` for styling the application.

5. **Utilities**
   - **Location**: `src/utils/`
   - **Description**: Utility functions and helpers that are used across the application for various purposes.

6. **Services**
   - **Location**: `src/services/`
   - **Description**: Modules for handling API calls and interactions with backend services.

### Development Practices

- **Environment Configuration**
  - **Location**: `.env.local`
  - **Description**: Configuration file for environment variables, ensuring sensitive data like API keys are not hardcoded.

- **Global Styles**
  - **Location**: `App.css`
  - **Description**: Contains global CSS styles that apply to the entire application.


### Testing

User story testing can be found on a separate file [![here]](/TESTME.md)


### Libraries Used

This document provides an overview of the libraries and dependencies used in the Bull Street investment app project.

---

#### Dependencies

##### Core Libraries

- **react** (`^18.2.0`)
  - A JavaScript library for building user interfaces.
- **react-dom** (`^18.2.0`)
  - This package serves as the entry point to the DOM and server renderers for React.

##### UI Components and Styling

- **@emotion/react** (`^11.11.3`)
  - A library designed for writing CSS styles with JavaScript.
- **@emotion/styled** (`^11.11.0`)
  - Styled component library for React and other frameworks.
- **@fontsource/roboto** (`^5.0.8`)
  - Self-host Open Source fonts in neatly bundled NPM packages.
- **@mui/icons-material** (`^5.15.6`)
  - Material Design icons library for React.
- **@mui/lab** (`^5.0.0-alpha.163`)
  - Components that are not yet ready for production use in Material-UI.
- **@mui/material** (`^5.15.6`)
  - React components for faster and easier web development based on Material Design.
- **bootstrap** (`^5.3.2`)
  - The most popular CSS Framework for developing responsive and mobile-first websites.
- **react-bootstrap** (`^2.10.0`)
  - Bootstrap components built with React.

##### Authentication

- **@react-oauth/google** (`^0.12.1`)
  - Google OAuth 2.0 integration for React.

npm audit
##### Data Fetching and Manipulation

- **axios** (`^1.7.2`)
  - Promise based HTTP client for the browser and node.js.
- **json-2-csv** (`^5.0.1`)
  - Convert JSON to CSV or CSV to JSON.
- **papaparse** (`^5.4.1`)
  - The powerful, in-browser CSV parser for big boys and girls.
- **jwt-decode** (`^4.0.0`)
  - A small browser library that helps decoding JWTs token which are Base64Url encoded.

##### Data Visualization

- **chart.js** (`^4.4.1`)
  - Simple yet flexible JavaScript charting for designers & developers.
- **chartjs-adapter-date-fns** (`^3.0.0`)
  - A lightweight date adapter for Chart.js with date-fns.
- **lightweight-charts** (`^4.1.2`)
  - Financial lightweight charts built with HTML5 canvas.
- **react-chartjs-2** (`^5.2.0`)
  - React wrapper for Chart.js 2.

##### Utilities

- **lodash** (`^4.17.21`)
  - A modern JavaScript utility library delivering modularity, performance, and extras.
- **react-country-flag** (`^3.1.0`)
  - A simple and tiny React component for rendering country flags.
- **react-helmet** (`^6.1.0`)
  - A document head manager for React.
- **react-router-dom** (`^6.21.3`)
  - DOM bindings for React Router.
- **react-scripts** (`5.0.1`)
  - Configuration and scripts for Create React App.
- **react-toastify** (`^10.0.4`)
  - React notification made easy.
- **web-vitals** (`^2.1.4`)
  - A small, modular library for measuring all the metrics that Google cares about.

