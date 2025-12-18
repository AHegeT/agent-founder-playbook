import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, Rocket, TrendingUp } from "lucide-react";

const steps = [
    {
        icon: Users,
        title: "Connect",
        description: "Join our private Slack and meet your peers.",
        color: "text-primary"
    },
    {
        icon: BookOpen,
        title: "Learn",
        description: "Access exclusive workshops and founder-led talks.",
        color: "text-accent"
    },
    {
        icon: Rocket,
        title: "Build",
        description: "Get feedback on your product and find collaborators.",
        color: "text-primary"
    },
    {
        icon: TrendingUp,
        title: "Scale",
        description: "Leverage the network to grow your user base and team.",
        color: "text-accent"
    }
];

export const ValueChain = () => {
    return (
        <section className="py-24 px-4 bg-secondary/30">
            <div className="container mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">Your Founder Journey</h2>
                    <p className="text-lg text-muted-foreground">From day one to scale, we are with you.</p>
                </div>

                <div className="relative max-w-5xl mx-auto">
                    {/* Connector Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full -z-10" />

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="flex flex-col items-center text-center group">
                                <div className={`w-24 h-24 rounded-2xl bg-card shadow-card flex items-center justify-center mb-6 border border-border group-hover:scale-110 transition-transform duration-300 ${step.color}`}>
                                    <step.icon className="w-10 h-10" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
