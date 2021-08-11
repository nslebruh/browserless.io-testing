const puppeteer = require('puppeteer');
//const fs = require('fs');

async function main(username, password) {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  //const browser = await puppeteer.launch({headless: false});
  const browser = await puppeteer.connect({browserWSEndpoint: 'wss://chrome.browserless.io',headless: true}); 
  // Uncomment to use a remote browser for client side puppeteer
  const page = await browser.newPage();
  await page.goto('https://lilydaleheights-vic.compass.education/Records/User.aspx#learningTasks');
  await page.waitForSelector("#username", timeout=1000);
  await page.type('#username', username, delay=50);
  await page.type('#password', password, delay=50);
  await sleep(1000);
  await page.click('#button1');
  await page.waitForSelector('#gridview-1048-body', timeout=1000);
  await sleep(1000);
  tasks = await page.evaluate(async () => {
      function sleep(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
        }
      document.querySelector("#ext-gen1728").click();
      document.querySelector("li.x-boundlist-item:nth-child(7)").click();
      await sleep(2000);
      table = document.querySelector("#gridview-1048-body");
        tasks = [];
        for (i = 0; i < table.childNodes.length; i++) {
          row = table.childNodes[i];
          tasks.push({
            code: row.childNodes[0].childNodes[0].innerText,
            name: row.childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerText,
            date: row.childNodes[2].childNodes[0].childNodes[0].childNodes[1].innerText,
            status: row.childNodes[2].childNodes[0].childNodes[2].childNodes[1].innerText,
          });
        }
        return (tasks);
      });
  await browser.close();
  console.log(JSON.stringify(tasks));
  //fs.writeFileSync("tasks.json", JSON.stringify(tasks));
}
main("leb0003", "d@ddypig1")