import { Bot } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-orange-50/50 pt-12 pb-8 border-t border-orange-100 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <Bot className="w-6 h-6 text-orange-500" />
                        <span className="font-bold text-lg">Agents & Founders</span>
                    </div>
                    <p className="text-muted-foreground text-sm">
                        We believe in open collaboration and supportive building.
                    </p>
                    <p className="font-semibold text-orange-500">See you at the next meetup!</p>
                </div>
            </div>
        </footer>
    );
};
