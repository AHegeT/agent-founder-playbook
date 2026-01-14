import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react";

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
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Community Calendar</h2>

            <div className="space-y-3 flex-grow">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-md ${event.highlight
                            ? "bg-orange-50 border-orange-300"
                            : "bg-white border-orange-100 hover:border-orange-200"
                            }`}
                    >
                        <div className="p-4 flex gap-3 items-center">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-orange-200 flex flex-col items-center justify-center">
                                <span className="text-[9px] font-bold uppercase text-muted-foreground">{event.date.split(',')[0].split(' ')[0]}</span>
                                <span className="text-base font-bold text-orange-500">{event.date.split(',')[0].split(' ')[1]}</span>
                            </div>

                            <div className="flex-grow min-w-0">
                                <h3 className="text-sm font-bold truncate group-hover:text-orange-500 transition-colors">{event.title}</h3>
                                <div className="flex items-center text-xs text-muted-foreground gap-2 mt-0.5">
                                    <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> {event.date}</span>
                                </div>
                            </div>

                            <div className="flex-shrink-0">
                                <Button
                                    size="sm"
                                    className={`rounded-2xl text-xs ${event.highlight
                                        ? "bg-orange-500 hover:bg-orange-600 text-white"
                                        : "bg-white border border-orange-200 hover:bg-orange-50 text-foreground"
                                        }`}
                                    variant={event.highlight ? "default" : "outline"}
                                >
                                    RSVP
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 text-right">
                <Button variant="link" className="text-orange-500 p-0 h-auto font-semibold hover:text-orange-600">
                    View Full Calendar <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
