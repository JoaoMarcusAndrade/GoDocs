import { CabecalhoGodocsBack } from "../../components/CabecalhoGoDocsBack/CabecalhoGodocs";
import { Step3Tracking } from "../../components/DeliveryMap/Passo3Delivery";

const DeliveryStep3 = () =>{
  return (
    <>
    <CabecalhoGodocsBack cabecalhoGodocsLink="/delistep2"></CabecalhoGodocsBack>
    <Step3Tracking></Step3Tracking>
    </>
  )
}

export {DeliveryStep3}