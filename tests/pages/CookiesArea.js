'use strict';

const { expect } = require('@playwright/test');

class CookiesArea {

    

    constructor(page) {

        /**@type {import('@playwright/test').Page} */
        this.page = page;

        this.cookiesArea = this.page.locator("#cookiescript_injected");
        this.acceptButton = this.page.locator("#cookiescript_accept");
        this.rejectButton = this.page.locator("#cookiescript_reject");
    }

    async validateCookiesAreaDisplayed() {
        await expect(this.cookiesArea).toBeVisible();
    }

    async clickAcceptButton() {
        await this.acceptButton.click();
    }

    async clickAcceptButton() {
        await this.rejectButton.click();
    }

    
}

module.exports = { CookiesArea };