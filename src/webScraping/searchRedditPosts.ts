import puppeteer from "puppeteer";


const searchRedditPosts = async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });

  try {
    const page = await browser.newPage();

    await page.setUserAgent({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
      platform: "Windows",
    });

    await page.goto("https://www.reddit.com/r/technology/", {
      waitUntil: "networkidle2",
      timeout: 60000,
    });

    const posts = await page.evaluate(() => {
      const cards = document.querySelectorAll("shreddit-post");

      return Array.from(cards).map((card) => ({
        title: card.getAttribute("post-title"),
        url: card.getAttribute("content-href"),
      }));
    });

    return posts;
  } finally {
    await browser.close();
  }
};

export default searchRedditPosts;