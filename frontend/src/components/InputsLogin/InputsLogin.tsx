import AvatarIconDefault from '../../assets/AvatarIconDefault.png'
import style from './InputsLogin.module.css'
const InputsLogin = () => {
    return (
        <>
        <div>
            <img src={AvatarIconDefault} id={style.AvatarUser}></img>
            <input type="file"></input>
        </div>
        <div className={style.InputsLogin}>

            <input type="text"></input>
        </div>
        <div className={style.InputsLogin}>

            <input type="text"></input>
        </div>
        </>
    )
}

export { InputsLogin };