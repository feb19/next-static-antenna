import Parser from "rss-parser";
const parser = new Parser();
const RSS_URL = `https://feb19.jp/rss.xml`;

export async function fetchRSS() {
  const rss = []
  const r = await fetch(RSS_URL)
    .then(response => response.text())
    .then(str => { 
      const data = parser.parseString(str)
      return data
    })
    .then(data => {
      const items = data.items.sort((a, b) => {
        return new Date(b.isoDate) - new Date(a.isoDate)
      })
      console.log(items)
      rss.push({
        url: RSS_URL,
        title: data.title,
        url: data.link,
        data: data
      })
      return rss
    })
  console.log(rss)
  return rss
}
