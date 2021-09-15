import styles from './componentstyles/linkstatusbuttons.module.css'

export default function LinkStatusButtons({id, setAddLink, email, addLink, saveEdits}){

  function deleteLink(){
     fetch(`/api/deletelink?email=${email}&linkId=${id}`)
  }

  return(
    <div className={styles.container}>
  {(id || id===0)? (<>
        <button className={styles.iconButton} onClick={()=>saveEdits()}>
          <svg height="30" width="30" >
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/>
          </svg>
        </button>
        <button className={styles.iconButton} onClick={()=>deleteLink()}>
          <svg height="30" width="30" fill={"#FF5733"}>
            <path d="M14.12 10.47L12 12.59l-2.13-2.12-1.41 1.41L10.59 14l-2.12 2.12 1.41 1.41L12 15.41l2.12 2.12 1.41-1.41L13.41 14l2.12-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"/>
          </svg>
        </button>
      </>
      ):(
        <>
        <button className={styles.iconButton} onClick={()=>setAddLink(false)}>
          <svg height="30" width="30" >
            <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/>
          </svg>
        </button>

        <button className={styles.iconButton} onClick={()=>addLink()}>
          <svg height="30" width="30" >
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
        </button>
        </>
      )}
    </div>
  )
}
