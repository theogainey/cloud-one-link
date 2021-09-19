import styles from '../styles/componentstyles/linkpublicview.module.css'
import Link from 'next/link'

export default function LinkPublicView({url, text}){
  return (
    <div className={styles.card}>
      <Link href={url}>
        <a >
          <h2>{text}</h2>
        </a>
      </Link>
    </div>
  )
}
