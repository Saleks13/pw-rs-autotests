import { test } from '../../fixtures/base';
import { faker } from '@faker-js/faker';
import { TestDataLoader } from '../../testData/testDataLoader';
import { WarningMessagesLoader } from '../../testData/warningMessagesLoader';
import { getUniqueCompanyName } from '../../testData/utils';
import { LegalForm } from '../../config-reader/legalForm';


test.beforeEach(async ({ signInPage }) => {
  await signInPage.goto();
})

test("#S001 - Attempt to Sign Up with existing email.", async ({signInPage, wizard1UserInfoPage: wizardUserInfoPage}) => {

  //get valid user's data
  const validUser = TestDataLoader.getValidUser();

  //get specific input data
  const email = process.env.USERS_USERSINGLEORG_EMAIL;  
  const firstName = validUser.FIRSTNAME;
  const lastName = validUser.LASTNAME;
  const password = validUser.PASSWORD;
  //get expected warning message
  const expMsg = WarningMessagesLoader.formatMessage("emailExists", {email}); 

  //click sign up button to start the wizard
  await signInPage.clickSignUpButton(); 
  //fill in data on the first wizard page
  await wizardUserInfoPage.fillFirstname(firstName);
  await wizardUserInfoPage.fillLastname(lastName);
  await wizardUserInfoPage.fillEmail(email);
  await wizardUserInfoPage.selectLanguage();
  await wizardUserInfoPage.fillPassword(password);
  await wizardUserInfoPage.fillConfirmPassword(password);
  await wizardUserInfoPage.acceptTerms();
  //click continue to initizate data validation
  await wizardUserInfoPage.clickContinueButton();

  //verify error message
  await signInPage.isWarningMsgContainsText(expMsg);

})

test("#S002 - Attempt to Sign Up with existing company name.", async ({signInPage, wizard1UserInfoPage: wizardUserInfoPage, wizard2RequiredDocsPage: wizardRequiredDocsPage, wizard3CompanyInfoPage: wizardCompanyInfoPage}) => {

  //get valid user's data
  const validUser = TestDataLoader.getValidUser();
  //get company name which is already in the system
  const existingCompanyName = TestDataLoader.getExistingCompany();

  //get specific input data
  const randomEmail = faker.internet.email();
  const firstName = validUser.FIRSTNAME;
  const lastName = validUser.LASTNAME;
  const password = validUser.PASSWORD;
  //get expected warning message
  const expMsg = WarningMessagesLoader.formatMessage("companyExists", {existingCompanyName}); 
  
  //click sign up button to start the wizard
  await signInPage.clickSignUpButton(); 

  //fill in data on the first wizard page
  await wizardUserInfoPage.fillFirstname(firstName);
  await wizardUserInfoPage.fillLastname(lastName);
  await wizardUserInfoPage.fillEmail(randomEmail);
  await wizardUserInfoPage.selectLanguage();
  await wizardUserInfoPage.fillPassword(password);
  await wizardUserInfoPage.fillConfirmPassword(password);
  await wizardUserInfoPage.acceptTerms();
  
  //click continue to initizate data validation
  await wizardUserInfoPage.clickContinueButton();

  //click continue button to proceed to company info wizard step
  await wizardRequiredDocsPage.clickContinueButton();

  //fill in required data including existing company name
  await wizardCompanyInfoPage.fillCompanyName(existingCompanyName);
  await wizardCompanyInfoPage.fillStreet("Street");
  await wizardCompanyInfoPage.fillZipCode("43324");
  
  //click continue button to trigger company name validation
  await wizardCompanyInfoPage.clickContinueButton();

  //validate warning message
  await wizardCompanyInfoPage.isWarningMsgContainsText(expMsg);
})

test.only("#S003 - Sign up with new (random) credentials and new random organization name.", 
  async ({page, wizard1UserInfoPage, wizard2RequiredDocsPage, wizard3CompanyInfoPage, wizard4FinancialInfoPage }) =>{

  //get valid user's data
  const validUser = TestDataLoader.getValidUser();

  //get specific input data
  const randomEmail = faker.internet.email();
  const firstName = validUser.FIRSTNAME;
  const lastName = validUser.LASTNAME;
  const password = validUser.PASSWORD;
  const companyName = getUniqueCompanyName();
  const streetAddress = TestDataLoader.getStreetAddress();
  const zipCode = TestDataLoader.getZipCode();
  const city = TestDataLoader.getCity();
  const secondaryAddress = TestDataLoader.getSecondaryAddress();
  const telephone = TestDataLoader.getTelephone();

  //go to wizard first page
  await wizard1UserInfoPage.goto();
  //fill in data on the first wizard page
  await wizard1UserInfoPage.fillFirstname(firstName);
  await wizard1UserInfoPage.fillLastname(lastName);
  await wizard1UserInfoPage.fillEmail(randomEmail);
  await wizard1UserInfoPage.selectLanguage();
  await wizard1UserInfoPage.fillPassword(password);
  await wizard1UserInfoPage.fillConfirmPassword(password);
  await wizard1UserInfoPage.acceptTerms();

  //click continue to initizate data validation
  await wizard1UserInfoPage.clickContinueButton();

  //click continue button on the required documents page
  await wizard2RequiredDocsPage.clickContinueButton();

  //fill in required data on company info page 
  await wizard3CompanyInfoPage.fillCompanyName(companyName);
  await wizard3CompanyInfoPage.fillStreet(streetAddress);
  await wizard3CompanyInfoPage.fillZipCode(zipCode);
  await wizard3CompanyInfoPage.selectLefalForm(LegalForm.AG);
  await wizard3CompanyInfoPage.fillCity(city);
  await wizard3CompanyInfoPage.fillSecondaryAddress(secondaryAddress);
  await wizard3CompanyInfoPage.fillTelephone(telephone);
  await wizard3CompanyInfoPage.clickContinueButton();

  //
  await wizard4FinancialInfoPage.selectDay(13);
  await wizard4FinancialInfoPage.selectDay(3);

  page.pause();



})

test("#S004 - Sign in with known valid credentials (1 company) >> Overview page loaded.", async ({page, signInPage, footerPage}) =>{


  await signInPage.clickLoginButton();
  await footerPage.isFooterContainsText("© 2024 RestStep AG. All Rights Reserved.");

})

// test.skip("#S004a - Sign in with known valid credentials (>1 company) >> Organizations list should be shown.", async ({ signInPage}) =>{

//   await signInPage.fillUsername(process.env.USERS_USERMULTIORG_EMAIL);
//   await signInPage.fillPassword(process.env.USERS_USERMULTIORG_PASSWORD);
//   await signInPage.clickLoginButton();
  
// })
