//HOW TO USE
//1. In terminal type: 'script output.txt'
//2. node scrape4.js
//3. When you see ' ------Done-----' type 'exit'
//4. output.txt will be seen in same folder as program

var links;
const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false, timeout: 0});
  const page = await browser.newPage();
  const link_start = 0;
    // let allLinks = []

  await page.goto('https://merchanthub.fmtc.co/cp/program_directory');
    // const navigationPromise = page.waitForNavigation()
    // await navigationPromise
    //await page.waitForSelector('.row > .col-sm-5 > #program_directory_table_length > label > select')
  page.click('.row > .col-sm-5 > #program_directory_table_length > label > select')
  page.select('.row > .col-sm-5 > #program_directory_table_length > label > select', '-1')
    //await page.waitForSelector('.row > .col-sm-5 > #program_directory_table_length > label > select')
  page.click('.row > .col-sm-5 > #program_directory_table_length > label > select')

    // await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
  await page.waitFor(10000);
  const result = await page.evaluate((selector) => {
    const nodes = document.querySelectorAll(selector);
    const links = [...nodes];
    return links.map(link => link.href);
  },'#program_directory_table > tbody > tr > td > a');
    //console.log(result)
    const compNames = await page.evaluate((selector) => {
      const nodes = document.querySelectorAll(selector);
      const links = [...nodes];
      return links.map(link => link.textContent);
    },'#program_directory_table > tbody > tr > td > a');
    const networkNames = await page.evaluate((selector) => {
      const nodes = document.querySelectorAll(selector);
      const links = [...nodes];
      return links.map(link => link.textContent);
    },'#program_directory_table > tbody > tr > td:nth-child(3)');
    console.log("[#] Done Getting Links and Names ");

    for (let i = link_start; i < result.length; i++){
      let compLink = result[i]
      let name = compNames[i]
      await page.waitFor(2000)
      //Filter Network here/////////////
      if(network == "Pepperjam"){
      console.log("[*] Company Name: " + name)
      console.log("[*] Merchant Hub Link: " + compLink);
      fs.appendFile('allCompanies.txt',"\n[*] Company Name: " + name +"\n[*] Merchant Hub Link: " + compLink, function (err) {
        if (err) throw err;

      });
      await page.goto(compLink, {waitUntil: 'networkidle2'});

      const newLink = await page.evaluate((selector1) => {
        let pleaseWork = document.querySelectorAll(selector1);
        const newLinks = [...pleaseWork];
        return newLinks.map(link => link.textContent);
      }, "#page-content > div.row > div > table > tbody > tr > td > a");
      fs.appendFile('allCompanies.txt',"\n[*] Company Link: " + newLink[0] + "\n" , function (err) {
        if (err) throw err;
        console.log('Company added to file, Onto next one!');
      });
      console.log("[*] Company Link: " + newLink[0])

      }
    }
      await page.close();
      await browser.close();
      console.log("------ DONE ------");
    })();
