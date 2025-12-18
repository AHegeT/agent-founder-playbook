import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, MapPin, ArrowRight } from "lucide-react";

const events = [
    {
        title: "AI & Legal Tech Roundtable",
        date: "Oct 25, 6:00 PM",
        tags: ["#LegalTech", "#GenAI"],
        highlight: true
    },
    {
        title: "Founder Mastermind: Growth",
        date: "Nov 2, 7:00 PM",
        tags: ["#Growth", "#Bootstrapping"],
        highlight: false
    },
    {
        title: "Demo Day: Winter Cohort",
        date: "Nov 15, 5:30 PM",
        tags: ["#Showcase", "#Funding"],
        highlight: false
    },
    {
        title: "Coffee & Code: LLM Fine-tuning",
        date: "Nov 20, 10:00 AM",
        tags: ["#Technical", "#Workshop"],
        highlight: false
    }
];

export const UpcomingEvents = () => {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">Community Calendar</h2>
            </div>

            <div className="space-y-4 flex-grow">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-lg ${event.highlight
                            ? "bg-card border-primary/50 shadow-glow"
                            : "bg-card/50 border-border hover:border-primary/30"
                            }`}
                    >
                        <div className="p-4 flex gap-4 items-center">
                            <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-secondary flex flex-col items-center justify-center border border-border">
                                <span className="text-[10px] font-bold uppercase text-muted-foreground">{event.date.split(',')[0].split(' ')[0]}</span>
                                <span className="text-lg font-bold text-foreground">{event.date.split(',')[0].split(' ')[1]}</span>
                            </div>

                            <div className="flex-grow min-w-0">
                                <h3 className="text-base font-bold truncate group-hover:text-primary transition-colors">{event.title}</h3>
                                <div className="flex items-center text-xs text-muted-foreground gap-3 mt-1">
                                    <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> {event.date}</span>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <Button size="sm" variant={event.highlight ? "default" : "secondary"}>
                                    RSVP
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-6 text-right">
                <Button variant="link" className="text-primary p-0 h-auto font-semibold">
                    View Full Calendar <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
