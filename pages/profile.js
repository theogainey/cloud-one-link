import React, {useState, useEffect} from 'react';
import { useUser } from '@auth0/nextjs-auth0';
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Profile.module.css'
import LinkEditable from '../components/linkeditable'
import ThemeSelector from '../components/themeselector'

//thinking render on client side and store data with redis
export default function Profile() {
  const { user, error, isLoading } = useUser();
  const [sortedLinks, setLinks] = useState(null)
  const [addLink, setAddLink] = useState(false)
  const [theme, setTheme] = useState(styles.defaultTheme);
  const [showDrawer, setDrawer] = useState(true);

  function changeTheme(theme){
    switch (theme) {
      case "defaultTheme":
        setTheme(styles.defaultTheme)
        break;
      case "newTheme":
        setTheme(styles.newTheme)
        break;
      default:
        setTheme(styles.defaultTheme);
    }
  }


  // fetch and sort links
  useEffect(() => {
    function sortLinks(a, b) {
      return (a.priority) - (b.priority);
    }
    fetch(`/api/getlinks`)
      .then(res => res.json())
      .then(data => setLinks(data.linkData.links.sort(sortLinks)))
  }, [sortedLinks])

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div className={styles.root}>
      <div className={styles.drawer}>
        {showDrawer &&(<div><p>Test</p> </div>)}
      </div>
      <div className={`${theme} ${styles.container}`}>
        <Head>
        <title>{user.nickname}</title>
        </Head>
        <main className={styles.main}>
          <h1 className={styles.title}>{user.nickname}</h1>
          <ThemeSelector changeTheme={changeTheme}/>
          <div className={styles.grid}>
        {sortedLinks && (sortedLinks.map((link) => (
          <React.Fragment key={link.id}>
            <LinkEditable theme={theme}
            id={link.id}
            priority={link.priority}
            url={link.url} text={link.text}/>
          </React.Fragment>
          )))}
          {addLink? (
            <LinkEditable setAddLink={setAddLink} url={""} text={""}/>
            ):(
            <div className={styles.buttonRoot}>
              <svg height="30" width="30" >
                <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
              </svg>
              <button className={styles.addButton} onClick={()=>setAddLink(true)}><p>Add Link</p></button>
            </div>
          )}
        </div>
        </main>
    </div>
    <div className={styles.drawer}/>
    </div>
    )
  );
}
