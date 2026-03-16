import { CabecalhoGodocsBack } from "../../components/CabecalhoGoDocsBack/CabecalhoGodocs"
import { Step2ChooseDelivery } from "../../components/DeliveryMap/Passo2Delivery"

const DeliveryStep2 = () => {
    return (
        <>
            <CabecalhoGodocsBack cabecalhoGodocsLink="/delivery"></CabecalhoGodocsBack>
            <Step2ChooseDelivery></Step2ChooseDelivery>
        </>
    )
}

export { DeliveryStep2 }