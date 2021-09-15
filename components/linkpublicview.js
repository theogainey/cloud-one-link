import styles from './componentstyles/linkpublicview.module.css'
import Link from 'next/link'

export default function LinkPublicView({url, text}){
  return (
    <>
      <Link href={url}>
        <a className={styles.card}>
          <h2>{text}</h2>
        </a>
      </Link>
    </>
  )
}
