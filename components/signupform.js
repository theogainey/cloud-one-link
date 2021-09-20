import {useState} from 'react';
import styles from '../styles/componentstyles/signupform.module.css'
import { useRouter } from 'next/router'

export default function SignUp(){
  const router = useRouter()
  const [pageSlug, setSlug] = useState("");
  const [displayname, setName] = useState("");

  async function submitForm(){
    let dn = encodeURI(displayname);
    let ps = encodeURI(pageSlug);
    await fetch(`/api/signup?displayname=${dn}&slug=${ps}`, {
      method: 'POST',})
    router.reload()
  }
  return(
    <div className={styles.root}>
      <div className={styles.form}>
        <h1>Complete Sign up </h1>
        <div className={styles.inputItem}>
          <label htmlFor={"pageurlinput"} className={styles.inputlabel}>Page URL</label>
          <input
            id={"pageurlinput"}
            className={styles.textInput}
            type="text"
            placeholder="Landing Page URL"
            onChange={(e) => setSlug(e.target.value)}
            value={pageSlug}
          />
        </div>
        <div className={styles.inputItem}>
          <label htmlFor={"displayname"} className={styles.inputlabel}>Display Name</label>
          <input
            id={"displayname"}
            className={styles.textInput}
            type="text"
            placeholder="Display Name"
            onChange={(e) => setName(e.target.value)}
            value={displayname}
          />
        </div>
        <div className={styles.inputItem}>
          <button onClick={()=>submitForm()}>Sign Up</button>
        </div>
      </div>
    </div>
  )
}
