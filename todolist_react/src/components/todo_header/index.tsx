import styles from './index.module.scss'

export default function Header({changePages}){
  return (
    <header>
      <h1>
        记事本<a className={`${styles.btn} btn`} onClick={changePages}><span></span></a>
      </h1>
    </header>
  )
} 