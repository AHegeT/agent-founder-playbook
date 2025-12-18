import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";
import agentKWave from "@/assets/agent_k_wave.png";

export const Spotlight = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-3xl font-bold mb-8">Member Spotlight</h2>

            <div className="relative flex-grow">
                <Card className="bg-card border-none shadow-card overflow-hidden h-full flex flex-col">
                    <div className="grid md:grid-cols-2 gap-0 h-full">
                        <div className="h-64 md:h-auto bg-muted relative">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800"
                                alt="Sarah, Community Member"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                            />
                        </div>
                        <div className="p-8 flex flex-col justify-center h-full">
                            <div className="flex items-center gap-2 text-primary font-semibold mb-4">
                                <Trophy className="w-5 h-5" />
                                <span>Founder of the Month</span>
                            </div>
                            <h3 className="text-3xl font-bold mb-2">Sarah Jenkins</h3>
                            <p className="text-xl text-muted-foreground mb-6">Founder of ScaleAI</p>
                            <blockquote className="text-lg italic border-l-4 border-primary pl-4 mb-8">
                                "The community feedback was crucial for my launch. I found my co-founder in the #general channel!"
                            </blockquote>
                            <Button variant="outline" className="self-start mt-auto">Read Her Story</Button>
                        </div>
                    </div>
                </Card>

                {/* Agent K Commentary - Integrated simpler for this layout */}
                <div className="hidden lg:flex absolute -right-16 top-0 flex-col items-center z-10">
                    {/* Temporarily hiding overlapping agent k to ensure clean 6/10 split visualization first, 
                     can bring back if space permits or overlapping is desired */}
                </div>
            </div>

            <div className="text-left mt-6">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary px-0">
                    Nominate a Member
                </Button>
            </div>
        </div>
    );
};
