import styles from '../styles/componentstyles/dashboarddrawer.module.css'
import {useLinks} from '../lib/linkhandler'


export default function DashboardDrawer() {

  const [state, dispatch] = useLinks();

  return(
    <div className={styles.root}>
      <button className={styles.buttonRoot}  onClick={()=>dispatch({type:'preview'})}>
        <svg height="30" width="30">
          <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z"/>
        </svg>
        <p className={styles.buttonText}>Preview</p>
      </button>
      <button className={styles.buttonRoot} onClick={()=>dispatch({type:'edit'})}>
        <svg height="30" width="30">
          <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
        </svg>
        <p className={styles.buttonText}>Edit Links</p>
      </button>
    </div>
  )
}
