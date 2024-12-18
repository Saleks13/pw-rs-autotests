import { expect, Page } from "@playwright/test";
import { Locale } from "../../testData/locale";

export default class Wizard1UserInfoPage {

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async goto() {
        await this.page.goto("/Registrierung/UserInfo")
    }

    // Locators 
    pageTitle = () => this.page.locator('#wrapper1 h1');
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

    public async assertPageTitleIsVisible() {
        await expect(this.pageTitle()).toBeVisible();
    }

    // Username field
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
    public async selectLanguage() {
        const locale = process.env.LOCALE || "EN";
        //console.log("LOCALE = " + locale);
        if (!locale) {
            throw new Error(`Locale is not defined in the environment variables.`);
        }

        // Map the locale to the corresponding value in the Localizations enum
        let languageOption: Locale;
        // Set languge option based on the locale value
        switch (locale.toUpperCase()) {
            case 'EN':
                languageOption = Locale.EN;
                break;
            case 'DE':
                languageOption = Locale.DE;
                break;
            default:
                throw new Error(`Invalid locale provided: ${locale}. Supported values are 'EN' or 'DE'.`);
        }
        //console.log("selecting language = ",languageOption);
        await this.languageSelector().selectOption(languageOption);
        if (locale == 'EN') {
            await expect(this.pageTitle()).toHaveText('User Information');
        } else {
            await expect(this.pageTitle()).toHaveText('Benutzerinfo'); 
        }
       
    }

    // Passwords 
    public async fillPassword(password: string) {
        await this.passwordInputField().fill(password);
    }
    public async fillConfirmPassword(password: string) {
        await this.confirmPasswordInputField().fill(password);
    }

    // Terms
    public async acceptTerms() {
        await this.termsCheckbox().click();
    }

    // Continue button
    public async clickContinueButton() {
        await this.continueButton().click();
    }


}