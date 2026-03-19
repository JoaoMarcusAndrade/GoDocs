import { Link } from 'react-router-dom'
import style from './CarroselButton.module.css'

const CarroselButton = () =>{
  return (
    <Link to="/delivery">
     <button className={style.CarroselButton}>Solicitar agora</button>
    </Link>
  )
}

export {CarroselButton}