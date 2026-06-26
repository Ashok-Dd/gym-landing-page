import Loader from '@/components/Loader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import Stats from '@/components/Stats';
import About from '@/components/About';
import Programs from '@/components/Programs';
import WhyUs from '@/components/WhyUs';
import MobileApp from '@/components/MobileApp';
import Trainers from '@/components/Trainers';
import Gallery from '@/components/Gallery';
import Membership from '@/components/Membership';
import VideoSection from '@/components/VideoSection';
import Testimonials from '@/components/Testimonials';
import BmiCalculator from '@/components/BmiCalculator';
import JoinForm from '@/components/JoinForm';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Loader />
      <main className="bg-forge-dark text-white overflow-x-hidden">
        <Navbar />
        <Hero />
        <Manifesto />
        <Stats />
        <About />
        <Programs />
        <WhyUs />
        <MobileApp />
        <Trainers />
        <Gallery />
        <Membership />
        <VideoSection />
        <Testimonials />
        <BmiCalculator />
        <JoinForm />
        <Footer />
      </main>
    </>
  );
}
