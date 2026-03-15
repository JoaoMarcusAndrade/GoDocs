import { Link } from 'react-router-dom';
import style from './ButtonForms.module.css'

const ButtonForms = (props) => {
   const { ButtonFormsText, ButtonFormsLink } = props;
   return (
      <Link to={ButtonFormsLink}>
         <button className={style.ButtonForms}>{ButtonFormsText}</button>
      </Link>
   )
};

export { ButtonForms };