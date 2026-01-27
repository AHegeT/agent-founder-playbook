import { useState } from "react";
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
import { Bot, UserPlus, Menu, X, ChevronDown } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [eventsExpanded, setEventsExpanded] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setEventsExpanded(false);
  };

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

            <NavigationMenu delayDuration={0} skipDelayDuration={0}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium text-muted-foreground hover:text-primary bg-transparent text-base">
                    Events
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[320px] gap-1 p-2">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/events/roundtables"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10"
                          >
                            <div className="text-sm font-semibold leading-none">Roundtables</div>
                            <p className="text-sm leading-snug text-muted-foreground">
                              Deep dives into specific topics.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/events/webinars"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10"
                          >
                            <div className="text-sm font-semibold leading-none">Webinars</div>
                            <p className="text-sm leading-snug text-muted-foreground">
                              Online sessions and presentations.
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/events/workshops"
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-primary/10"
                          >
                            <div className="text-sm font-semibold leading-none">Workshops</div>
                            <p className="text-sm leading-snug text-muted-foreground">
                              Hands-on building sessions.
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

          <div className="md:hidden flex items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-primary/10 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
            <div className="flex flex-col py-4 space-y-1">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className={`px-4 py-3 font-medium transition-colors hover:bg-primary/10 ${isActive("/") ? "text-primary" : "text-foreground"}`}
              >
                Community
              </Link>

              <div>
                <button
                  onClick={() => setEventsExpanded(!eventsExpanded)}
                  className="w-full px-4 py-3 font-medium flex items-center justify-between hover:bg-primary/10 transition-colors"
                >
                  <span>Events</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${eventsExpanded ? "rotate-180" : ""}`} />
                </button>
                {eventsExpanded && (
                  <div className="bg-secondary/30 py-2">
                    <Link
                      to="/events/roundtables"
                      onClick={closeMobileMenu}
                      className="block px-8 py-2 text-sm hover:bg-primary/10 transition-colors"
                    >
                      Roundtables
                    </Link>
                    <Link
                      to="/events/webinars"
                      onClick={closeMobileMenu}
                      className="block px-8 py-2 text-sm hover:bg-primary/10 transition-colors"
                    >
                      Webinars
                    </Link>
                    <Link
                      to="/events/workshops"
                      onClick={closeMobileMenu}
                      className="block px-8 py-2 text-sm hover:bg-primary/10 transition-colors"
                    >
                      Workshops
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/playbooks"
                onClick={closeMobileMenu}
                className={`px-4 py-3 font-medium transition-colors hover:bg-primary/10 ${isActive("/playbooks") ? "text-primary" : "text-foreground"}`}
              >
                Resources
              </Link>

              <Link
                to="/about"
                onClick={closeMobileMenu}
                className={`px-4 py-3 font-medium transition-colors hover:bg-primary/10 ${isActive("/about") ? "text-primary" : "text-foreground"}`}
              >
                About Us
              </Link>

              <div className="px-4 pt-4">
                <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full bg-primary hover:bg-primary/90">
                    Join the Community
                    <UserPlus className="ml-2 w-4 h-4" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
