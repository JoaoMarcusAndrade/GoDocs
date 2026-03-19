import style from './Carrosel.module.css'
import { CarroselButton } from './CarroselButton/CarroselButton'

const CarroselDIV = () => {
    return (
        <div className={style.DivCarroselFath}>
            <h1>Por que usar o <span>GoDocs</span>?</h1>
            <div className={style.DivCarrosel}>
                <h2>Envios ágeis com <br></br> parceiros estratégicos em<br></br> todo o Brasil.</h2>
                <CarroselButton></CarroselButton>
            </div>
        </div>
    )
}

export { CarroselDIV }