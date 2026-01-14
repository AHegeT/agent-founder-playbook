import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/agfou_banner.png";

export const Hero = () => {
    return (
        <section className="relative w-full min-h-[65vh] flex flex-col items-center justify-center overflow-visible bg-orange-50/30">
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

            {/* Mascot positioned at bottom, overlapping slightly */}
            <div className="relative z-20 -mt-12">
                <img
                    src="/images/hero-mascot-main.png"
                    alt="Community mascot"
                    className="w-56 md:w-64 h-auto drop-shadow-2xl"
                    onError={(e) => {
                        // Fallback to hide if image doesn't exist yet
                        e.currentTarget.style.display = 'none';
                    }}
                />
            </div>
        </section>
    );
};
