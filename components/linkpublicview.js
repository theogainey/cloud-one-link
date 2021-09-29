import styles from '../styles/componentstyles/linkpublicview.module.css'
import Link from 'next/link'

export default function LinkPublicView({pageSlug, linkID, url, text}){
  function sendData(){
    if (linkID && pageSlug) {
      fetch(`/api/analytics?pageSlug=${pageSlug}&linkID=${linkID}`, {method: 'PUT',});
    }
  }
  return (
    <div className={styles.card} onClick={()=>sendData()}>
      <Link href={url}>
        <a>
          <h2>{text}</h2>
        </a>
      </Link>
    </div>
  )
}
