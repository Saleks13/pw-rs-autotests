import { expect, Page } from "@playwright/test";
import { Localizations } from "../../config-reader/localizations";


export default class WizardUserInfoPage 
{
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async goto()
    {
        await this.page.goto("/Registrierung/UserInfo")
    }

    // Locators 
    firstnameInputField = () => this.page.locator('#FirstName');
    lastnameInputField = () => this.page.locator('#LastName');
    emailInputField = () => this.page.locator('#EMail');
    languageSelector = () => this.page.locator('#DefaultLanguage');
    passwordInputField = () => this.page.locator('#Password');
    confirmPasswordInputField = () => this.page.locator('#ConfirmPassword');

    errorsMessagesBlock = () => this.page.locator("#Errors");
    termsCheckbox = () => this.page.locator("#Read");

    cancelButton = () => this.page.locator('input[class*="cancelIco"]');
    continueButton = () => this.page.locator('#bContinue');

    usernameWarningMsg = () => this.page.getByText('E-Mail is required.');    


    // Actions 

    // Usarname field
    public async fillFirstname(username: string) {
        await this.firstnameInputField().fill(username);
    }

    // Lastname field
     public async fillLastname(lastname: string) {
        await this.lastnameInputField().fill(lastname);
    }
    // Email field
     public async fillEmail(email: string) {
        await this.emailInputField().fill(email);
    }

    // Language selector
    public async selectLanguage(language: Localizations) {
        await this.languageSelector().selectOption(language);
    }

    // Passwords 
    public async fillPassword(password: string) {
        await this.passwordInputField().fill(password);
    }
    public async fillConfirmPassword(password: string) {
        await this.confirmPasswordInputField().fill(password);
    }


    //Terms
    public async acceptTerms() {
        await this.termsCheckbox().click();
    }

    //Continue button
    public async clickContinueButton() {
        await this.continueButton().click();
    }


}