import { test } from "../../fixtures/base";

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