import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'
import LinkPublicView from '../components/linkpublicview'
import clientPromise from './../lib/mongodb'

export default function LandingPage({data}){
  return(
    <div className={styles.container}>
      <Head>
        <title>{data.displayname}</title>
      </Head>
      <div className={styles.linksSection}>
      <h1>{data.displayname}</h1>
      <SortedLinks links={data.links}/>
      </div>
      <footer className={styles.footer}>
        <div className={styles.copyright}>
          <Link href={`/`} className={styles.footerButton}>
            <a>
              Cloud One-Link Built By Theo Gainey
            </a>
          </Link>
        </div>
        <div className={styles.footerButtonDiv}>
          <Link href={`https://github.com/theogainey/cloud-one-link`} className={styles.footerButton}>
            <a target="_blank" rel="noopener noreferrer">
              <svg height="30" width="30" fill={"grey"} >
                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/>
              </svg>
            </a>
          </Link>
        </div>
      </footer>
    </div>
  )
}

export async function getStaticPaths() {
  const client = await clientPromise
  var paths=[];
  await client.db("cloudlandingpage").collection("users").find({})
    .forEach(doc => {
      if (doc.slug) {
        paths.push({
          params: {
          slug: doc.slug
        }
      })
    }
  });
  return {
    paths,
    fallback: 'blocking'
  }
}

export async function getStaticProps({ params }) {
  const client = await clientPromise
  const user = await client.db("cloudlandingpage").collection("users").findOne({slug: params.slug});
  var links=[]
  user.links.forEach((link, i) => {
    links.push({
      id: i,
      priority: link.rank,
      text: link.text,
      url: link.url
    })
  });

  const data = {
    displayname: user.displayname,
    slug: user.slug,
    links: links
  }

  return {
    props: {
      data,
    },
    revalidate: 10,
  }
}
function SortedLinks({links}){
  const sortedLinks = links.sort((a, b) => a.priority - b.priority);
  return(
    sortedLinks.map((link) => (
      <React.Fragment key={link.id}>
        <LinkPublicView url={link.url} text={link.text}/>
      </React.Fragment>
    ))
  )
}
