export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <Hero />
      <MotoFeaturedProducts />
      <MotoServices />
      <HowItWorks />
      <About />
      <Contact />
      <LandingFooter />
    </div>
  )
}

import Hero from '../../components/landing/Hero'
import MotoFeaturedProducts from '../../components/landing/MotoFeaturedProducts'
import MotoServices from '../../components/landing/MotoServices'
import HowItWorks from '../../components/landing/HowItWorks'
import About from '../../components/landing/About'
import Contact from '../../components/landing/Contact'
import LandingFooter from '../../components/landing/LandingFooter'
