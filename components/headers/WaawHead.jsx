import Head from 'next/head';

/**
 * Create header for Html contatining title and all meta values
 * @param {*} title If custom Title is needed for the page
 * @param {*} description If custom Description is needed for the page
 * @param {*} meta If custom meta is needed for the page
 */
const WaawHead = ({ title, description, meta }) => {
    const headerInfo = process.env.header;
    return (
        <Head>
            <title>{`WaaW | ${title ? title : headerInfo.title}`}</title>
            <meta name="description" content={description ? description : headerInfo.description} />
            <meta name="og:description" content={description ? description : headerInfo.description} />
            <meta name="og:title" content={`WaaW | ${title ? title : headerInfo.title}`} />
            {
                Object.entries(headerInfo.meta).map((metaInfo, key) => {
                    let name = metaInfo[0];
                    let content = metaInfo[1];
                    if (name === 'openGraph') {
                        return Object.entries(content).map((ogMeta, key1) => {
                            return <meta key={"og".concat(key1)} name={'og:'.concat(ogMeta[0])} content={meta &&
                                meta.openGraph && meta.openGraph[ogMeta[0]] ? meta.openGraph[ogMeta[0]] : ogMeta[1]} />
                        })
                    }
                    return <meta key={key} name={name} content={meta && meta[name] ? 
                        meta[name] : content} />
                })
            }
            {
                !title && <>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                    <link rel="icon" href="/images/favicon.svg" />
                </>
            }
        </Head>
    )
}

export default WaawHead;