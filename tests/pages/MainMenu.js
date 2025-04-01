'use strict';

const { expect } = require('@playwright/test');

class MainMenu {

    constructor(page) {

        /** @type {import('@playwright/test').Page} */
        this.page = page;

        this.darkModeButton = this.page.locator(".header-icons #darkmode");
        this.searchButton = this.page.locator("button.searchbar-large");
        this.searchBox = this.page.getByPlaceholder("pesquisa");
        this.searchResultsArea = this.page.locator(".search-content.search-bar-results");
        this.searchResultsTitle = this.page.locator(".search-result-title");
    }

    async clickDarkModeButton() {
        await this.darkModeButton.click();
    }

    async insertSearchQuery(query) {
        await this.searchBox.fill(query);
        await expect(this.searchResultsArea).toBeVisible();
    }

    async validateSearchResultPresent(searchResultImageURL, searchResultTitle) {
        await expect(this.page.locator(`a[href="${searchResultImageURL}"]`)).toBeVisible();
        await expect(this.page.getByRole("heading", { name: searchResultTitle })).toBeVisible();
    }

    async validateSearchResultTitle(expectedText) {
        await expect(this.searchResultsTitle).toHaveText(expectedText);
    }

    async clickSearchResult(searchResultImageURL) {
        await this.page.locator(`a[href="${searchResultImageURL}"]`).click();
    }

    async clickSearchButton(searchResultImageURL) {
        await this.searchButton.click();
    }
}

module.exports = { MainMenu };