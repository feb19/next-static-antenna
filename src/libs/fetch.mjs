import Parser from "rss-parser";
import fetch from "node-fetch";
const parser = new Parser();
const DATA_JSON = `../../data.json`
import fs from 'fs';


const getFeed = async (rssData) => {
  const feed = await fetch(rssData.url)
    .then(response => response.text())
    .then(str => { 
      const data = parser.parseString(str)
      return data
    })
    .then(data => {
      data.items.sort((a, b) => {
        return new Date(b.isoDate) - new Date(a.isoDate)
      })
      return {
        url: rssData.url,
        title: data.title,
        url: data.link,
        data: data
      }
    })
  return feed
}

const fetchRSSs = async (json) => {
  const rss = []
  for (let i = 0; i < json.length; i++) {
    const feed = await getFeed(json[i])
    rss.push(feed)
  }
  return rss
}

export async function fetchRSS() {
  const content = fs.readFileSync('./data.json', 'utf8')
  const json = JSON.parse(content)
  const rss = await fetchRSSs(json)

  const buildTime = new Date().toString()
  const result = {
    rss: rss,
    buildTime: buildTime
  }
  fs.writeFileSync('./output.json', JSON.stringify(result))
  return rss
}

fetchRSS()