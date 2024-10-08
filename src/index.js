import puppeteer from "puppeteer";

const getOtakudesu = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const url = "https://otakudesu.cloud/";

  await page.goto(url, {
    waitUntil: "domcontentloaded",
  });

  const otaku = await page.evaluate(() => {
    const utama = document.querySelector(".venutama");
    if (!utama) return [];

    const series = utama.querySelectorAll(".rseries");
    const data = [];

    for (const seri of series) {
      const rapi = seri.querySelector(".rapi");
      const konten = rapi.querySelector(".venz");
      const listItems = konten.querySelectorAll("li");

      for (const li of listItems) {
        const detpost = li.querySelector(".detpost");
        const thumb = detpost.querySelector(".thumb");
        const thumbz = thumb.querySelector(".thumbz");

        const jdlflm = thumbz.querySelector("h2").innerText;
        const img = thumbz.querySelector("img").src;
        data.push({ jdlflm, img });
      }
    }

    return data;
  });

  console.log(otaku);
  await browser.close();
};

const getOtakudesuSearch = async (searchQuery) => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  const searchURL = `https://otakudesu.cloud/?s=${encodeURIComponent(searchQuery)}&post_type=anime`;

  await page.goto(searchURL, {
    waitUntil: "domcontentloaded",
  });

  const otaku = await page.evaluate(() => {
    const pages = document.querySelectorAll(".page");
    const data = [];

    for (const page of pages) {
      const chiv = page.querySelector(".chivsrc");
      const listItems = chiv.querySelectorAll("li");

      for (const li of listItems) {
        const imgSearch = li.querySelector("img").src;
        const jdlSearch = li.querySelector("h2");
        const jdl = li.querySelector("h2").innerText;
        const link = jdlSearch.querySelector("a").href;
        
        const set = li.querySelector(".set");
        
        const allATags = set.querySelectorAll("a");
        const genre = Array.from(allATags).map(tag => tag.innerText).join(", ");

        data.push({ jdl, imgSearch, link, genre });
      }
    }

    return data;
  });

  console.log(otaku);
  await browser.close();
};

// getOtakudesu();
getOtakudesuSearch("Maou");
