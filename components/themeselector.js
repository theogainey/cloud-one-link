import {useState} from 'react';
import styles from './componentstyles/themeselector.module.css'
const themes = [
  {
    "id": 0,
    "name": "defaultTheme",
    "primary": "#ffffff",
    "secondary": "#ffffff",
    "textprimary": "black",
    "textsecondary": "black"
  },
  {
    "id": 1,
    "name": "newTheme",
    "primary": "#3f51b5",
    "secondary": "#f50057",
    "textprimary": "white",
    "textsecondary": "black"
  }
];
export default function ThemeSelector({changeTheme}){
  return(
    <div className={styles.container}>
      {themes.map((theme) => (
          <button className={styles.themeBox} onClick={()=>changeTheme(theme.name)} key={theme.id}>
            <p>{theme.name}</p>
            <div style={{ backgroundColor: theme.primary, height: '2rem' }}>
              <p style={{ color: theme.textprimary}}> {theme.primary}</p>
            </div>
            <div style={{ backgroundColor: theme.secondary, height: '2rem' }}>
              <p style={{ color: theme.textsecondary}}> {theme.secondary}</p>
            </div>
          </button>
        )
      )}
    </div>
  )
}
