import styles from './componentstyles/linkeditable.module.css'
import Link from 'next/link'
import LinkPriority from './linkpriority'
import LinkStatusButtons from './linkstatusbuttons'
import {useState} from 'react';
import { useUser } from '@auth0/nextjs-auth0';

export default function LinkEditable({url,  setAddLink, id, text, priority}){
  const { user, isLoading } = useUser();
  const [linkText, setLinkText] = useState(text);
  const [linkUrl, setLinkUrl] = useState(url);

  function addLink(){
    fetch(`/api/newlink?email=${user.email}&text=${linkText}&url=${linkUrl}`)
    setLinkText("")
    setLinkUrl("")
    setAddLink(false)
  }
  function saveEdits(){
    fetch(`/api/editlink?email=${user.email}&linkId=${id}&text=${linkText}&url=${linkUrl}`)

  }
  return (
    <>
      {user && (
        <div className={styles.cardEdit} >
          <div className={styles.cardLeft}>
          {(id || id===0) &&(<LinkPriority email={user.email} id={id} priority={priority}/>)}
          </div>
          <div className={styles.cardEditSection}>
            <input
              className={styles.textInput}
              type="text"
              placeholder="Link Text"
              onChange={(e) => setLinkText(e.target.value)}
              value={linkText}
              />
            <input
              className={styles.textInput}
              type="text"
              placeholder="Link URL"
              onChange={(e) => setLinkUrl(e.target.value)}
              value={linkUrl}
            />
          </div>
          <div className={styles.cardRight}>
            {(id || id===0)? (<LinkStatusButtons saveEdits={saveEdits} email={user.email} id={id}/>
              ):(
              <LinkStatusButtons setAddLink={setAddLink} addLink={addLink} email={user.email} />
            )}
          </div>
        </div>
      )}
    </>
  )
}
