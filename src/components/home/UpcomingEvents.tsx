import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { getUpcomingEvents, getDateParts, formatEventDate, type Event } from "@/lib/events";

const getEventPageUrl = (event: Event): string | null => {
    switch (event.type) {
        case "roundtable":
            return `/events/roundtables/${event.slug}`;
        case "webinar":
            return "/events/webinars";
        case "workshop":
            return "/events/workshops";
        case "mastermind":
            return "/events/masterminds";
        default:
            return null;
    }
};

export const UpcomingEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUpcomingEvents().then((data) => {
            setEvents(data);
            setLoading(false);
        });
    }, []);

    if (loading) {
        return (
            <div className="w-full h-full flex flex-col">
                <h2 className="text-2xl md:text-3xl font-bold mb-6">Community Calendar</h2>
                <div className="flex-grow flex items-center justify-center text-muted-foreground">
                    Loading events...
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full flex flex-col">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Community Calendar</h2>

            <div className="space-y-3 flex-grow">
                {events.length === 0 ? (
                    <div className="text-muted-foreground text-center py-8">
                        No upcoming events scheduled.
                    </div>
                ) : (
                    events.map((event) => {
                        const dateParts = getDateParts(event.date);
                        return (
                            <div
                                key={event.id}
                                className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-md ${event.highlight
                                    ? "bg-orange-50 border-orange-300"
                                    : "bg-white border-orange-100 hover:border-orange-200"
                                    }`}
                            >
                                <div className="p-4 flex gap-3 items-center">
                                    {event.image && (
                                        <div className="flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-orange-200">
                                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}

                                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-orange-200 flex flex-col items-center justify-center">
                                        <span className="text-[9px] font-bold uppercase text-muted-foreground">{dateParts.month}</span>
                                        <span className="text-base font-bold text-orange-500">{dateParts.day}</span>
                                    </div>

                                    {(() => {
                                        const pageUrl = getEventPageUrl(event);
                                        const details = (
                                            <>
                                                <h3 className="text-sm font-bold truncate group-hover:text-orange-500 transition-colors">{event.title}</h3>
                                                <div className="flex items-center text-xs text-muted-foreground gap-2 mt-0.5">
                                                    <span className="flex items-center gap-1"><CalendarIcon className="w-3 h-3" /> {formatEventDate(event.date)}</span>
                                                </div>
                                            </>
                                        );
                                        return pageUrl ? (
                                            <Link to={pageUrl} className="flex-grow min-w-0">
                                                {details}
                                            </Link>
                                        ) : (
                                            <div className="flex-grow min-w-0">
                                                {details}
                                            </div>
                                        );
                                    })()}

                                    <div className="flex-shrink-0">
                                        <a href={event.rsvpUrl} target="_blank" rel="noopener noreferrer">
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
                                        </a>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/*<div className="pt-4 text-right">
                <Button variant="link" className="text-orange-500 p-0 h-auto font-semibold hover:text-orange-600">
                    View Full Calendar <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>*/}
        </div>
    );
};
