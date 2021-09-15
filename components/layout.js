import styles from './componentstyles/layout.module.css'
import { useUser } from '@auth0/nextjs-auth0';
import Link from 'next/link'


export default function Layout({children}){
  const { user, error, isLoading } = useUser();

  return(
    <div className={styles.root}>
      <header className={styles.header}>
      <div className={styles.leftSection}>
        <div className={styles.leftButtonRoot}>
          <svg height="30" width="30">
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
          </svg>
        </div>
      </div>
      <div className={styles.centerSection}>
        <h1 className={styles.title}>
          <a href={"/"}>Cloud One-Link</a>
        </h1>
      </div>
      <div className={styles.rightSection}>
      {user? (
        <a className={styles.rightButtonRoot} href="/api/auth/logout">
          <svg height="30" width="30">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/>
          </svg>
          <p className={styles.buttonText}>Log Out</p>
        </a>
        ):(
        <a className={styles.buttonRoot} href="/api/auth/login">
          <svg height="30" width="30">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM7.07 18.28c.43-.9 3.05-1.78 4.93-1.78s4.51.88 4.93 1.78C15.57 19.36 13.86 20 12 20s-3.57-.64-4.93-1.72zm11.29-1.45c-1.43-1.74-4.9-2.33-6.36-2.33s-4.93.59-6.36 2.33C4.62 15.49 4 13.82 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8c0 1.82-.62 3.49-1.64 4.83zM12 6c-1.94 0-3.5 1.56-3.5 3.5S10.06 13 12 13s3.5-1.56 3.5-3.5S13.94 6 12 6zm0 5c-.83 0-1.5-.67-1.5-1.5S11.17 8 12 8s1.5.67 1.5 1.5S12.83 11 12 11z"/>
          </svg>
          <p className={styles.buttonText}>Log In</p>
        </a>
        )}
        </div>
      </header>
      <main>{children}</main>
      <footer className={styles.footer}>
        <Link href={`/`}>
          <a>Cloud One-Link</a>
        </Link>{" "}
        <Link href={`https://github.com/theogainey`}>
          <a target="_blank"
              rel="noopener noreferrer"
            >
            Built By Theo Gainey
           </a>
        </Link>
      </footer>
    </div>

  );
}
