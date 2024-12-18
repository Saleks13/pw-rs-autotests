import { test } from "../../fixtures/base";
import { LocalizationLoader } from "../../utils/localizationLoader";
import { Utils } from "../../utils/utils";

test("#SI-0001 - Sign in with single organization user. @smoke", async ({ signInPage, overviewGeneral }) => {

    // go to sign in page
    await signInPage.goto();
    // set existing username email 
    await signInPage.fillUsername(process.env.USERS_USERSINGLEORG_EMAIL || "");
    // set correct password
    await signInPage.fillPassword(process.env.USERS_USERSINGLEORG_PASSWORD || "");
    // click sign in button
    await signInPage.clickLoginButton();
    // check overview header visible 
    await overviewGeneral.assertPageTitleVisible();

})


test("#SI-0002 - Other test", async ({ signInPage, overviewGeneral }) => {

    // go to sign in page
    await signInPage.goto();
    // set existing username email 
    await signInPage.fillUsername(process.env.USERS_USERSINGLEORG_EMAIL || "");
    // set correct password
    await signInPage.fillPassword(process.env.USERS_USERSINGLEORG_PASSWORD || "");
    // click sign in button
    await signInPage.clickLoginButton();
    // check overview header visible 
    await overviewGeneral.assertPageTitleVisible();

})


test("#SU-0004 - [COPY] Sign up with new (random) credentials and new random organization name.",
    async ({ signInPage, wizard1UserInfoPage, wizard2RequiredDocsPage, wizard3CompanyInfoPage, wizard4FinancialInfoPage, wizard5MobilePhonePage, wizard6FinalStepPage, overviewHello }) => {

        // increase timeout for test - db creation causes delays
        test.setTimeout(90000);

        // new user data
        const user = Utils.newRandomUser();

        // expected 
        const expectedHelloMessage = LocalizationLoader.getHelloText(user.firstName, user.lastName);
        const expectedCompanyName = user.companyName;


        // go to sign in page
        await signInPage.goto();
        // click sign up button to start the wizard
        await signInPage.clickSignUpButton();
        
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
        await overviewHello.assertHelloMessageEqualTo(expectedHelloMessage);
        await overviewHello.assertCompanyNameEqualTo(expectedCompanyName);

    })