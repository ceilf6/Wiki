import Hero from './components/Hero'
import PlatformCard from './components/PlatformCard'
import Footer from './components/Footer'
import { platforms } from './data/platforms'

export default function App() {
  return (
    <div className="page">
      <div className="backdrop" aria-hidden="true">
        <div className="glow glow-a" />
        <div className="glow glow-b" />
        <div className="glow glow-c" />
        <div className="stars" />
        <div className="grain" />
      </div>

      <Hero />

      <main className="atlas" aria-label="AI 平台图鉴">
        {platforms.map((platform, index) => (
          <PlatformCard key={platform.id} platform={platform} index={index} />
        ))}
      </main>

      <Footer />
    </div>
  )
}
