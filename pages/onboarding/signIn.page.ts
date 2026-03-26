import { expect, Page } from "@playwright/test";
import FooterPage from "../page-components/footer.component";


export default class SignInPage 
{
    page: Page;
    footer: FooterPage;


    constructor(page: Page) {
        this.page = page;
        this.footer = new FooterPage(page);
    }

    // go to sign in page 
    public async goto(): Promise<void> {
        await this.page.goto("/");
    }

    // Locators
    get pageHeader() {
        return this.page.getByRole('heading', { name: 'Login' });
    }

    usernameInputField = () => this.page.getByRole('textbox', { name: 'E-Mail' });
    usernameWarningMsg = () => this.page.locator("//span[@class='field-validation-error'][1]");

    passwordInputField = () => this.page.getByRole('textbox', { name: 'Password' });
    passwordWarningMsg = () => this.page.locator("//span[@class='field-validation-error'][2]");

    loginButton = () => this.page.locator('#btnLogin');

    forgotPasswordLink = () => this.page.locator('#reset');
    signUpLink = () => this.page.locator('#alCreateWP');

    mainWarningMessage = () => this.page.locator("div.login_main span");   

    // is loaded
    public async isLoaded(): Promise<void> {
        await expect(this.pageHeader).toBeVisible();
    }

    // Actions 

    // Username field
    public async fillUsername(username: string) {
        await this.usernameInputField().fill(username);
    }
    
    public async getUsernameWarningMsg(){
        return this.usernameWarningMsg().innerText();
    }

    // Password field
    public async fillPassword(password: string) {
        await this.passwordInputField().fill(password);
    }
    public async getPasswordWarningMsg(){
        return this.passwordWarningMsg().innerText();
    }

    // Login button
    public async clickLoginButton() {
        await this.loginButton().click();
    }

    // Sign up button/link
    public async clickSignUpButton() {
        await this.signUpLink().click();   
    }

    // Check warning message contains text
    public async assertWarningMessageContainsText(expectedText: string) {
        const actualText = await this.mainWarningMessage().innerText();
        expect(actualText).toContain(expectedText);
    }

}