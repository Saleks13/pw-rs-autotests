import { test } from "../fixtures/base";
import { TestDataLoader } from "../testData/testDataLoader";
import { LocalizationLoader } from "../utils/localizationLoader";
import { Utils } from "../utils/utils";


test.beforeEach(async ({ signInPage }) => {
    await signInPage.goto();
})

test("#S001 - Attempt to Sign Up with existing email.", async ({ signInPage, wizard1UserInfoPage: wizardUserInfoPage }) => {

    // new user data
    const user = Utils.newRandomUser();
    // get existing email
    const email = process.env.USERS_USERSINGLEORG_EMAIL || "test@test.com";

    // get expected warning message
    const expMsg = LocalizationLoader.formatMessage("emailExists", { email });

    // click sign up button to start the wizard
    await signInPage.clickSignUpButton();
    // fill in data on the first wizard page
    await wizardUserInfoPage.fillFirstname(user.firstName);
    await wizardUserInfoPage.fillLastname(user.lastName);
    await wizardUserInfoPage.fillEmail(email);
    await wizardUserInfoPage.selectLanguage();
    await wizardUserInfoPage.fillPassword(user.password);
    await wizardUserInfoPage.fillConfirmPassword(user.password);
    await wizardUserInfoPage.acceptTerms();
    // click continue to initizate data validation
    await wizardUserInfoPage.clickContinueButton();

    // verify error message
    await signInPage.isWarningMsgContainsText(expMsg);

})

test("#S002 - Attempt to Sign Up with existing company name.", async ({ signInPage, wizard1UserInfoPage: wizardUserInfoPage, wizard2RequiredDocsPage: wizardRequiredDocsPage, wizard3CompanyInfoPage: wizardCompanyInfoPage }) => {

    // new user data
    const user = Utils.newRandomUser();
    // get company name which is already in the system
    const existingCompanyName = TestDataLoader.getExistingCompany();

    // get expected warning message
    const expMsg = LocalizationLoader.formatMessage("companyExists", { existingCompanyName });

    // click sign up button to start the wizard
    await signInPage.clickSignUpButton();

    // fill in data on the first wizard page
    await wizardUserInfoPage.fillFirstname(user.firstName);
    await wizardUserInfoPage.fillLastname(user.lastName);
    await wizardUserInfoPage.fillEmail(user.email);
    await wizardUserInfoPage.selectLanguage();
    await wizardUserInfoPage.fillPassword(user.password);
    await wizardUserInfoPage.fillConfirmPassword(user.password);
    await wizardUserInfoPage.acceptTerms();

    // click continue to initizate data validation
    await wizardUserInfoPage.clickContinueButton();

    // click continue button to proceed to company info wizard step
    await wizardRequiredDocsPage.clickContinueButton();

    // fill in required data including existing company name
    await wizardCompanyInfoPage.fillCompanyName(existingCompanyName);
    await wizardCompanyInfoPage.fillStreet(user.streetAddress);
    await wizardCompanyInfoPage.fillZipCode(user.zipCode);

    // click continue button to trigger company name validation
    await wizardCompanyInfoPage.clickContinueButton();

    // validate warning message
    await wizardCompanyInfoPage.isWarningMsgContainsText(expMsg);

})

test("#S003 - Sign up with new (random) credentials and new random organization name.",
    async ({ page, wizard1UserInfoPage, wizard2RequiredDocsPage, wizard3CompanyInfoPage, wizard4FinancialInfoPage, wizard5MobilePhonePage, wizard6FinalStepPage, overviewHello }) => {

        // increase timeout for test - db creation causes delays
        test.setTimeout(90000);

        // new user data
        const user = Utils.newRandomUser();

        // expected 
        const expectedHelloMessage = LocalizationLoader.getHelloText(user.firstName, user.lastName);
        const expectedCompanyName = user.companyName;

        // go to wizard first page
        await wizard1UserInfoPage.goto();
        // fill in data on the first wizard page
        await wizard1UserInfoPage.fillFirstname(user.firstName);
        await wizard1UserInfoPage.fillLastname(user.lastName);
        await wizard1UserInfoPage.fillEmail(user.email);
        await wizard1UserInfoPage.selectLanguage();
        await wizard1UserInfoPage.fillPassword(user.password);
        await wizard1UserInfoPage.fillConfirmPassword(user.password);
        await wizard1UserInfoPage.acceptTerms();
        // click continue to initizate data validation
        await wizard1UserInfoPage.clickContinueButton();

        // click continue button on the required documents page
        await wizard2RequiredDocsPage.clickContinueButton();

        // fill in required data on company info page 
        await wizard3CompanyInfoPage.fillCompanyName(user.companyName);
        await wizard3CompanyInfoPage.fillStreet(user.streetAddress);
        await wizard3CompanyInfoPage.fillZipCode(user.zipCode);
        await wizard3CompanyInfoPage.selectLefalForm(user.legalForm);
        await wizard3CompanyInfoPage.fillCity(user.city);
        await wizard3CompanyInfoPage.fillSecondaryAddress(user.secondaryAddress);
        await wizard3CompanyInfoPage.fillTelephone(user.telephone);
        await wizard3CompanyInfoPage.clickContinueButton();

        // fill financial info
        await wizard4FinancialInfoPage.selectDay(user.financialYearStartDay);
        await wizard4FinancialInfoPage.selectMonth(user.financialYearStartMonth);
        await wizard4FinancialInfoPage.selectVat(user.vatType);
        await wizard4FinancialInfoPage.fillVat(user.vatValue);
        await wizard4FinancialInfoPage.clickContinueButton();

        // spcify phone number
        await wizard5MobilePhonePage.selectPhoneCode(user.phoneCode);
        await wizard5MobilePhonePage.fillPhone(user.phoneNumber);
        await wizard5MobilePhonePage.clickVerify()

        // click finish to complete wizard
        await wizard6FinalStepPage.clickFinish();

        // assert value on overview page
        await overviewHello.isHelloMessageEqual(expectedHelloMessage);
        await overviewHello.isCompanyNameEqual(expectedCompanyName);

    })