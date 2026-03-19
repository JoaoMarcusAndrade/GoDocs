import style from "./FormsInputs.module.css"

const FormsInputs = (props) => {
    const {PlaceHolderInput, TypeInput, IdInput, value, onChange } = props;
    return (
        <input type={TypeInput} placeholder={PlaceHolderInput} className={style.FormsInputs} id={IdInput} value={value} onChange={onChange}></input>
    )

}

export { FormsInputs}