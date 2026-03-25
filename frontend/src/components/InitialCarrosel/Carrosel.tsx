import style from './Carrosel.module.css'
import { CarroselButton } from './CarroselButton/CarroselButton'

const slides = [
  {
    label: 'Envios ágeis com parceiros estratégicos em todo o Brasil',
    image: '/src/assets/motos.png',
  },
  {
    label: 'Rastreie seu pedido em tempo real e garanta entrega segura',
    image: '/src/assets/motos.png',
  },
  {
    label: 'Planos acessíveis para toda sua rede de documentos',
    image: '/src/assets/motos.png',
  },
]

const CarroselDIV = () => {
  return (
    <section className={style.CarouselSection} aria-label="Carrossel de benefícios">
      <h1 className={style.CarouselTitle}>Por que usar o <span>GoDocs</span>?</h1>
      <div className={style.CarouselSlides}>
        {slides.map((slide, index) => (
          <article key={index} className={style.CarouselSlide} aria-label={`Slide ${index + 1}`}>
            <div className={style.SlideBackground} style={{ backgroundImage: `url(${slide.image})` }} />
            <div className={style.SlideOverlay} />
            <div className={style.SlideContent}>
              <p className={style.SlideText}>{slide.label}</p>
              <CarroselButton />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export { CarroselDIV }