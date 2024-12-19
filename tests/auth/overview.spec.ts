import { test } from "../../fixtures/base.fixture";

test("#OV-0001 - Check overview page loaded after sign in.", async ({ overviewGeneral }) => {

    // check overview header visible 
    await overviewGeneral.goto();
    await overviewGeneral.assertPageTitleVisible();

})