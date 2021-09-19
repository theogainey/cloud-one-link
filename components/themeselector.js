import {useState} from 'react';
import styles from '../styles/componentstyles/themeselector.module.css'
const themes = [
  {
    "id": 0,
    "themeclass": "default",
    "name": "Default",
    "primary": "#ffffff",
    "secondary": "#ffffff",
    "background": "#ffffff",
    "textprimary": "black",
    "textsecondary": "black"
  },
  {
    "id": 1,
    "themeclass": "magGold",
    "name": "Magenta Goldenrod",
    "primary": "#cf1578",
    "secondary": "#039fbe",
    "background": "#e8d21d",
    "textprimary": "white",
    "textsecondary": "white"
  },
  {
    "id": 2,
    "themeclass": "redSeaFoam",
    "name": "Red, Sea Foam",
    "primary": "#d72631",
    "secondary": "#5c3c92",
    "background": "#a2d5c6",
    "textprimary": "white",
    "textsecondary": "white"
  }
];
export default function ThemeSelector({changeTheme}){
  return(
    <div className={styles.container}>
      {themes.map((theme) => (
          <button className={styles.themeBox} key={theme.id} style={{ backgroundColor: theme.background}}>
            <h3 className={styles.themeHeading}>{theme.name}</h3>
            <div className={styles.colorPreview} style={{ backgroundColor: theme.primary, height: '2rem' }}>
              <p className={styles.colorText} style={{ color: theme.textprimary}}> {theme.primary}</p>
            </div>
            <div className={styles.colorPreview} style={{ backgroundColor: theme.secondary, height: '2rem' }}>
              <p  className={styles.colorText} style={{ color: theme.textsecondary}}> {theme.secondary}</p>
            </div>
          </button>
        )
      )}
    </div>
  )
}
