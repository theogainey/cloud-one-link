import {useState, useReducer} from 'react';
import Head from 'next/head'
import Link from 'next/link'
import {useUser, withPageAuthRequired} from '@auth0/nextjs-auth0';
import styles from '../styles/dashboard.module.css'
import Layout from '../components/layout'
import DashboardDrawer from '../components/dashboarddrawer'
import LinkEditable from '../components/linkeditable'
import NewLink from '../components/newlink'
import SignUp from '../components/signupform'
import useSWR from "swr";
import {useLinks, LinkProvider} from '../lib/linkhandler'

export default withPageAuthRequired(function Dashboard() {
  const {isLoading } = useUser();
  const [showDrawer, setDrawer] = useState(false);
  const { data, dataerror } = useSWR('/api/userdata');

  return(
    <Layout showDrawer={showDrawer} setDrawer={setDrawer}>
      <div className={styles.root}>
        <Head>
        {data?(<title>{data.user.displayname}</title>):(<title>User Dashboard</title>)}
        </Head>
        {data? (
          <LinkProvider initState={{display: 'preview', showNew:'false'}}>
            <div className={`${showDrawer? (styles.drawer):(styles.hiddenSection)}`}>
              {showDrawer &&(<DashboardDrawer />)}
            </div>
            <DashboardData  data={data}/>
            <div className={styles.hiddenSection}/>
          </LinkProvider>
        ):(
        <>
          {!isLoading &&(<SignUp/>)}
        </>
      )}
      </div>
    </Layout>
  )
})

function DashboardData({data}){
  const [state, dispatch] = useLinks()
  const sortedLinks = data.user.links.sort((a, b) => a.rank - b.rank);
  return(
    <div className={styles.container}>
    {(data && state.display==='preview') && (  <h1 className={styles.title}>{data.user.displayname}</h1>)}
    {data.user.links && (
      <>
      {(state.display==='edit') &&(
        <>
          <div className={styles.urlBox}>
            <h2 className={styles.urlHeading}>Page URL: &nbsp;</h2> <Link href={`/${data.user.slug}`}><a className={styles.urltext}>{` http://cloud-one-link.vercel.app/${data.user.slug}`}</a></Link>
          </div>
          <p className={styles.pageviews}>{`Page Views: ${data.user.views}`}</p>
        </>
      )}
      {(sortedLinks.map((link) => (
          <LinkEditable key={link._id} maxrank={sortedLinks.length} {...link}/>
      )))}
        <NewLink />
      </>
    )}
    </div>
  )
}
