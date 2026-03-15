import googleIcon from '../../assets/google.png'
import style from './GoogleButton.module.css'

const GoogleButton = () => {
  return(
    <button className={style.GoogleButton}><img src={googleIcon}></img><span>Continuar com google</span></button>
  )
}

export { GoogleButton}