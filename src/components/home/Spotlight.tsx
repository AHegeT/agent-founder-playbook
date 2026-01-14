import { Button } from "@/components/ui/button";
import { Trophy } from "lucide-react";

export const Spotlight = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Member Spotlight</h2>

            <div className="relative flex-grow bg-white rounded-3xl p-6 md:p-8 shadow-md border border-orange-100">
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left: Photo */}
                    <div className="flex-shrink-0">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300"
                            alt="Sarah, Community Member"
                            className="w-full md:w-32 h-48 md:h-32 object-cover rounded-2xl"
                        />
                    </div>

                    {/* Middle: Content */}
                    <div className="flex-grow flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-orange-500 font-semibold mb-2">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm">Founder of the Month</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-1">Sarah Jenkins</h3>
                        <p className="text-base text-muted-foreground mb-4">Founder of ScaleAI</p>
                        <blockquote className="text-sm italic border-l-4 border-orange-300 pl-3 mb-4">
                            "The community feedback was crucial for my launch!"
                        </blockquote>
                        <Button variant="outline" className="self-start text-sm rounded-2xl border-orange-200 hover:bg-orange-50">
                            Read Her Story
                        </Button>
                    </div>

                    {/* Right: Mascot with speech bubble */}
                    <div className="hidden lg:block flex-shrink-0 relative">
                        <img
                            src="/images/mascot-speech-bubble.png"
                            alt="Meet Sarah!"
                            className="w-24 h-auto"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
