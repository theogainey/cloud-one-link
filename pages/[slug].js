import React from 'react';
import {getLinkData} from './../lib/datalib'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import LinkPublicView from '../components/linkpublicview'
export default function LandingPage({data:{linkData}}){
  return(
    <div className={styles.container}>
    <Head>
      <title>{linkData.displayname}</title>
    </Head>
    <main className={styles.main}>

    <h1>{linkData.displayname}</h1>
    <div className={styles.grid}>
  {linkData.links.map((link) => (
    <React.Fragment key={link.id}>
      <LinkPublicView url={link.url} text={link.text}/>
    </React.Fragment>
    ))}
  </div>
  </main>
  </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:5000/api/allpaths')
  const pathData = await res.json();
  const paths = pathData.allpagepaths;
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const data = await getLinkData(params.slug);

  return {
    props: {
      data,
    }
  }
}
