import {useRef} from 'react'
import styles from '../styles/componentstyles/linkeditable.module.css'
import useSWR from "swr"
import {useLinks} from '../lib/linkhandler'

export default function LinkEditable({linkID, url, text, rank, maxrank}){
  const { data, dataerror } = useSWR(`/api/userdata?linkID=${linkID}`);
  const textRef = useRef(null);
  const urlRef = useRef(null);
  const [state, dispatch] = useLinks()

  return (
    <div className={styles.card} >
      <div className={styles.left}>
        <div onClick={()=>dispatch({type: 'rankDOWN', payload: {rank:rank} })}>
          <svg height="30" width="30">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
        </div>
        <div onClick={()=>dispatch({type: 'rankUP', payload: {rank:rank, maxrank: maxrank} })}>
          <svg height="30" width="30">
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
          </svg>
        </div>
      </div>
      <div className={styles.middle}>
        {data &&(<p>{`Link Clicks: ${data.linkclicks}`}</p>)}
        <input
          ref={textRef}
          className={styles.textInput}
          type="text"
          placeholder={text}
        />
        <input
          ref={urlRef}
          className={styles.textInput}
          type="text"
          placeholder={url}
        />
      </div>
      <div className={styles.right} onClick={()=>dispatch({type: 'save', payload: {text: textRef.current.value, url: urlRef.current.value, rank: rank}})}>
        <div>
          <svg height="30" width="30" >
            <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm2 16H5V5h11.17L19 7.83V19zm-7-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zM6 6h9v4H6z"/>
          </svg>
        </div>
        <div onClick={()=>dispatch({type: 'delete', payload: {rank:rank} })}>
          <svg height="30" width="30" fill={"red"}>
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"/>
          </svg>
        </div>
      </div>
    </div>
  )
}
