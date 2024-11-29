import { expect, Page } from "@playwright/test";
import { FooterPage } from "../page components/footer.component";


export default class SignInPage 
{
    page: Page;
    footer: FooterPage;


    constructor(page: Page) {
        this.page = page;
        this.footer = new FooterPage(page);
    }

    public async goto()
    {
        await this.page.goto("/");
    }

    // Locators 
    usernameInputField = () => this.page.locator('#UserName');
    usernameWarningMsg = () => this.page.getByText('E-Mail is required.');

    passwordInputField = () => this.page.locator('#Password');
    passwordWarningMsg = () => this.page.getByText('Password is required.');

    loginButton = () => this.page.locator('#btnLogin');

    forgotPasswordLink = () => this.page.locator('#reset');
    signUpLink = () => this.page.locator('#alCreateWP');

    mainWarningMessage = () => this.page.locator("div.login_main span");   


    // Actions 

    // Username field
    public async fillUsername(username: string) {
        await this.usernameInputField().fill(username);
    }
    
    public async getUsernameWarningMsg(){
        return this.usernameWarningMsg().innerText();
    }

    //Password field
    public async fillPassword(password: string) {
        await this.passwordInputField().fill(password);
    }
    public async getPasswordWarningMsg(){
        return this.passwordWarningMsg().innerText();
    }

    //Login button
    public async clickLoginButton() {
        await this.loginButton().click();
    }

    //Sign up button/link
    public async clickSignUpButton() {
        await this.signUpLink().click();   
    }

    //Check warning message contains text
    public async isWarningMsgContainsText(msg: string) {
        return expect(await this.mainWarningMessage().innerText()).toContain(msg);
    }

}