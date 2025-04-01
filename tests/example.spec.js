// @ts-check
import { test, expect } from '@playwright/test';

const { MainMenu } = require("./pages/MainMenu");
const { HomePage } = require("./pages/HomePage");
const { BookPage } = require("./pages/BookPage");
const { CookiesArea } = require("./pages/CookiesArea");
const { ResultsPage } = require("./pages/ResultsPage");




test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test("Leya Online - Training Tutorial", async ({ page }) => {

  let homePage = new HomePage(page);
  let mainMenu = new MainMenu(page);
  let bookPage = new BookPage(page);


  await homePage.navigateToHomePage();

  await homePage.validatePageTitle("LeYa Online")



  await mainMenu.clickDarkModeButton();

  await mainMenu.insertSearchQuery("1984");

  await mainMenu.validateSearchResultPresent('https://leyaonline.com/pt/livros/romance/1984/', "1984");

  await mainMenu.clickSearchResult('https://leyaonline.com/pt/livros/romance/1984/');



  await bookPage.verifyBreadcrumbVisible();

  await bookPage.verifyBookImageVisible("https://leyaonline.com/fotos/produtos/500_9789722071550_1984_george_orwell.jpg");

  await bookPage.verifyAuthor("GEORGE ORWELL");

  await bookPage.verifyBookTitle("1984");

});

test("Leya Online - Scenario 1", async ({ page }) => {

  let homePage = new HomePage(page);
  let mainMenu = new MainMenu(page);
  let bookPage = new BookPage(page);
  let cookiesArea = new CookiesArea(page);
  let resultsPage = new ResultsPage(page);
  
  let book250pxImage = "https://leyaonline.com/fotos/produtos/250_9789722071581_o_triunfo_dos_porcos.jpg";
  let book500pxImage = "https://leyaonline.com/fotos/produtos/500_9789722071581_o_triunfo_dos_porcos.jpg";
  let bookName = "O Triunfo dos Porcos";
  let bookAuthor = "GEORGE ORWELL";
  let bookAuthorURL = "https://leyaonline.com/pt/autores/george-orwell/";
  let bookPrice = "9,90";
  

  await homePage.navigateToHomePage();

  await homePage.validatePageTitle("LeYa Online");


  await cookiesArea.validateCookiesAreaDisplayed();

  await cookiesArea.clickAcceptButton();


  await mainMenu.insertSearchQuery("George");

  await mainMenu.validateSearchResultTitle('Resultados de livros para a pesquisa “George” ');

  await mainMenu.clickSearchButton();


  await resultsPage.verifyBreadcrumbVisible();
  
  await resultsPage.verifyPageTitleVisible();

  await resultsPage.verifySearchResultMatches(38);
  
  await resultsPage.validateBookVisible(83457, book250pxImage, bookName, bookAuthor, bookPrice);
  
  await resultsPage.clickOnBookRecord(83457);


  
  await bookPage.verifyBreadcrumbText(bookName);
  
  await bookPage.verifyBookImageVisible(book500pxImage);

  await bookPage.verifyBookTitle(bookName);

  await bookPage.verifyAuthorLinkinViewPort(bookAuthor);

  await bookPage.verifyAuthorLinkURL(bookAuthor, bookAuthorURL);

  await bookPage.verifySinopseContainsText("Quinta Manor"); //updated here also

});

test("Scenario 2 - Leya Online", async({page}) =>{
  let homePage = new HomePage(page);

  await homePage.navigateToHomePage();

});

