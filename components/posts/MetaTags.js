import Head from "next/head"

export default function MetaTags({post}) {
    if (!post || !post.rawContent) return null
    let title = post.rawContent
    if (post.rawContent && post.rawContent.length >= 85) {
        title = post.rawContent.substring(0, 84)
    }
    return (

        <Head>
            <title>{title}</title>
            <link rel="shortcout icon" href="https://plum.club/images/plummy.svg" />
            <meta property="og:title" key="title" content={title}></meta>
            <meta property="og:description" key="description" content="Talk, learn, discuss, crypto web3"></meta>
            <meta property="og:type" key="type" content="website" />
            <meta property="og:image" key='image' content={`https://plum.club/images/plummy.svg`} />
    
            <meta name="twitter:title" key="twitterTitle" content={title} />
            <meta name="twitter:description" key="twitterDescription" content={title} />
            <meta name="twitter:card" key="twitterCard" content="summary_large_image" />
        </Head>
    )
}