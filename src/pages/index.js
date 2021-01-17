import { fetchRSS } from "../libs/fetch"

function Index({ res, build_time }) {
  return <>
      <div>Build at:（{build_time}）</div>
      <div>{res[0].title}</div>
      <div>{
        res[0].data.items.map((data) => {
          return <div key={data.link}>
            <h3><a href={data.link}>{data.title}</a></h3>
            </div>
        })
      }</div>
    </>
  
}

export async function getStaticProps() {
  const res = await fetchRSS()
  const build_time = new Date().toString();

  return {
    props: {
      res,
      build_time
    },
  }
}

export default Index