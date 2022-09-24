const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
const qrcode = require('qrcode-terminal')
const jsQR = require("jsqr")
const { get } = require('@andreekeberg/imagedata')
const cliSpinners = require('cli-spinners')
const rdl = require('readline')
const process = require('process')
const { clearInterval } = require('timers')
const prompt = require('prompt')

puppeteer.use(StealthPlugin());

const colors = {
    style: {
        reset: "\x1b[0m",
        bright: "\x1b[1m",
        dim: "\x1b[2m",
        underscore: "\x1b[4m",
        blink: "\x1b[5m",
        reverse: "\x1b[7m",
        hidden: "\x1b[8m"
    },
    foreground: {
        black: "\x1b[30m",
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m"
    },
    background: {
        black: "\x1b[40m",
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m",
        magenta: "\x1b[45m",
        cyan: "\x1b[46m",
        white: "\x1b[47m"
    },
}

const spinners = {
    spinner: cliSpinners.bouncingBar.frames,
    index: 0,
    current: null
}

const strWrap = (
    string,
    foreground = colors.foreground.white,
    background = colors.background.black,
    style = colors.style.reset
) => console.log(`${style}${foreground}${background}${string}${colors.style.reset}`)

const stopSpinner = () => clearInterval(spinners.current)

const startSpinner = () => {
    currentSpinner = setInterval(() => {
        let line = spinners.spinner[spinners.index];
        if (line == undefined) {
            spinners.index = 0;
            line = spinners.spinner[spinners.index];
        }
        rdl.cursorTo(process.stdout, 0, 12);
        process.stdout.write(`  ${colors.foreground.red + colors.background.black + line} Running  ${line + colors.style.reset}`);
        spinners.index = spinners.index >= spinners.spinner.length ? 0 : spinners.index + 1;
    }, 100);
}


(async () => {
    prompt.message = "";
    prompt.delimiter = "";

    let response = await prompt.get({
        properties: {
            username: {
                description: `\n\n  ${colors.background.black + colors.foreground.red
                    }Enter Link To Discord DM:${colors.style.reset}`
            }
        }
    });
    response = response.replace(/\s|\n/g, '');

    console.clear()

    const browser = await puppeteer.launch({
        headless: true,
        args: [`--window-size=1920,1080`],
        defaultViewport: {
            width: 1920,
            height: 1080
        }
    })

    strWrap(
        "  Launching new page and navigating to Discord...",
        colors.foreground.red
    )

    const page = await browser.newPage()
    await page.goto(response)

    strWrap(
        "  Waiting for page load...",
        colors.foreground.red
    )

    await page.waitForFunction("document.querySelector('canvas')")
    await page.screenshot({ path: 'qrCode.png', fullPage: true })

    get('qrCode.png', async (error, data) => {
        strWrap(
            "\n  Scan QR code in Discord app to log in:\n",
            colors.foreground.black,
            colors.background.red
        )
        qrcode.generate((await jsQR(data.data, data.width, data.height, "attemptBoth")).data, { small: true })
    })

    await page.waitForSelector('.form-3gdLxP', { timeout: 60000 })

    console.clear()

    setTimeout(() => strWrap(
        "\n\n  \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2557   \u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2588\u2588\u2588\u2588\u2557  \r\n  \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2551 \u2588\u2588\u2554\u2550\u2550\u2550\u2550\u255D \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557\r\n  \u2588\u2588\u2551  \u2588\u2588\u2551 \u2588\u2588\u2551 \u255A\u2588\u2588\u2588\u2588\u2588\u2557  \u2588\u2588\u2551  \u255A\u2550\u255D \u2588\u2588\u2551  \u2588\u2588\u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551  \u2588\u2588\u2551\r\n  \u2588\u2588\u2551  \u2588\u2588\u2551 \u2588\u2588\u2551  \u255A\u2550\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2551  \u2588\u2588\u2557 \u2588\u2588\u2551  \u2588\u2588\u2551 \u2588\u2588\u2554\u2550\u2550\u2588\u2588\u2557 \u2588\u2588\u2551  \u2588\u2588\u2551\r\n  \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u255A\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u255A\u2588\u2588\u2588\u2588\u2588\u2554\u255D \u2588\u2588\u2551  \u2588\u2588\u2551 \u2588\u2588\u2588\u2588\u2588\u2588\u2554\u255D\r\n  \u255A\u2550\u2550\u2550\u2550\u2550\u255D  \u255A\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u255D   \u255A\u2550\u2550\u2550\u2550\u255D   \u255A\u2550\u2550\u2550\u2550\u255D  \u255A\u2550\u255D  \u255A\u2550\u255D \u255A\u2550\u2550\u2550\u2550\u2550\u255D  ",
        colors.foreground.red
    ), 500)

    setTimeout(() => strWrap(
        "  Build version: 2.0.0",
        colors.foreground.red
    ), 800)

    setTimeout(() => strWrap(
        "  Logged in...",
        colors.foreground.red
    ), 1200)

    await page.click('.scrollableContainer-15eg7h')

    setTimeout(() => strWrap(
        "  Starting typing...",
        colors.foreground.red
    ), 1400)

    await sleep(1600)

    startSpinner()

    await page.keyboard.type(`from:${"Loan"}`, { delay: 400 })
    await page.keyboard.press('\n', { delay: 100 })
    await page.click('[class="item-3XjbnG themed-2-lozF"]')
    
    await page.click('.container-rZM65Y',{ delay: 100, button: 'right'})
    await page.keyboard.press('ArrowDown', { delay: 100 })
    await page.keyboard.press('ArrowDown', { delay: 100 })
    await page.keyboard.press('ArrowDown', { delay: 100 })
    await page.keyboard.press('ArrowDown', { delay: 100 })
    await page.keyboard.press('\n', { delay: 100 })
    await page.keyboard.press('\n', { delay: 100 })
})()