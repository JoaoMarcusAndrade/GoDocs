import styles from "./DeliverySteps.module.css"

const Step3Tracking = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mapPlaceholder}>
        <p>Mapa placeholder</p>
        <div className={styles.routeLine}>Linha de rota</div>
      </div>

      <div className={styles.bottomCard}>
        <h3>Entregador encontrado</h3>
        <hr />
        <div className={styles.trackingInfo}>
          <div>
            <p>Nome Entregador</p>
            <p>5/5★</p>
            <p>há 15min de você</p>
          </div>
          <div className={styles.avatarCircle}></div>
          <span>2KM</span>
        </div>

        <div className={styles.progressBar}>
          <div className={styles.progress}></div>
        </div>

        <button className={styles.actionButton}>Confirmar</button>
      </div>
    </div>
  )
}

export {Step3Tracking}