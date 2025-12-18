import { Button } from "@/components/ui/button";
import agentKHero from "@/assets/agent_k_hero.png";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
            {/* Background Image Container */}
            <div className="absolute inset-0 z-0">
                <img
                    src={agentKHero}
                    alt="Agent K and founders collaborating"
                    className="w-full h-full object-cover"
                />
                {/* Overlay for readability - adjusting opacity to show image but keep text legible */}
                <div className="absolute inset-0 bg-background/90 z-10" />
            </div>

            {/* Content Content source */}
            <div className="container relative z-20 mx-auto max-w-5xl px-4 text-center">
                <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-foreground drop-shadow-sm">
                    The Heart of <span className="text-primary">AI Innovation</span>.
                </h1>
                <p className="text-xl md:text-3xl text-muted-foreground font-medium max-w-3xl mx-auto mb-12 leading-relaxed">
                    Connect with fellow founders, share insights, and build the next generation of AI businesses together.
                </p>

                <div>
                    <a href="/events/roundtables">
                        <Button size="lg" className="text-lg md:text-xl px-10 py-8 rounded-full shadow-xl hover:scale-105 transition-all duration-300 bg-gradient-to-r from-primary to-primary/90 ring-4 ring-primary/20">
                            See Upcoming Events
                            <ArrowRight className="ml-3 w-6 h-6" />
                        </Button>
                    </a>
                </div>
            </div>
        </section>
    );
};
