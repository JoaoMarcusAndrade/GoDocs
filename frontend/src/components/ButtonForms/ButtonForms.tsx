import { Link } from 'react-router-dom';
import style from './ButtonForms.module.css'

const ButtonForms = (props) => {
   const { ButtonFormsText, ButtonFormsLink, ButtonOnClick} = props;
   return (
      <Link to={ButtonFormsLink} className={style.Amaldito}>
         <button className={style.ButtonForms} onClick={ButtonOnClick} >{ButtonFormsText}</button>
      </Link>
   )
};

export { ButtonForms };