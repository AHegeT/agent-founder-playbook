import { Hero } from "@/components/home/Hero";
import { ValueChain } from "@/components/home/ValueChain";
import { Spotlight } from "@/components/home/Spotlight";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { Footer } from "@/components/Footer";
import "./Home.css";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-primary/20">
      <Hero />
      <ValueChain />

      {/* Split Section: Spotlight (60%) and Calendar (40%) */}
      <section className="py-24 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 xl:gap-16">
            <div className="lg:col-span-6">
              <Spotlight />
            </div>
            <div className="lg:col-span-4">
              <UpcomingEvents />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
