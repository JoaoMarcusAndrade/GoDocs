import { CabecalhoGodocsBack } from "../../components/CabecalhoGoDocsBack/CabecalhoGodocs"
import { Step1SelectDestination } from "../../components/DeliveryMap/Passo1Delivery"


const Delivery = () =>{
 return(
    <>
     <CabecalhoGodocsBack cabecalhoGodocsLink="/home"></CabecalhoGodocsBack>
     <Step1SelectDestination></Step1SelectDestination>
     
    </>
 )
}

export {Delivery}