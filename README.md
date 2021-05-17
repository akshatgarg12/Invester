# Invester
### A portfolio management application
Manage all your investments at one place without any hassle.

## Problems the application is solving
1. Maintain all your investments at a single place like stocks, crypto currencies and mutual-funds. (more categories are to be added)
2. Create test portfolios to test your investment skills
3. Shows the portfolio values in both INR and USD
4. Generate reports and makes portfolio analysis easy

## Key features
1. Authentication with google, handled by firebase
2. Create a new portfolio
3. Add investments to the portfolio in domains like stocks(NSE, NASDAQ) , crypto currencies and mutualFunds.
4. Monitor investments in multiple currencies currently supports INR, USD.
5. Progress web app, can be installed on mobile devices.

## Full stack Typescript
1. ReactJS + Material UI
2. Firebase firestore and firestore rules to secure data
3. NodeJS + express to fetch realtime prices of investments from multiple API's like CoinGecko, RapidAPI.

## Local setup
1. Initialise a firebase project
2. Create a .env file in frontend using .env.sample and fill in the credentials from firebase
```shell
  cd client
  npm install
```
3. Get the API keys from Rapid API and fixer(currency exchange rates), initialise a cloud hosted redis DB (for caching | prod)
4. Create a .env file in server using the .env.sample and paste in the credentials
```shell
  cd server
  npm install
```
5. To run the frontend, in the root folder of project:
  ```shell
  sh run_frontend.sh
  ```
6. To run the backend , in the root folder of project:
```shell
  sh run_server.sh
  ```
## Deployment
1. Make sure you have initialised a cloud hosted redis DB and pasted the credentials in server .env file.
2. Create and initialise the project with heroku and deploy the server
```shell
  git subtree push --prefix server heroku master
```
3. Deploy frontend on vercel, make sure their are no ts-lint warnings before deploying. 
4. Add the deployed frontend link to firebase auth links, to make the authentication work.
