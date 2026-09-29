# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: no-auth/signUpRelated.spec.ts >> #SU-0004 - Sign up with new (random) credentials and new random organization name.
- Location: tests/no-auth/signUpRelated.spec.ts:95:5

# Error details

```
Test timeout of 90000ms exceeded.
```

```
Error: page.goto: net::ERR_CONNECTION_TIMED_OUT at https://apps.marka-software.company/
Call log:
  - navigating to "https://apps.marka-software.company/", waiting until "load"

```

# Test source

```ts
  1  | import { expect, Page } from "@playwright/test";
  2  | import FooterPage from "../page-components/footer.component";
  3  | 
  4  | 
  5  | export default class SignInPage 
  6  | {
  7  |     page: Page;
  8  |     footer: FooterPage;
  9  | 
  10 | 
  11 |     constructor(page: Page) {
  12 |         this.page = page;
  13 |         this.footer = new FooterPage(page);
  14 |     }
  15 | 
  16 |     // go to sign in page 
  17 |     public async goto(): Promise<void> {
> 18 |         await this.page.goto("/");
     |                         ^ Error: page.goto: net::ERR_CONNECTION_TIMED_OUT at https://apps.marka-software.company/
  19 |     }
  20 | 
  21 |     // Locators
  22 |     get pageHeader() {
  23 |         return this.page.getByRole('heading', { name: 'Login' });
  24 |     }
  25 | 
  26 |     usernameInputField = () => this.page.getByRole('textbox', { name: 'E-Mail' });
  27 |     usernameWarningMsg = () => this.page.locator('#UserName + div.clear + span.field-validation-error');
  28 | 
  29 |     passwordInputField = () => this.page.getByRole('textbox', { name: 'Password' });
  30 |     passwordWarningMsg = () => this.page.locator('#Password + div.clear + span.field-validation-error');
  31 | 
  32 |     loginButton = () => this.page.locator('#btnLogin');
  33 | 
  34 |     forgotPasswordLink = () => this.page.locator('#reset');
  35 |     signUpLink = () => this.page.locator('#alCreateWP');
  36 | 
  37 |     mainWarningMessage = () => this.page.locator("div.login_main span");   
  38 | 
  39 |     // is loaded
  40 |     public async isLoaded(): Promise<void> {
  41 |         await expect(this.pageHeader).toBeVisible();
  42 |     }
  43 | 
  44 |     // Actions 
  45 | 
  46 |     // Username field
  47 |     public async fillUsername(username: string) {
  48 |         await this.usernameInputField().fill(username);
  49 |     }
  50 |     
  51 |     public async getUsernameWarningMsg(){
  52 |         return this.usernameWarningMsg().innerText();
  53 |     }
  54 | 
  55 |     // Password field
  56 |     public async fillPassword(password: string) {
  57 |         await this.passwordInputField().fill(password);
  58 |     }
  59 |     public async getPasswordWarningMsg(){
  60 |         return this.passwordWarningMsg().innerText();
  61 |     }
  62 | 
  63 |     // Login button
  64 |     public async clickLoginButton() {
  65 |         await this.loginButton().click();
  66 |     }
  67 | 
  68 |     // Sign up button/link
  69 |     public async clickSignUpButton() {
  70 |         await this.signUpLink().click();   
  71 |     }
  72 | 
  73 |     // Check warning message contains text
  74 |     public async assertWarningMessageContainsText(expectedText: string) {
  75 |         const actualText = await this.mainWarningMessage().innerText();
  76 |         expect(actualText).toContain(expectedText);
  77 |     }
  78 | 
  79 | }
```