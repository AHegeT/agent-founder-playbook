import agentKWave from "@/assets/agent_k_wave.png";
import { Bot, Github, Twitter, Linkedin } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-orange-50/50 pt-20 pb-10 border-t border-orange-100 mt-auto">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1 space-y-4">
                        <div className="flex items-center gap-2">
                            <Bot className="w-8 h-8 text-orange-500" />
                            <span className="font-bold text-xl">Agents & Founders</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            We believe in open collaboration and supportive building. Join the movement.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 rounded-full bg-white border border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors"><Twitter className="w-5 h-5" /></a>
                            <a href="#" className="p-2 rounded-full bg-white border border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors"><Github className="w-5 h-5" /></a>
                            <a href="#" className="p-2 rounded-full bg-white border border-orange-200 hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-colors"><Linkedin className="w-5 h-5" /></a>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Community</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Events</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Membership</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Code of Conduct</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-muted-foreground">
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Playbooks</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Blog</a></li>
                            <li><a href="#" className="hover:text-orange-500 transition-colors">Newsletter</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col items-center md:items-end text-center md:text-right relative">
                        <img src={agentKWave} alt="Agent K Waving" className="w-32 mb-4 drop-shadow-lg transform hover:rotate-12 transition-transform duration-300" />
                        <p className="font-bold text-orange-500">See you at the next meetup!</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
