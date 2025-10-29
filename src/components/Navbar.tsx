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
import { Bot } from "lucide-react";

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Bot className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
            <span className="font-bold text-lg bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Agents & Founders
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>

            <NavigationMenu delayDuration={0}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="font-medium transition-colors hover:text-primary text-muted-foreground bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent h-auto px-0 py-0 text-base">
                    Events
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[240px] gap-4 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/events/roundtables"
                            className="block select-none space-y-2 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-base font-semibold leading-none">Roundtables</div>
                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              Small group discussions
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/events/masterminds"
                            className="block select-none space-y-2 rounded-md p-4 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-base font-semibold leading-none">Masterminds</div>
                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                              Monthly deep-dives
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
              className={`font-medium transition-colors hover:text-primary ${
                isActive("/playbooks") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Playbooks
            </Link>
            <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary hover:bg-primary/90 transition-opacity">
                Apply Now
              </Button>
            </a>
          </div>

          <div className="md:hidden">
            <a href="https://www.meetup.com/agents-and-founders/" target="_blank" rel="noopener noreferrer">
              <Button size="sm" className="bg-primary hover:bg-primary/90">
                Apply
              </Button>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
