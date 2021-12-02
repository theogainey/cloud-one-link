import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import Link from 'next/link'

export default function Home() {

  return (
    <Layout >
    <div className={styles.container}>
      <Head>
        <meta property="og:title" content="Cloud One-Link" />
        <meta property="og:description" content="Web app that allows users to create and deploy a web page that organizes many links onto one page"/>
        <title>Cloud One-Link</title>
        <meta name="description" content="Created By Theo Gainey" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

        <div className={styles.headingSection}>
          <div className={styles.surface}>
            <p className={styles.description}>Simplify your social media presence by organizing all your relevant links into one mobile optimized landing page. Sign up today and create your own personalized landing page in minutes.</p>
          </div>
        </div>
        <div className={styles.buttonRow}>
          <Link href={"/api/auth/login"} >
            <a className={styles.ctaButton}>Sign Up!</a>
          </Link>
          <Link href={"/dashboard"} >
            <a className={styles.ctaButton}>User Dashboard</a>
          </Link>
        </div>

        <div className={styles.aboutSection}>
        <h2 >How It Works!</h2>
        <div className={styles.surface}>
          <p className={styles.aboutText}>First sign up by hitting the <Link href={"/api/auth/login"}><a className={styles.link}>login button</a></Link> and begin the sign-up process. After the completing the first part of the sign-up process you will be redirected back to this page. Next you need to head to the <Link href={"/dashboard"}><a className={styles.link}>user dashboard</a></Link> where you will be prompted to provide a page URL and display name. The URL you provide should be a short word or phrase (no spaces) that will be added to the end of the URL cloud-one-link.vercel.app/ and then will become the URL of the page with your links that can be shared with the public. Additionally, your display name will be the name that visitors will see at the top of your page. See <Link href={"/theoslinks"}><a className={styles.link}>https:// cloud-one-link.vercel.app/theoslinks</a></Link> for an example. After providing a page URL and display name you can finally proceed to the user dashboard where you can add, edit and delete links from your page. <a className={styles.important}>IMPORTANT!</a> Because your public page with your links is a statically generated web page, the changes you make will not be instantly seen on your public page. Instead, after you make and save a change the page will need to be revalidated before changes will be seen. The good news is you don’t have to do anything to make this happen. The next time someone visits your page the changes will not be instantly seen, but the revalidation process will start and any subsequent visit to that page after 10seconds from that initial visit will see those changes. </p>
        </div>

          <h2 >About</h2>
          <div className={styles.surface}>
            <p className={styles.aboutText}>Theo Gainey built this project to demonstrate some of his skills as a developer. As time goes on more features will be added to future demonstrate new skills and new understandings of different technologies. Please check out his <Link href={"https://github.com/theogainey/cloud-one-link"}><a target="_blank" rel="noopener noreferrer"  className={styles.link}>GitHub page</a></Link> for more!   </p>
          </div >
        </div>

    </div>
    </Layout>
  )
}
