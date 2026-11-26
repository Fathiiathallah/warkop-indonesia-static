import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import MenuSection from "@/components/MenuSection";
import EventSection from "@/components/EventSection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <CartProvider>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <FacilitiesSection />
        <MenuSection />
        <EventSection />
        <LocationSection />
      </main>
      <Footer />
      <CartDrawer />
    </CartProvider>
  );
}
