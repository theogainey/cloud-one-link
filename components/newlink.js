import {useRef} from 'react';
import styles from '../styles/componentstyles/newlink.module.css'
import {useLinks} from '../lib/linkhandler'

export default function NewLink(){
  const [state, dispatch] = useLinks()
  const textRef = useRef(null);
  const urlRef = useRef(null);

  return (
    <div className={styles.card}>
      <div className={styles.middle}>
        <div>
          <svg height="30" width="30">
            <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
          </svg>
          <input
            ref={textRef}
            className={styles.textInput}
            type="text"
            placeholder="New Link Text"
          />
        </div>
        <div>
          <svg height="30" width="30">
            <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
          </svg>
          <input
            ref={urlRef}
            className={styles.textInput}
            type="text"
            placeholder="New Link URL"
          />
        </div>
      </div>
      <div >
        <div className={styles.right} onClick={()=>{dispatch({type: 'add', payload: {text: textRef.current.value, url: urlRef.current.value}}); urlRef.current.value=null; textRef.current.value=null}}>
          <svg height="30" width="30" >
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/>
          </svg>
        </div>
        <div  onClick={()=>dispatch({type: 'delete'})} >
          <svg height="30" width="30" fill={"red"}>
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
