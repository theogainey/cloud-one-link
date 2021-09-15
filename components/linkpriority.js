import styles from './componentstyles/linkpriority.module.css'
import {useState} from 'react';

export default function LinkPriority({ priority}){

  function setPriorityRank(){
  }
  return(
    <div className={styles.container}>
      <button className={styles.iconButton} onClick={()=>setPriorityRank(priority-1)}>
        <svg height="30" width="30">
          <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
      </button>
      <button className={styles.iconButton} onClick={()=>setPriorityRank(priority+1)}>
        <svg height="30" width="30">
          <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
        </svg>
      </button>
    </div>
  )
}
