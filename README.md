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

