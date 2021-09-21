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

export default withPageAuthRequired(function Dashboard() {
  const { user, error, isLoading } = useUser();
  const [sortedLinks, setLinks] = useState(null)
  const [userData, setUserdata]= useState(null)
  const [addLink, setAddLink] = useState(false)
  const [showDrawer, setDrawer] = useState(false);
  const [state, dispatch] = useReducer(reducer, "preview" );

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


  useEffect(() => {
    async function fetchLinks(){
      if (user) {
        await fetch(`/api/userdata`)
          .then(res => res.json())
          .then(data => {
            setUserdata(data.user)
            if (data.user) {
              if (data.user.links) {
                setLinks(data.user.links.sort((a, b) => a.rank - b.rank))
              }
            }
          })
      }
    }
    fetchLinks()
  }, [sortedLinks, user])

  return(
    <Layout dispatch={dispatch} showDrawer={showDrawer} setDrawer={setDrawer}>
      <div className={styles.root}>
        <Head>
        {userData?(<title>{userData.displayname}</title>):(<title>User Dashboard</title>)}
        </Head>
      {userData? (
        <>
          <div className={`${showDrawer? (styles.drawer):(styles.hiddenSection)}`}>
            {showDrawer &&(<DashboardDrawer dispatch={dispatch}  />)}
          </div>
          <div className={styles.container}>
            {(userData && state==="preview") && (  <h1 className={styles.title}>{userData.displayname}</h1>)}
            {sortedLinks && (
            <>
              {(state==="edit") &&(<div className={styles.urlBox}>
                <h2 className={styles.urlHeading}>Page URL: &nbsp;</h2> <Link href={`/${userData.slug}`}><a className={styles.urltext}>{` http://cloud-one-link.vercel.app/${userData.slug}`}</a></Link>
              </div>
              )}
              {(state==="edit") &&(
                sortedLinks.map((link) => (
                <React.Fragment key={link._id}>
                  <LinkEditable
                    maxrank={sortedLinks.length}
                    rank={link.rank}
                    url={link.url} text={link.text}/>
                </React.Fragment>
                ))
              )}
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
              {(state==="preview") &&(
                sortedLinks.map((link) => (
                <React.Fragment key={link._id}>
                  <LinkPublicView
                    url={link.url} text={link.text}/>
                </React.Fragment>
                ))
              )}
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
