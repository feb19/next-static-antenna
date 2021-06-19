import data from "../../output.json"
import dayjs from "dayjs"
import 'dayjs/locale/ja'

dayjs.locale('ja')

function Antenna({rss}) {
  return <>
    <h3>{rss.title}</h3>
    <ul>{
      rss.data.items.slice(0,4).map((data) => {
        return <div key={data.link}>
          <li><a href={data.link} target="_blank">{data.title} - {dayjs(Date(data.isoDate)).format('YYYY/MM/DD')}</a></li>
        </div>
      })
    }</ul>
  </>
}

function Index({ rss, buildTime }) {
  return <>
    <h1>Designers' Blogs</h1>
    {rss.map((rssData) => {
      console.log(rssData)
      return <div>
        <Antenna key={rssData.url} rss={rssData} />
      </div>
    })}
    <div>fetch at:（{dayjs(Date(buildTime)).format('YYYY/MM/DD HH:mm:ss')}）</div>
  </>
}

export async function getStaticProps() {
  const buildTime = data.buildTime
  const rss = data.rss

  return {
    props: {
      rss,
      buildTime
    },
  }
}

export default Index