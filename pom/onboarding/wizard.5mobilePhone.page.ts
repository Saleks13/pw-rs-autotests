import { expect, Page } from "@playwright/test";
import { PhoneCodes } from "../../testData/phoneCodes";

export default class Wizard5MobilePhonePage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    // Locators 
    phoneCodeDropdown = () => this.page.locator('#PhoneCodeId');
    phoneInput = () => this.page.locator('#Phone');
    verifyButton = () => this.page.getByRole('button');





    // Actions 

    // code dropdown
    public async selectPhoneCode(phoneCode: string) {
        // Validate that the phone code exists in the PhoneCodes enum
        if (!(phoneCode in PhoneCodes)) {
            throw new Error(
                `Invalid phone code: ${String(phoneCode)}. Allowed values are: ${Object.keys(PhoneCodes).join(', ')}`
            );
        }
        const optionValue = PhoneCodes[phoneCode];
        await this.phoneCodeDropdown().selectOption({ value: optionValue});
    }
   
    // phone input
    public async fillPhone(phone: string) {
        await this.phoneInput().fill(phone);
    }

    // verifyButton 
    public async clickVerify(){
        await this.verifyButton().click();
    }



}