import { test as setup } from '../fixtures/onboarding.fixture';
import path from "path";

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page, signInPage, overviewGeneral }) => {

    await signInPage.goto();
    await signInPage.fillUsername(process.env.USERS_USERSINGLEORG_EMAIL || "");
    await signInPage.fillPassword(process.env.USERS_USERSINGLEORG_PASSWORD || "");
    await signInPage.clickLoginButton();

    await overviewGeneral.assertPageTitleVisible();

    await page.context().storageState( {path: authFile} ) 

})