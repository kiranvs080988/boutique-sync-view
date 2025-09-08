import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-secondary rounded-lg"></div>
              <span className="text-2xl font-display font-semibold">
                Boutique
              </span>
            </div>
            <p className="text-primary-foreground/80 max-w-md leading-relaxed">
              Discover luxury fashion that speaks to your soul. Join our community of style enthusiasts 
              and be the first to know about exclusive collections and special offers.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-4">
              <h3 className="font-display text-lg font-medium">Stay in Style</h3>
              <div className="flex gap-2 max-w-sm">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60"
                />
                <Button variant="secondary" className="shrink-0">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-display text-lg font-medium">Quick Links</h3>
            <nav className="space-y-3">
              <Link to="/products" className="block text-primary-foreground/80 hover:text-secondary transition-colors">
                All Collections
              </Link>
              <Link to="/new-arrivals" className="block text-primary-foreground/80 hover:text-secondary transition-colors">
                New Arrivals
              </Link>
              <Link to="/sale" className="block text-primary-foreground/80 hover:text-secondary transition-colors">
                Sale Items
              </Link>
              <Link to="/gift-cards" className="block text-primary-foreground/80 hover:text-secondary transition-colors">
                Gift Cards
              </Link>
              <Link to="/size-guide" className="block text-primary-foreground/80 hover:text-secondary transition-colors">
                Size Guide
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-display text-lg font-medium">Get in Touch</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  123 Fashion Street, Style City, SC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  +1 (555) 123-4567
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-secondary shrink-0" />
                <span className="text-primary-foreground/80 text-sm">
                  hello@boutique.com
                </span>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h4 className="font-medium">Follow Us</h4>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10">
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10">
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-primary-foreground/80 hover:text-secondary hover:bg-primary-foreground/10">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-primary-foreground/60 text-sm">
              © 2024 Boutique. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Terms of Service
              </Link>
              <Link to="/returns" className="text-primary-foreground/60 hover:text-secondary transition-colors">
                Returns & Exchanges
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;