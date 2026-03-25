import style from './InitialDoubleSelect.module.css'
import AviaoIcon from '../../assets/AviaoSVG.svg'
import MotoIcon from '../../assets/MotoIcon.png'
import { Link } from 'react-router-dom';
const InitialDoubleSelect = () => {
    return (
        <div className={style.InitialDoubleSelect}>
            <div className={style.DivAroundSelects}>
                <Link to="/delivery" className={style.CardLink}>
                    <div className={style.DivSelects}>
                        <span className={style.Arrow}>&#10095;</span>
                        <div className={style.DivImg}><img src={MotoIcon} alt="Moto" /></div>
                        <div className={style.TextWrapper}> 
                            <p>Entrega de Documentos por todo o Brasil</p>
                        </div>
                    </div>
                </Link>

                <div className={style.LineDoubleSelect}></div>

                <Link to="/delivery" className={style.CardLink}>
                    <div className={style.DivSelects}>
                        <span className={style.Arrow}>&#10095;</span>
                        <div className={style.DivImg}><img src={AviaoIcon} alt="Avião" /></div>
                        <div className={style.TextWrapper}>
                            <p>Entrega de Documentos Internacional</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )

};

export { InitialDoubleSelect }
