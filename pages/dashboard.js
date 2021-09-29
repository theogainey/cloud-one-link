import React, {useState, useEffect, useReducer} from 'react';
import Head from 'next/head'
import Link from 'next/link'
import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0';
import styles from '../styles/dashboard.module.css'
import Layout from '../components/layout'
import DashboardDrawer from '../components/dashboarddrawer'
import LinkEditable from '../components/linkeditable'
import LinkPublicView from '../components/linkpublicview'
import NewLink from '../components/newlink'
import SignUp from '../components/signupform'
import useSWR from "swr";

export default withPageAuthRequired(function Dashboard() {
  const { user, error, isLoading } = useUser();
  const [addLink, setAddLink] = useState(false)
  const [showDrawer, setDrawer] = useState(false);
  const [state, dispatch] = useReducer(reducer, "preview" );
  const { data, dataerror } = useSWR('/api/userdata');

  //reducer controlls changes to the dashboard view
  function reducer(state, action) {
    switch (action.type) {
      case "preview":
        state = "preview";
        return state
      case "edit":
        state = "edit";
        return state
      default:
        return state
      }
  }

  return(
    <Layout dispatch={dispatch} showDrawer={showDrawer} setDrawer={setDrawer}>
      <div className={styles.root}>
        <Head>
        {data?(<title>{data.user.displayname}</title>):(<title>User Dashboard</title>)}
        </Head>
      {data? (
        <>
          <div className={`${showDrawer? (styles.drawer):(styles.hiddenSection)}`}>
            {showDrawer &&(<DashboardDrawer dispatch={dispatch}  />)}
          </div>
          <div className={styles.container}>
            {(data.user && state==="preview") && (  <h1 className={styles.title}>{data.user.displayname}</h1>)}
            {data.user.links && (
            <>
              {(state==="edit") &&(<div className={styles.urlBox}>
                <h2 className={styles.urlHeading}>Page URL: &nbsp;</h2> <Link href={`/${data.user.slug}`}><a className={styles.urltext}>{` http://cloud-one-link.vercel.app/${data.user.slug}`}</a></Link>
                <p className={styles.pageviews}>{`page views: ${data.views}`}</p>
              </div>
              )}
              {(state==="edit") &&(<EditableLinksSorted links={data.user.links}/>)}
              {(state==="edit") &&(
                <>
                {(addLink? (
                  <NewLink setAddLink={setAddLink} />
                  ):(
                  <button onClick={()=>setAddLink(true)} className={styles.addButton}>Add Link</button>
                  )
                )}
                </>
              )}
              {(state==="preview") &&(<PreviewLinksSorted links={data.user.links}/>)}
              </>
              )}
          </div>
          <div className={styles.hiddenSection}/>
        </>
      ):(
        <>
          {!isLoading &&(<SignUp/>)}
        </>
      )}
      </div>
    </Layout>
  )
})

function EditableLinksSorted({links}){
  const sortedLinks = links.sort((a, b) => a.rank - b.rank);
  return(
    sortedLinks.map((link) => (
      <React.Fragment key={link._id}>
        <LinkEditable
          linkID={link._id}
          maxrank={sortedLinks.length}
          rank={link.rank}
          url={link.url} text={link.text}/>
      </React.Fragment>
    ))
  )
}

function PreviewLinksSorted({links}){
  const sortedLinks = links.sort((a, b) => a.rank - b.rank);
  return(
    sortedLinks.map((link) => (
      <React.Fragment key={link._id}>
        <LinkPublicView
          url={link.url} text={link.text}/>
      </React.Fragment>
    ))
  )
}
