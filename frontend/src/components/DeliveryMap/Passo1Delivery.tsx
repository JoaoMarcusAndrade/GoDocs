import styles from "./DeliverySteps.module.css"
import CasaIcon from '../../assets/Casa2SVG.svg'
import { Link } from "react-router-dom"
const Step1SelectDestination = () => {
    return (
        <div className={styles.container}>
            <div className={styles.topCard}>
                <input placeholder="HOME" className={styles.input} />
                <input placeholder="Escolha a localização do destino" className={styles.input} />
                <div className={styles.favorite}>
                    <span className={styles.icon}><img src={CasaIcon}></img></span>
                    <Link to="/delistep2">
                        <span>Casa</span>
                    </Link>
                    <span className={styles.addIcon}>+</span>
                </div>
            </div>

            <div className={styles.mapPlaceholder}>
                {/* Aqui será o mapa real mais tarde */}
                <p>Mapa placeholder</p>
            </div>
        </div>
    )
}

export { Step1SelectDestination }