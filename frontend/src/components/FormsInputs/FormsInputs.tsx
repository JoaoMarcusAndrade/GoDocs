import style from "./FormsInputs.module.css"

const FormsInputs = (props) => {
    const {PlaceHolderInput, TypeInput} = props;
    return (
        <input type={TypeInput} placeholder={PlaceHolderInput} className={style.FormsInputs}></input>
    )

}

export { FormsInputs}