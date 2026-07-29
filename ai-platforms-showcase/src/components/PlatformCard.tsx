import type { CSSProperties } from 'react'
import type { Platform } from '../data/platforms'
import { useReveal } from '../hooks/useReveal'

interface Props {
  platform: Platform
  index: number
}

export default function PlatformCard({ platform, index }: Props) {
  const ref = useReveal<HTMLElement>()
  const number = String(index + 1).padStart(2, '0')

  return (
    <article
      ref={ref}
      className="card"
      style={{ '--brand': platform.brandColor } as CSSProperties}
    >
      <span className="card-number" aria-hidden="true">
        {number}
      </span>
      <span className="card-tick card-tick-tl" aria-hidden="true" />
      <span className="card-tick card-tick-br" aria-hidden="true" />

      <div className="card-head">
        <span className="card-glyph" aria-hidden="true">
          {platform.glyph}
        </span>
        <div>
          <h2 className="card-name">{platform.name}</h2>
          <p className="card-latin">{platform.latin}</p>
        </div>
      </div>

      <dl className="card-meta">
        <div className="card-meta-row">
          <dt>厂商</dt>
          <dd>{platform.vendor}</dd>
        </div>
        <div className="card-meta-row">
          <dt>代表模型</dt>
          <dd>{platform.model}</dd>
        </div>
      </dl>

      <ul className="card-highlights">
        {platform.highlights.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <a
        className="card-link"
        href={platform.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        前往观测
        <span className="card-link-arrow" aria-hidden="true">
          →
        </span>
      </a>
    </article>
  )
}
