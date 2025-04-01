'use strict';

const { expect } = require('@playwright/test');

class BookPage {

  constructor(page) {

    /** @type {import('@playwright/test').Page} */
    this.page = page;

    this.breadcrumb = this.page.locator(".breadcrumb");
    this.bookTitle = this.page.locator(`div[class="h1"]`);
    this.bookArea = this.page.locator(`div[class="row banner-large"]`);
    this.sinopseArea = this.page.locator(`section.sinopse`).locator(`.show-more`);
  }

  async verifyBreadcrumbVisible() {
    await expect(this.breadcrumb).toBeVisible();

  }

  async verifyBreadcrumbText(breadcrumbText) {
    await expect(this.page.locator(`li[class="breadcrumb-item active"]`).getByText(breadcrumbText)).toBeVisible();

  }

  async verifyBookImageVisible(imageURL) {
    await expect(this.page.locator(`img[src="${imageURL}"]`)).toBeVisible();
  }

  async verifyAuthor(author) {
    await expect(this.page.getByRole("heading", { name: author, exact: true })).toBeVisible();
  }

  async verifyAuthorLinkinViewPort(author) {
    await expect(this.bookArea.getByRole("link", { name: author })).toBeInViewport();
  }

  async verifyAuthorLinkURL(author, url) {
    await expect(this.bookArea.getByRole("link", { name: author })).toHaveAttribute("href", url, { ignoreCase: true, });
  }

  async verifyBookTitle(BookTitle) {
    await expect(this.bookTitle).toHaveText(BookTitle, { exact: true });
  }

  async verifySinopseContainsText(text) {
    await expect(this.sinopseArea).toContainText(text);
  }

}

module.exports = { BookPage };