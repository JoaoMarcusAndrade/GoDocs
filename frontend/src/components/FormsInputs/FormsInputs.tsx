import style from "./FormsInputs.module.css"

const FormsInputs = (props) => {
    const {PlaceHolderInput, TypeInput, IdInput} = props;
    return (
        <input type={TypeInput} placeholder={PlaceHolderInput} className={style.FormsInputs} id={IdInput}></input>
    )

}

export { FormsInputs}