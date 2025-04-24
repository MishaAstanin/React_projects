import './MainPage.css'

export default function MainPage() {
  return (
    <>
      <main id="hero">
        <section className="hero">
          <div className="container">
            <h1 className="hero-title">Автосалон премиум-класса</h1>
            <p className="hero-subtitle">Мечтайте о лучшем. Мы помогаем сделать мечту реальностью.</p>
          </div>
        </section>

        <section className="advantages">
          <div className="container">
            <div className="advantage-item">
              <h3>Гарантия качества</h3>
              <p>Все автомобили проходят тщательный технический осмотр</p>
            </div>
            <div className="advantage-item">
              <h3>Профессиональные консультанты</h3>
              <p>Наши специалисты помогут выбрать идеальный автомобиль</p>
            </div>
            <div className="advantage-item">
              <h3>Рассрочка и кредит</h3>
              <p>Удобные условия покупки для каждого клиента</p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <div className="footer-content">
            <div>
              <h3>Контакты</h3>
              <p>Телефон: +7 (999) 123-45-67</p>
              <p>Email: info@autosalon.ru</p>
              <p>Адрес: ул. Автодорога, 123</p>
            </div>
            <div>
              <h3>Часы работы</h3>
              <p>Пн-Пт: 09:00 - 20:00</p>
              <p>Сб-Вс: 10:00 - 18:00</p>
            </div>
            <div>
              <h3>Социальные сети</h3>
              <p>Telegram: @autosalon_official</p>
              <p>Facebook: @autosalon.page</p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}