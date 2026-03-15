import style from './Inicial.module.css'
import { InitialDoubleSelect } from "../../components/InitialDoubleSelect/InitialDoubleSelect"
import { SearchInput } from "../../components/SearchInput/SearchInput"
import { ValueSim } from "../../components/ValueSim/ValueSIm"
import { CarroselDIV } from '../../components/InitialCarrosel/Carrosel'


const Initial = () => {
   return (
      <div className={style.Inicial}>
         <SearchInput></SearchInput>
         <div className={style.InicialInfo}>
            <h3>Envie ou receba itens</h3>
            <p>Entregadores parceiros rápidos e acessiveis</p>
         </div>
         <InitialDoubleSelect></InitialDoubleSelect>
         <ValueSim></ValueSim>
         <CarroselDIV></CarroselDIV>
      </div>
   )
}

export { Initial };
