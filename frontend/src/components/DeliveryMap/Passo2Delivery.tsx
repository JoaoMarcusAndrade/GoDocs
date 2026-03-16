import styles from "./DeliverySteps.module.css"

const Step2ChooseDelivery = () => {
  return (
    <div className={styles.container}>
      <div className={styles.mapPlaceholder}>
        <p>Mapa placeholder</p>
      </div>

      <div className={styles.bottomCard}>
        <h3>Escolha a Opção de entrega</h3>
        <hr />
        <div className={styles.deliveryOptions}>
          <select>
            <option>Pequeno</option>
            <option>Médio</option>
            <option>Grande</option>
          </select>
          <div className={styles.avatar}>👤</div>
        </div>

        <div className={styles.deliveryInfo}>
          <span>14:54</span>
          <p>Entregador parceiro a 4 min de distância - Entrega Moto</p>
          <span>R$10,00</span>
        </div>

        <button className={styles.actionButton}>Avançar</button>
      </div>
    </div>
  )
}

export {Step2ChooseDelivery}