const {chromium} = require('playwright-chromium');
const {expect} = require('chai');
const path = require("path");

function getResults(el){
    console.log(el);
}

const mockData = "{\"d953e5fb-a585-4d6b-92d3-ee90697398a0\":{\"author\":\"J.K.Rowling\",\"title\":\"Harry Potter and the Philosopher's Stone\"},\"d953e5fb-a585-4d6b-92d3-ee90697398a1\":{\"author\":\"Rosen Nakov\",\"title\":\"C# Fundamentals\"}}";

describe('Tests', async function () {
    this.timeout(5000);

    let page, browser;

    before(async ()=> {
        browser = await chromium.launch({headless:false, slowMo:500});
        // browser = await chromium.launch({headless:false});
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    })

    afterEach(async () => {
        await page.close();
    })

    it('Loading Books', async () => {
        await page.route('**/jsonstore/**', (route, request) => {
            route.fulfill({
                status: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
                body: mockData
            });
        })

        await page.goto('http://localhost:3000');
        await page.click('text=Load All Books');
        await page.waitForSelector('text= Harry Potter');
        const rows = await page.$$eval('tr', (rows) => rows.map(row => row.textContent.trim()));
        expect(rows[1]).to.contain('Potter');
        expect(rows[2]).to.contain('Rosen');
    });
    it('Can create book', async () => {
        await page.goto('http://localhost:3000');
        await page.fill('form#createForm >> input[name="title"]', 'Nope' );
        await page.fill('form#createForm >> input[name="author"]', 'Nope again' );
        // await page.waitForTimeout(60000);
        const [request] = await Promise.all([
         page.waitForRequest(request => request.method() === 'POST'),
         page.click('form#createForm >> text=Submit')
        ]);
        const data = JSON.parse(request.postData());
        expect(data.title).to.equal('Nope');
        expect(data.author).to.equal('Nope again')

    })
    it('Empty fields not allowed', async () => {
        await page.goto('http://localhost:3000');
        await page.fill('form#createForm >> input[name="title"]', 'Rosen' );
        await page.click('form#createForm >> text=Submit');
        await page.fill('form#createForm >> input[name="author"]', 'Toshkov' );

        await page.waitForTimeout('500');
        let [title, author] = await page.$$eval('form#createForm >> input', e => e.map((value) => value.value));
        expect(title).to.be.equal('Rosen');
        expect(author).to.be.equal('Toshkov');
    })

});