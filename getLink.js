
const puppeteer = require('puppeteer');
const fs = require('fs');

let scrape = async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.goto('http://www.jdoqocy.com/click-1245-12441986?SID=TrackingTest ');

    // await page.click('#default > div > div > div > div > section > div:nth-child(2) > ol > li:nth-child(1) > article > div.image_container > a > img');
    await page.waitFor(2000);
    const link = page.url()

    // const result = await page.evaluate(() => {
    //      let link page.url()
    //     // let price = document.querySelector('.price_color').innerText;
    //
    //     return {
    //         link
    //     }
    //
    // });
    //
    browser.close();
    console.log(link)
    fs.writeFile('mynewfile3.txt', link, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

};

scrape().then((value) => {
    //console.log(value); // Success!
});
