import style from './CabecalhoGodocs.module.css'
import LogoHeader from '../../assets/LogoWeb.png'
import { useAccessibility } from '../../context/AccessibilityContext';
const CabecalhoGodocs = () => {
  const { handleRead } = useAccessibility();

  return (
    <div className={style.CabecalhoGodocs}>
      <img src={LogoHeader} onMouseEnter={handleRead} alt="Logo go docs"></img>
    </div>
  )
}
export { CabecalhoGodocs };