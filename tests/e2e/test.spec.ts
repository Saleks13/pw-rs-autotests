import { test } from '../../fixtures/base';
import { expect } from '@playwright/test';
import { ConfigReader } from "../../config-reader/config.reader";
import { Localizations } from '../../config-reader/localizations';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({ signInPage, context }) => {
  context.clearCookies();
  await signInPage.goto();
})

test("#S001 - Attempt to Sign Up with existing email.", async ({signInPage, wizardUserInfoPage}) => {

  const email = ConfigReader.EMAIL;  
  const expMsg = "Looks like you already have a RestStep account for " + email + "."; 

  //click sign up button to start the wizard
  await signInPage.clickSignUpButton(); 
  //fill in data on the first wizard page
  await wizardUserInfoPage.fillFirstname("Sergii");
  await wizardUserInfoPage.fillLastname("Aleksandrov");
  await wizardUserInfoPage.fillEmail(email);
  await wizardUserInfoPage.selectLanguage(Localizations.English);
  await wizardUserInfoPage.fillPassword("Password1");
  await wizardUserInfoPage.fillConfirmPassword("Password1");
  await wizardUserInfoPage.acceptTerms();
  //click continue to initizate data validation
  await wizardUserInfoPage.clickContinueButton();

  //verify error message
  await signInPage.isWarningMsgContainsText(expMsg);
})

test("#S002 - Attempt to Sign Up with existing company name.", async ({signInPage, wizardUserInfoPage, wizardRequiredDocsPage, wizardCompanyInfoPage}) => {

  const expMsg = "The Company Name already exists. Please enter a different Company Name"; 

  await signInPage.clickSignUpButton(); 

  await wizardUserInfoPage.fillFirstname("Sergii");
  await wizardUserInfoPage.fillLastname("Aleksandrov");
  await wizardUserInfoPage.fillEmail(faker.internet.email());
  await wizardUserInfoPage.selectLanguage(Localizations.English);
  await wizardUserInfoPage.fillPassword("Password1");
  await wizardUserInfoPage.fillConfirmPassword("Password1");
  await wizardUserInfoPage.acceptTerms();
  await wizardUserInfoPage.clickContinueButton();

  await wizardRequiredDocsPage.clickContinueButton();

  await wizardCompanyInfoPage.fillCompanyName("@sergtest16062024");
  await wizardCompanyInfoPage.fillStreet("Street");
  await wizardCompanyInfoPage.fillZipCode("43324");
  
  await wizardCompanyInfoPage.clickContinueButton();

  await wizardCompanyInfoPage.isWarningMsgContainsText(expMsg);
})

test.skip("#003 - Sign up with new (random) credentials and new random organization name.", async ({page, signInPage}) =>{

  //NOT YET IMPLEMENTED
  

})

test("#S004 - Sign in with known valid credentials (1 company) >> Overview page loaded.", async ({page, signInPage}) =>{

  await signInPage.fillUsername(ConfigReader.EMAIL);
  await signInPage.fillPassword(ConfigReader.PASSWORD);
  await signInPage.clickLoginButton();
  

})

test.skip("#S004a - Sign in with known valid credentials (>1 company) >> Organizations list should be shown.", async ({page, signInPage}) =>{

  await signInPage.fillUsername(ConfigReader.EMAIL);
  await signInPage.fillPassword(ConfigReader.PASSWORD);
  await signInPage.clickLoginButton();
  

})

