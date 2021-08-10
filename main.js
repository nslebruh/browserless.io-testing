const puppeteer = require('puppeteer');
const fs = require('fs');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


async function main(username, password) {
    const browser = await puppeteer.launch({headless: false});

    //const browser = await puppeteer.connect({browserWSEndpoint: 'wss://chrome.browserless.io',headless: true}); 
    // Uncomment to use a remote browser for client side puppeteer

    const page = await browser.newPage();
    await page.goto('https://lilydaleheights-vic.compass.education/Records/User.aspx#learningTasks');
    await page.waitForSelector("#username", timeout=2500);
    await page.type('#username', username, delay=50);
    await page.type('#password', password, delay=50);
    await sleep(1000);
    await page.click('#button1');
    await page.waitForSelector('#ext-gen1729', timeout=2500);
    await sleep(1000);
    await page.evaluate(async () => {
        let dropdown = document.querySelector('#ext-gen1729').childNodes[];
    })
    await page.click("#ext-gen1729");
    const box = page.$(".x-list-plain")[0]; 
    await sleep(1000);
    //await page.click(".x-list-plain")
    //let table = document.getElementById("gridview-1048-body");
    //tasks = [];
    //for(var i = 0; i < table.length; i++) {};

    await browser.close();
}
main("leb0003", "d@ddypig1")