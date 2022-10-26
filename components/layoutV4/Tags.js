import Head from 'next/head'

const noOverlayWorkaroundScript = `
  window.addEventListener('error', event => {
    event.stopImmediatePropagation()
  })

window.addEventListener('unhandledrejection', event => {
    event.stopImmediatePropagation()
  })
`


export default function _Tags({title, description}) {
  let tags = {
    title: "Starter App",
    description: "Very Interesting stuff you have here",
  }
  return (
    <>
      <Head>
        <title>{title || tags.title}</title>
        <link rel="shortcout icon" href="/images/favicon.ico" />
        <meta property="og:title" key="title" content={title || tags.title}></meta>
        <meta property="og:description" key="description" content={description || tags.description}></meta>
        <meta property="og:image" key="image" content={tags.image}></meta>
        <meta property="og:type" key="type" content="website"></meta>
        <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.36/dist/web3.min.js" integrity="sha256-nWBTbvxhJgjslRyuAKJHK+XcZPlCnmIAAMixz6EefVk=" crossOrigin="anonymous"/>
        {/* <script src="https://cdn.jsdelivr.net/npm/@toruslabs/torus-embed"/> */}
        <script dangerouslySetInnerHTML={{ __html: noOverlayWorkaroundScript }} />
      </Head>
    </>
  )
}
