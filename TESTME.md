# Manual Testing

## Introduction

This document outlines the manual testing procedures for the Bull Street investment app. Each section corresponds to a specific user story, detailing the steps required to verify the functionality and expected outcomes.

---

## Table of Contents

1. [Account Registration](#account-registration)
2. [Finding Stocks](#finding-stocks)
3. [Individual Stock Research](#individual-stock-research)
4. [Notes](#notes)

---

## Account Registration

### As a new user, I can register an account with my email

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the registration page | Registration page is displayed |
| 2 | Fill out the registration form with a valid email address, password, and any other required fields | Form is filled out correctly |
| 3 | Click the "Register" button | Confirmation email is sent |
| 4 | Confirm the email by clicking the link in the confirmation email | Account is confirmed and user is redirected to the login page |

[![Account Registration with Email Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a new user, I can register an account with my Google

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the registration page | Registration page is displayed |
| 2 | Click the "Register with Google" button | Google login popup is displayed |
| 3 | Select a Google account to use for registration | User is logged in using Google account and redirected to the dashboard |

[![Account Registration with Google Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

---

## Finding Stocks

### As a user, I want to be able to search the stock database for stocks based on the company name

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the search page | Search page is displayed |
| 2 | Enter a company name into the search bar | Company name is entered |
| 3 | Click the "Search" button | Relevant stocks are displayed based on the entered company name |

[![Search Stocks by Company Name Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to filter stocks out of the database based on their yield

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the filter page | Filter page is displayed |
| 2 | Select a yield range from the filter options | Yield range is selected |
| 3 | Click the "Apply Filter" button | Stocks matching the selected yield range are displayed |

[![Filter Stocks by Yield Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to filter out stocks based on their dividend payout ratio

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the filter page | Filter page is displayed |
| 2 | Select a dividend payout ratio range from the filter options | Dividend payout ratio range is selected |
| 3 | Click the "Apply Filter" button | Stocks matching the selected dividend payout ratio range are displayed |

[![Filter Stocks by Dividend Payout Ratio Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to be able to filter stocks based on their price to earnings ratio

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the filter page | Filter page is displayed |
| 2 | Select a price to earnings ratio range from the filter options | Price to earnings ratio range is selected |
| 3 | Click the "Apply Filter" button | Stocks matching the selected price to earnings ratio range are displayed |

[![Filter Stocks by Price to Earnings Ratio Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to be able to build a shortlist of stocks I am interested in

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Search or filter for stocks of interest | Stocks are displayed |
| 2 | Click the "Add to Shortlist" button for each desired stock | Selected stocks are added to the shortlist |
| 3 | Navigate to the shortlist page | Shortlist page is displayed |
| 4 | Verify that the selected stocks are listed in the shortlist | Selected stocks are present in the shortlist |

[![Build Shortlist Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to be able to compare stocks with similar financial metrics in a table, with top-level investment information available

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the compare stocks page | Compare stocks page is displayed |
| 2 | Select multiple stocks to compare | Selected stocks are displayed in a comparison table |
| 3 | Verify that the comparison table displays financial metrics and top-level investment information for the selected stocks | Financial metrics and investment information are correctly displayed |

[![Compare Stocks Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

---

## Individual Stock Research

### As a user, I want to be able to see the latest global index prices

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the dashboard or relevant page | Page is displayed |
| 2 | Verify that the latest global index prices are displayed prominently | Global index prices are displayed |

[![Global Index Prices Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to be able to see the stock price over the previous 12 months

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that the stock price chart displays data for the previous 12 months | Stock price chart is displayed correctly |

[![Stock Price Over 12 Months Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to see key financial highlights

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that key financial highlights are displayed | Key financial highlights are displayed |

[![Key Financial Highlights Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to view basic stock information like its ticker, industry, where it is listed, and a hyperlink to the company website

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that basic stock information like its ticker, industry, listing, and hyperlink to the company website are displayed | Basic stock information is displayed correctly |

[![Basic Stock Information Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want a description of the company to help understand where it operates

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that a description of the company is displayed | Company description is displayed correctly |

[![Company Description Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to see a graphical representation of its revenue, gross, and net income over the past 5 years

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that a graphical representation of its revenue, gross, and net income over the past 5 years is displayed | Graphical representation is displayed correctly |

[![Graphical Representation of Financials Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to see key 5-year CAGR metrics, if available

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that key 5-year CAGR metrics are displayed if available | 5-year CAGR metrics are displayed correctly if available |

[![5-Year CAGR Metrics Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### If available, as a user I want to see analyst ratings as an average and the past month. It is understood that not all stocks are covered by analysts and that this information is not always available

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that analyst ratings are displayed if available | Analyst ratings are displayed correctly if available |

[![Analyst Ratings Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### If the company has paid a dividend over the past 5 years, as a user I want to see this displayed graphically

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that dividend payments over the past 5 years are displayed graphically | Dividend payments are displayed correctly |

[![Dividend Payments Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to see key margin metrics of the business

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that key margin metrics of the business are displayed | Key margin metrics are displayed correctly |

[![Margin Metrics Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to see key valuation metrics of the business

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that key valuation metrics of the business are displayed | Key valuation metrics are displayed correctly |

[![Valuation Metrics Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to see key technical metrics of the business

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that key technical metrics of the business are displayed | Key technical metrics are displayed correctly |

[![Technical Metrics Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a user, I want to see splits and dividend-related data

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the stock detail page | Stock detail page is displayed |
| 2 | Verify that splits and dividend-related data are displayed | Splits and dividend-related data are displayed correctly |

[![Splits and Dividend Data Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

---

## Notes

### As a logged-in user, I want to be able to take investment notes as I go about my research

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the notes page | Notes page is displayed |
| 2 | Enter a new note in the input field | Note is entered correctly |
| 3 | Click the "Save" button | Note is saved and displayed in the list of notes |

[![Take Investment Notes Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a logged-in user, I want to be able to edit investment notes as I go about my research

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the notes page | Notes page is displayed |
| 2 | Click the "Edit" button next to a note | Note is editable |
| 3 | Modify the note and click "Save" | Note is updated and displayed in the list of notes |

[![Edit Investment Notes Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

### As a logged-in user, I want to be able to delete investment notes as I go about my research

| Step | Action | Expected Outcome |
|------|--------|------------------|
| 1 | Navigate to the notes page | Notes page is displayed |
| 2 | Click the "Delete" button next to a note | Note is deleted from the list of notes |

[![Delete Investment Notes Video](https://img.youtube.com/vi/VIDEO_ID_HERE/0.jpg)](https://www.youtube.com/watch?v=VIDEO_ID_HERE)

