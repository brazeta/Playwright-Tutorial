'use strict';

const { expect } = require('@playwright/test');

class MainMenu {

    elements = {

        darkModeLocator: ".header-icons #darkmode",

        darkModeButton: () => this.page.locator(".header-icons #darkmode"),
        searchButton: () => this.page.locator("button.searchbar-large"),
        searchBox: () => this.page.getByPlaceholder("pesquisa"),
        searchResultsArea: () => this.page.locator(".search-content.search-bar-results"),
        searchResultsTitle: () => this.page.locator(".search-result-title"),

        searchResultImageLinkLocator: (searchResultImageURL) => this.page.locator(`a[href="${searchResultImageURL}"]`),
        searchResultTitleLocator: (searchResultTitle) => this.page.getByRole("heading", { name: searchResultTitle }),
    }

    /** Creates an instance of the Main Menu section (present in all web pages) 
    */
    constructor(page) {

        /** @type {import('@playwright/test').Page} */
        this.page = page;

    }

    /**
     * Click on the button to toogle between Dark and Light mode
     */
    async clickDarkModeButton() {
        await this.elements.darkModeButton().click();
    }

    /**
     * Insert a text in the Search input
     * @param {String} query - The text to insert in the input element
     */
    async insertSearchQuery(query) {
        await this.elements.searchBox().fill(query);
        await expect(this.elements.searchResultsArea()).toBeVisible();
    }

    /**
     * Validate that an element is present in the search results area, using the image URL and the title of the element
     * @param {String} searchResultImageURL - The URL of the image
     * @param {String} searchResultTitle - The title of the element (e.g. Book Title)
     */
    async validateSearchResultPresent(searchResultImageURL, searchResultTitle) {
        await expect(this.elements.searchResultImageLinkLocator(searchResultImageURL)).toBeVisible();
        await expect(this.elements.searchResultTitleLocator(searchResultTitle)).toBeVisible();
    }

    /**
     * Validate the text displayed on top of the search results area and that should contain the query information used for the search
     * @param {String} expectedText - The string that contains the expected text
     */
    async validateSearchResultTitle(expectedText) {
        await expect(this.elements.searchResultsTitle()).toHaveText(expectedText);
    }

    /**
     * Click on the image of one of the search results
     * @param {String} searchResultImageURL - The URL of the image 
     */
    async clickSearchResult(searchResultImageURL) {
        await this.elements.searchResultImageLinkLocator(searchResultImageURL).click();
    }

    /**
     * Click on the Search button
     */
    async clickSearchButton() {
        await this.elements.searchButton().click();
    }
}

module.exports = { MainMenu };