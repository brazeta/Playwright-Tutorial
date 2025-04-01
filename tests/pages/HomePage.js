'use strict';

const { expect } = require('@playwright/test');

class HomePage {

    constructor(page) {

        /** @type {import('@playwright/test').Page}*/
        this.page = page;
    }

    async navigateToHomePage() {
        await this.page.goto("https://leyaonline.com/pt/");
        await expect(this.page).toHaveURL("https://leyaonline.com/pt/");
    }

    async validatePageTitle(expectedTitle) {
        await expect(this.page).toHaveTitle(expectedTitle);
    }

}

module.exports = { HomePage };