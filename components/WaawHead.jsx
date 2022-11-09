import Head from 'next/head';

const WaawHead = () => {
    return (
        <Head>
            <title>{process.env.appTitle}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
            <meta name="description" content={process.env.appDescription} />
            <meta property="og:title" content={process.env.appTitle} />
            <meta property="og:description" content={process.env.appDescription} />
            <meta property="og:url" content={process.env.appUrl} />
            <meta property="og:image" content={process.env.appImage} />
            <meta property="og:type" content="webapp" />
            <meta property="keywords" content={process.env.seoTags} />
            <meta property="robots" content="index,follow" />
            <meta property="copyright" content="webapp" />
            <link rel="icon" href="/favicon.svg" />
        </Head>
    )
}

export default WaawHead;