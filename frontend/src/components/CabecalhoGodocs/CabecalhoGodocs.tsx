import style from './CabecalhoGodocs.module.css'
import LogoHeader from '../../assets/LogoWeb.png'
const CabecalhoGodocs = () =>{


  return (
    <div className={style.CabecalhoGodocs}>
        <img src={LogoHeader}></img>
    </div>
  )
}
export {CabecalhoGodocs};