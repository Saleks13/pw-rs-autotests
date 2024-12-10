# Welcome to RS automaton testing framework!

This **README** provides a guide to set up and use the automation testing framework using Playwright. It includes instructions for setting up the project, writing tests, and executing them. Please follow these steps to get your development environment ready.


## Prerequisites

-   **Node.js** (version 18 or later) installed on your system. You can download it from [Node.js official website](https://nodejs.org/).
    
-   **npm** (comes with Node.js) or **yarn** for package management.
    
-   **Git** for cloning the repository.
    
-   A code editor (e.g., **VS Code**).

## Getting Started

1.  **Clone the Repository**
    
    ```
    git clone <repository-url>
    cd <repository-name>
    ```
    
2.  **Install Dependencies** Install the required packages using npm or yarn:
    
    ```
    npm install
    # or
    yarn install
    ```
    
3.  **Set Up Environment Variables**
    
    -   Request `.env.test or/and .env.prod` files to get default values for sensitive input test data:
        
    -   Put `.env` files to the root of the project folder.

## Running Tests

 -  **Run All Tests** To execute all tests, run the following command:
    
    ```
    npx playwright test
    ```
    
 -  **Run Specific Tests** To run a specific test file, use:
    
    ```
    npx playwright test tests/<test-file-name>.spec.ts
    ```
    
 -  **Generate Test Reports** By default, Playwright generates an HTML report after running the tests. You can view it by running:    
    ```
    npx playwright test tests/<test-file-name>.spec.ts
    ```
 -  **Run Tests in headed mode** To run in a headed mode, use:
    
    ```
    npx playwright test --headed
    ```
## Tests structure & rules
The **Page Object Model (POM)** design pattern is used to improve test code maintainability and readability. Each web page or a significant part of it is represented as a **class** and stored in **pages** in a specific folder. 
 - Tests are located in a separate folder **tests**, which is also
   configured in *playwright.config.ts*: 
   
       testDir:  './tests'
 - Each test file defines set of tests specific for a given module or
   functionality and should have specific name ending ***.spec.ts***,
   for example, tests covering *Sing up* process: 
   
       signUp.spec.ts
 - **Fixtures** are used in this test framework to provide reusable and preconfigured object for the web pages or repeatable page components.
 - **Assertions** are being made on page class side to make test in the code clear.
 - Example of the test: 
   
           test("#S001 - Sign up page opened.", async ({ signInPage, wizard1UserInfoPage }) => { 
       
   		    // click sign up button to start the wizard
       
   		    await  signInPage.clickSignUpButton();  
       
   		    // select language
       
   		    await  wizard1UserInfoPage.selectLanguage();  
       
   		    // check first wizard page title shown
       
   		    await  wizard1UserInfoPage.isTitleVisible(); 
       
       })
