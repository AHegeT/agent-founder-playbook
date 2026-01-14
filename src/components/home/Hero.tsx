import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/agfou_banner3.png";
import heroBannerK from "@/assets/agfou_banner_k.png";

export const Hero = () => {
    return (
        <section className="relative w-full min-h-[65vh] flex flex-col items-center justify-center overflow-hidden bg-orange-50/30 pb-12">
            {/* Background Image Container */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-20"
                style={{ backgroundImage: `url(${heroBanner})` }}
            />

            {/* Content */}
            <div className="container relative z-10 mx-auto max-w-4xl px-4 text-center pt-16 pb-20">
                <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-foreground">
                    The Heart of <span className="text-orange-500">AI Innovation</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
                    Connect with fellow founders, share insights, and build the next generation of AI businesses together.
                </p>

                <div className="mb-12">
                    <a href="/events/roundtables">
                        <Button
                            size="lg"
                            className="text-base md:text-lg px-10 py-6 rounded-3xl shadow-xl hover:scale-105 transition-all duration-300 bg-orange-500 hover:bg-orange-600 text-white"
                        >
                            See Upcoming Events
                            <ArrowRight className="ml-3 w-5 h-5" />
                        </Button>
                    </a>
                </div>
            </div>

            {/* Banner at bottom of hero */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-10">
                <img
                    src={heroBannerK}
                    alt="AI Founders banner"
                    className="w-32 md:w-40 h-auto opacity-80"
                />
            </div>
        </section>
    );
};
