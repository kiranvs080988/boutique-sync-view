import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-boutique.jpg";

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-primary/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 leading-tight">
            Boutique Work Orders
            <span className="block text-gradient bg-gradient-secondary bg-clip-text text-transparent">
              Management
            </span>
          </h1>
          <p className="text-xl md:text-2xl font-light mb-8 text-white/90 max-w-2xl mx-auto">
            Streamline your boutique operations with our comprehensive work order management system for tracking orders, clients, and delivery schedules.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="boutique" 
              size="lg" 
              className="px-8 py-4 text-lg"
              asChild
            >
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
            <Button 
              variant="elegant" 
              size="lg" 
              className="px-8 py-4 text-lg bg-white/10 text-white border-white/20 hover:bg-white/20"
              asChild
            >
              <Link to="/create-order">Create New Order</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full">
          <div className="w-1 h-3 bg-white/70 rounded-full mx-auto mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;