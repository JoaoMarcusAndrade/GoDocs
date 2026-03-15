import style from './InitialDoubleSelect.module.css'
import AviaoIcon from '../../assets/AviaoSVG.svg'
import MotoIcon from '../../assets/MotoIcon.png'
const InitialDoubleSelect = () =>{
    return (
        <div className={style.InitialDoubleSelect}>
            <div className={style.DivSelects}><div className={style.DivImg}><img src={MotoIcon}></img></div><p>Entrega de Documentos por todo o Brasil</p></div>
            <div className={style.LineDoubleSelect}></div>
            <div className={style.DivSelects}><div className={style.DivImg}><img src={AviaoIcon}></img></div><p>Entrega de Documentos Internacional</p></div>
        </div>
    )

};

export {InitialDoubleSelect}
