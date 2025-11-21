[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# Countries Explorer

A React app that lets you find information about countries around the world.

Live demo -https://afnew-1u37tcsys-nethmis-projects-4949cc7d.vercel.app     or     https://nethmiu.github.io/conn/



<img width="1550" height="742" alt="image" src="https://github.com/user-attachments/assets/95221b56-ff6a-466b-bb73-3177ff2374a0" />




##Introduction

Through this app, you can view the names, flags, populations, regions, capitals, and much more information about different countries. You can search for countries, filter by region, and create a list of favorite countries.


## Requirements

For this app to work on your computer, you must have the following installed:

* **Node.js:** (Recommended version >= 16) - [https://nodejs.org/](https://nodejs.org/)

1.**Clone the repository**

2.**Install packages:**

 ```bash
    npm install
    # or
    yarn install
    ```

 3.## Building

 Before deploying the app, you need to build it:

 ```bash
npm run build
# or
yarn build```

Deploy the app on the development server:
npm start
# or
yarn start


This command will open the app in your default browser at the address http://localhost:3000


Features :

* View a list of all countries in the world.
*Search for countries by name.
*Filter countries by region.
*View details about each country (flag, population, capital, currency, languages, borders, etc.).
*Create,delete and view a list of favorite countries.


Technical Information:

React: A JavaScript library used for building the user interface (UI).
React Router: Used for handling navigation between different pages within the application.
React Bootstrap: Provides pre-built, responsive UI components for a visually appealing interface.
Axios: Used for making HTTP requests to fetch data from the API.
Context API: Used for managing the application's state across different components.
REST Countries API (https://restcountries.com/): The primary API used to retrieve information about countries.

Challenges Faced:

API Rate Limiting: Since we are using the free tier, sending too many requests in quick succession could lead to a temporary block. To address this, we implemented a slight delay (debounce) when handling search and filter functionalities before making API calls.

Missing Data: Occasionally, the API did not provide certain information for some countries (for example, border details). In such cases, we coded the application to display "N/A" (Not Applicable) or to hide the field entirely.

Native Names and Languages: Some countries have multiple native names and languages. To display these clearly, we iterated through the JavaScript objects and arrays and joined them with commas in the code.

Country Border Codes: The border information was provided as country codes (CCA3) rather than country names. Therefore, we had to write additional code to enable navigation to the respective country details page when these codes were clicked.







