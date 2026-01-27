import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Bot, UserPlus } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20 group-hover:border-primary transition-colors">
              <Bot className="w-6 h-6 text-primary transition-transform group-hover:rotate-12" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              Agents <span className="text-primary">&</span> Founders
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-primary ${isActive("/") ? "text-primary" : "text-muted-foreground"}`}
            >
              Community
            </Link>

            <NavigationMenu delayDuration={0}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium text-muted-foreground hover:text-primary bg-transparent text-base">
                    Events
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[240px] gap-4 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/events/roundtables"
                            className="block select-none space-y-2 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="text-base font-semibold leading-none">Roundtables</div>
                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              Deep dives into specific topics.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/events/masterminds"
                            className="block select-none space-y-2 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground"
                          >
                            <div className="text-base font-semibold leading-none">Masterminds</div>
                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              Peer-to-peer growth sessions.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Link
              to="/playbooks"
              className={`font-medium transition-colors hover:text-primary ${isActive("/playbooks") ? "text-primary" : "text-muted-foreground"}`}
            >
              Resources
            </Link>

            <Link
              to="/about"
              className={`font-medium transition-colors hover:text-primary ${isActive("/about") ? "text-primary" : "text-muted-foreground"}`}
            >
              About Us
            </Link>

            <LanguageToggle />

            <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-gradient-to-r from-primary to-primary/90 hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 rounded-full px-6">
                Join the Community
                <UserPlus className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <LanguageToggle />
            <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Join
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
