# Bull Street - Make Better Investment Decisions

![Bull Street](docs/screenshots/responsive-design.png)

[View Live Website](https://stocks-frontend-d56c65a3a165.herokuapp.com/)

## Use Case

A Swiss-based family office has contracted me to build an investment analysis platform to analyze dividend-paying stocks for their yield-bearing investment portfolio, with a strong focus on European companies. Although there are tools available, one of the biggest challenges they face is building a shortlist of companies they want to understand better.

The platform needs to focus on three areas:

1. **Stock Screener**: Allows filtering based on yield criteria, including yield size, payout ratio, and price-to-earnings ratio.
2. **Individual Stock Pages**: Provides a breakdown of the company's fundamental performance.
3. **Investment Note-Taking Feature**: Enables users to take, edit, and delete notes, which are easily accessible for internal memos.

The project includes a React-based backend, available [here](https://github.com/ouzifeng/CI_PP5_API). This repository is dedicated to the frontend, built using React JS.

## User Experience

### Target Audience

- Investment managers researching a portfolio of stocks
- Investment managers performing fundamental analysis on individual stocks
- Financial auditors performing an investment audit on investment decisions

### User Requirements

- Coverage of all major European exchanges
- Coverage of some key Asian exchanges
- Clean, easy-to-read layout with extensive data points
- Email login
- Google login (nice to have)
- Search for stocks using name or ticker
- Create a shortlist of stocks of interest
- Create, edit, and delete investment notes
- Keep up to date with global index prices
- A stock screener with various filters to narrow down the search for companies

### User Stories

#### Account Registration

1. **New User Registration with Email**
2. **New User Registration with Google**

#### Finding Stocks

3. **Search Stock Database by Company Name**
4. **Filter Stocks by Yield**
5. **Filter Stocks by Dividend Payout Ratio**
6. **Filter Stocks by Price-to-Earnings Ratio**
7. **Build a Shortlist of Stocks**
8. **Compare Stocks with Similar Financial Metrics**

#### Individual Stock Research

9. **View Latest Global Index Prices**
10. **See Stock Price Over Previous 12 Months**
11. **View Key Financial Highlights**
12. **View Basic Stock Information (ticker, industry, listing, company website)**
13. **View Company Description**
14. **Graphical Representation of Revenue, Gross, and Net Income Over 5 Years**
15. **View Key 5-Year CAGR Metrics**
16. **View Analyst Ratings (if available)**
17. **Graphical Display of Dividends Paid Over 5 Years**
18. **View Key Margin Metrics**
19. **View Key Valuation Metrics**
20. **View Key Technical Metrics**
21. **View Splits and Dividend-Related Data**

#### Notes

22. **Take Investment Notes**
23. **Edit Investment Notes**
24. **Delete Investment Notes**

## Site Structure

### Base Layout

- **Location**: `src/layouts/BaseLayout.js`
- **Description**: The foundational layout for all pages, including the header, footer, and navigation menu.

### Pages

- **Location**: `src/pages/`
- **Description**: Main views of the application, representing specific routes and functionalities.
  - `ContactUs.js`: Contact information and form.
  - `DividendScreener.js`: Tool for screening and filtering dividend stocks.
  - `EmailVerified.js`: Confirmation page after email verification.
  - `Following.js`: Page showing stocks the user is following.
  - `ForgotPassword.js`: Password recovery page.
  - `Login.js`: User authentication page.
  - `ResetPassword.js`: Password reset page.
  - `SignUp.js`: New user registration page.
  - `StockDetailPage.js`: Detailed view of individual stocks, including metrics, notes, and historical data.

### Components

- **Location**: `src/components/`
- **Description**: Reusable UI elements and functionalities.
  - **Common Components (`src/components/common/`)**:
    - **Footer.js**: Footer component with site links and information.
    - **Header.jsx**: Header component with logo, navigation, and user options.
    - **MenuDrawer.js**: Sidebar menu for navigation in a collapsible drawer format.
  - **Context (`src/context/`)**:
    - **AuthContext.js**: Manages authentication state, including login and logout methods.
  - **Routes (`src/components/`)**:
    - **ProtectedRoute.js**: Restricts access to routes based on authentication status.
    - **RestrictedRoute.js**: Restricts routes for authenticated users.
  - **Utility Components**:
    - **useDebounce.js**: Custom hook for debouncing values.
    - **MessageAndRedirect.js**: Displays a message and redirects after a period.

### Assets

- **Location**: `src/assets/`
- **Description**: Static files like images and stylesheets.
  - `images/`: Image files.
  - `styles/`: Custom CSS files.

### Utilities

- **Location**: `src/utils/`
- **Description**: Utility functions and helpers.

### Services

- **Location**: `src/services/`
- **Description**: Modules for API calls and backend interactions.

## Development Practices

- **Environment Configuration**
  - **Location**: `.env.local`
  - **Description**: Stores environment variables.

- **Global Styles**
  - **Location**: `App.css`
  - **Description**: Contains global CSS styles.

## Testing

User story testing details can be found in a separate file [here](/TESTME.md).

## Libraries Used

### Dependencies

#### Core Libraries

- **react** (`^18.2.0`)
- **react-dom** (`^18.2.0`)

#### UI Components and Styling

- **@emotion/react** (`^11.11.3`)
- **@emotion/styled** (`^11.11.0`)
- **@fontsource/roboto** (`^5.0.8`)
- **@mui/icons-material** (`^5.15.6`)
- **@mui/lab** (`^5.0.0-alpha.163`)
- **@mui/material** (`^5.15.6`)
- **bootstrap** (`^5.3.2`)
- **react-bootstrap** (`^2.10.0`)

#### Authentication

- **@react-oauth/google** (`^0.12.1`)

#### Data Fetching and Manipulation

- **axios** (`^1.7.2`)
- **json-2-csv** (`^5.0.1`)
- **papaparse** (`^5.4.1`)
- **jwt-decode** (`^4.0.0`)

#### Data Visualization

- **chart.js** (`^4.4.1`)
- **chartjs-adapter-date-fns** (`^3.0.0`)
- **lightweight-charts** (`^4.1.2`)
- **react-chartjs-2** (`^5.2.0`)

#### Utilities

- **lodash** (`^4.17.21`)
- **react-country-flag** (`^3.1.0`)
- **react-helmet** (`^6.1.0`)
- **react-router-dom** (`^6.21.3`)
- **react-scripts** (`5.0.1`)
- **react-toastify** (`^10.0.4`)
- **web-vitals** (`^2.1.4`)

## Wireframes

Although the investment platform is primarily designed to work on desktop as mobile device screens are considered too small to perform proper analysis, the platform still needed to be responsive both on tablets and mobile devices, for analysis on the go.

<details>
  <summary>Contact Page - Desktop</summary>
  <img src="docs/wireframes/contact_desktop.png">
</details>

<details>
  <summary>Contact Page - Mobile</summary>
  <img src="docs/wireframes/contact_mobile.png">
</details>

<details>
  <summary>Contact Page - Tablet</summary>
  <img src="docs/wireframes/contact_tablet.png">
</details>

<details>
  <summary>Following Page - Desktop</summary>
  <img src="docs/wireframes/following_desktop.png">
</details>

<details>
  <summary>Following Page - Mobile</summary>
  <img src="docs/wireframes/following_mobile.png">
</details>

<details>
  <summary>Following Page - Tablet</summary>
  <img src="docs/wireframes/following_tablet.png">
</details>

<details>
  <summary>Home Page - Desktop</summary>
  <img src="docs/wireframes/home_desktop.png">
</details>

<details>
  <summary>Home Page - Mobile</summary>
  <img src="docs/wireframes/home_mobile.png">
</details>

<details>
  <summary>Home Page - Tablet</summary>
  <img src="docs/wireframes/home_tablet.png">
</details>

<details>
  <summary>Register Page - Desktop</summary>
  <img src="docs/wireframes/register_desktop.png">
</details>

<details>
  <summary>Register Page - Mobile</summary>
  <img src="docs/wireframes/register_mobile.png">
</details>

<details>
  <summary>Register Page - Tablet</summary>
  <img src="docs/wireframes/register_tablet.png">
</details>

<details>
  <summary>Sign In Page - Desktop</summary>
  <img src="docs/wireframes/signin_desktop.png">
</details>

<details>
  <summary>Sign In Page - Mobile</summary>
  <img src="docs/wireframes/signin_mobile.png">
</details>

<details>
  <summary>Sign In Page - Tablet</summary>
  <img src="docs/wireframes/signin_tablet.png">
</details>

<details>
  <summary>Stock Home Page</summary>
  <img src="docs/wireframes/stock_home.png">
</details>

<details>
  <summary>Stock Page - Mobile</summary>
  <img src="docs/wireframes/stock_mobile.png">
</details>

<details>
  <summary>Stock Page - Tablet</summary>
  <img src="docs/wireframes/stock_tablet.png">
</details>
