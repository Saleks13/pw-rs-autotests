import { expect, Page } from "@playwright/test";

export default class WizardCompanyInfoPage 
{
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    // Locators 
    companyNameField = () => this.page.locator('#CompanyName');
    streetField = () => this.page.locator('#Address');
    zipField = () => this.page.locator('#ZIPCode');
    cityField = () => this.page.locator('#City');
    legalFormDropdown = () => this.page.locator('#LegalForm');
    secondaryAddressField = () => this.page.locator('#Address2');
    phoneField = () => this.page.locator('#Telephone');

    errorField = () => this.page.locator('.field-validation-error');

    cancelButton = () => this.page.locator('.prev.btnmargin:first-child');
    continueButton = () => this.page.locator('.continue');



    // Actions 

    //Company Name
    public async fillCompanyName(name: string) {
        await this.companyNameField().fill(name);
    }

    //Street 
    public async fillStreet(street: string) {
        await this.streetField().fill(street);
    }

    //Zip code
    public async fillZipCode(code: string) {
        await this.zipField().fill(code);
    }

    //Legal form
    public async selectLefalForm(option: string) {
        await this.legalFormDropdown().selectOption(option);
    }

    //Secondary address
    public async fillSecondaryAddress(address: string) {
        await this.secondaryAddressField().fill(address);
    }

    //telephone
    public async fillPhone(phone: string) {
        await this.phoneField().fill(phone);
    }

    //Continue button
    public async clickContinueButton() {
        await this.continueButton().click();
    }

    //Check warning message contains text
    public async isWarningMsgContainsText(msg: string) {
        return expect(await this.errorField().innerText()).toContain(msg);
    }


}