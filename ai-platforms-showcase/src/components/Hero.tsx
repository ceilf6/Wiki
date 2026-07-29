export default function Hero() {
  return (
    <header className="hero">
      <div>
        <p className="hero-eyebrow load-rise" style={{ animationDelay: '0.05s' }}>
          OBSERVATORY&nbsp;&nbsp;·&nbsp;&nbsp;二〇二六观测年鉴&nbsp;&nbsp;·&nbsp;&nbsp;N°08
        </p>
        <h1 className="hero-title">
          <span className="load-rise" style={{ animationDelay: '0.15s' }}>
            大模型
          </span>
          <span className="hero-title-accent load-rise" style={{ animationDelay: '0.28s' }}>
            图鉴
          </span>
        </h1>
        <p className="hero-sub load-rise" style={{ animationDelay: '0.42s' }}>
          八颗恒星，各自成系。国内主流 AI 平台的一次目视观测——
          厂商、代表模型与亮点能力，尽收一页。
        </p>
        <div className="hero-meta load-rise" style={{ animationDelay: '0.55s' }}>
          <span>SPECIMENS 08</span>
          <span className="hero-meta-divider" aria-hidden="true" />
          <span>FIELD OF VIEW 单页</span>
          <span className="hero-meta-divider" aria-hidden="true" />
          <span>MAGNITUDE 民用级</span>
        </div>
      </div>
      <span className="hero-vertical" aria-hidden="true">
        观其大略 · 不求甚解
      </span>
    </header>
  )
}
