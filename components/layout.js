import styles from '../styles/componentstyles/layout.module.css'
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link'


export default function Layout({children, home,showDrawer, setDrawer}){
  const { user, error, isLoading } = useUser();

  return(
    <div className={styles.root}>
      <header className={styles.header}>
      <div className={styles.leftSection}>
        {setDrawer &&(<div className={styles.leftButtonRoot} onClick={()=>setDrawer(!showDrawer)}>
          <svg height="30" width="30" fill={"white"}>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </div>)}
      </div>
      <div className={styles.centerSection}>
        <h1 className={styles.title}>
          <a href={"/"}>Cloud One-Link</a>
        </h1>
      </div>
      <div className={styles.rightSection}>
      {user? (
        <a className={styles.rightButtonRoot} href="/api/auth/logout" fill={"white"} >
          Log Out
        </a>
        ):(
        <a className={styles.rightButtonRoot} href="/api/auth/login">
        Log In
        </a>
        )}
        </div>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <div className={styles.copyright}>
          <a>
            Built By Theo Gainey
            </a>
        </div>
        <div className={styles.footerButtonDiv}>
          <Link href={`https://github.com/theogainey`} className={styles.footerButton}>
            <a target="_blank" rel="noopener noreferrer">
              <svg height="30" width="30" fill={"grey"} >
                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"/>
              </svg>
            </a>
          </Link>
        </div>
      </footer>
    </div>

  );
}
