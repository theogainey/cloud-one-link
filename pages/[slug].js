import React from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LinkPublicView from '../components/linkpublicview'
import clientPromise from './../lib/mongodb'

export default function LandingPage({data}){
  return(
    <div className={styles.container}>
      <Head>
        <title>{data.displayname}</title>
      </Head>
      <h1>{data.displayname}</h1>
      {data.links.map((link) => (
        <React.Fragment key={link.id}>
          <LinkPublicView url={link.url} text={link.text}/>
        </React.Fragment>
      ))}
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
    email: user.email,
    displayname: user.displayname,
    slug: user.slug,
    them: user.theme,
    links: links
  }

  return {
    props: {
      data,
    },
    revalidate: 10,
  }
}
