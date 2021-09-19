import React, {useState, useEffect, useReducer} from 'react';
import Head from 'next/head'
import { useUser } from '@auth0/nextjs-auth0';
import styles from '../styles/dashboard.module.css'

import Layout from '../components/layout'
import DashboardDrawer from '../components/dashboarddrawer'
import LinkEditable from '../components/linkeditable'
import LinkPublicView from '../components/linkpublicview'
import ThemeSelector from  '../components/themeselector'
import NewLink from '../components/newlink'
export default function Dashboard() {
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
      case "theme":
        state = "theme";
        return state
      case "settings":
        state = "settings";
        return state
      default:
        return state
      }
  }

  //function to fetch data for dashboard
  async function fetchLinks(){
    if (user) {
      await fetch(`/api/userdata`)
        .then(res => res.json())
        .then(data => {
          setUserdata(data.user)
          setLinks(data.user.links.sort((a, b) => a.rank - b.rank))
        })
    }
  }
  //calls fetchlinks after user is loaded
  useEffect(() => {
    fetchLinks()
  }, [user])

  // fetch and sort links, update when changes are made
  useEffect(() => {
    fetchLinks()
  }, [sortedLinks])

  return(
    <Layout dispatch={dispatch} showDrawer={showDrawer} setDrawer={setDrawer}>
    {user && (
      <div className={styles.root}>
        <Head>
        {userData && (<title>{userData.displayname}</title>)}
        </Head>
        <div className={`${showDrawer? (styles.drawer):(styles.hiddenSection)}`}>
          {showDrawer &&(<DashboardDrawer dispatch={dispatch}  />)}
        </div>
        <div className={styles.container}>
          {(userData && state==="preview") && (  <h1 className={styles.title}>{userData.displayname}</h1>)}
            {sortedLinks && (
              <>
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
              {(state==="theme") &&(<ThemeSelector/>)}
        </div>
        <div className={styles.hiddenSection}/>
      </div>
    )}
    </Layout>
  )
}
