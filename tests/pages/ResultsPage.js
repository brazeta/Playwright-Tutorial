'use strict';

const { expect } = require('@playwright/test');

class ResultsPage {

  constructor(page) {

    /** @type {import('@playwright/test').Page} */
    this.page = page;

    this.breadcrumb = this.page.locator(".breadcrumb").getByText("Pesquisa");
    this.pageTitle = this.page.getByText('LeYa o que procura');
    this.searchMatches = this.page.locator(".search-result-nmbr");

  }

  async verifyBreadcrumbVisible() {
    await expect(this.breadcrumb).toBeVisible();

  }

  async verifyPageTitleVisible() {
    await expect(this.pageTitle).toBeVisible();
  }

  async verifySearchResultMatches(numberOfMatches) {
    await expect(this.searchMatches).toHaveText(`${numberOfMatches} resultados para “George”`);
  }

  async validateBookVisible(bookNumber, imageUrl, bookName, author, price) {

    await expect(this.page.locator(`#bookcard_${bookNumber}`)).toBeVisible();

    await expect(this.page.locator(`#bookcard_${bookNumber}`).locator(`img[src="${imageUrl}"]`)).toBeVisible();

    await expect(this.page.locator(`#bookcard_${bookNumber}`).getByRole("heading", { name: bookName })).toBeVisible();

    await expect(this.page.locator(`#bookcard_${bookNumber}`).locator(`div[class="book-author"]`)).toHaveText(author);

    await expect(this.page.locator(`#bookcard_${bookNumber}`).getByRole("heading", { name: `€${price}` })).toBeVisible();
  }

  async clickOnBookRecord(bookNumber) {

    await this.page.locator(`#bookcard_${bookNumber}`).click();
  }


}

module.exports = { ResultsPage };