import Hero from '../../components/landing/Hero'
import MotoFeaturedProducts from '../../components/landing/MotoFeaturedProducts'
import MotoServices from '../../components/landing/MotoServices'
import MotoCTA from '../../components/landing/MotoCTA'
import Testimonials from '../../components/landing/Testimonials'
import HowItWorks from '../../components/landing/HowItWorks'
import About from '../../components/landing/About'
import Contact from '../../components/landing/Contact'
import LandingFooter from '../../components/landing/LandingFooter'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col relative overflow-x-hidden">
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(ellipse 100% 80% at 50% -30%, rgba(255,122,0,0.18), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 20%, rgba(139,92,246,0.08), transparent), radial-gradient(ellipse 50% 40% at 0% 60%, rgba(59,130,246,0.06), transparent)',
        }}
      />
      <Hero />
      <MotoFeaturedProducts />
      <MotoCTA variant="products" />
      <MotoServices />
      <Testimonials />
      <MotoCTA variant="services" />
      <HowItWorks />
      <About />
      <Contact />
      <LandingFooter />
    </div>
  )
}
