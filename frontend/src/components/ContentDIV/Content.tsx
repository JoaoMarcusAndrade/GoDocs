import style from './Content.module.css'

const ContentDIV = (props) =>{
    const {children} = props;
   return (
    <div className={style.Content}>
      {children}
    </div>
   )
}

export { ContentDIV };