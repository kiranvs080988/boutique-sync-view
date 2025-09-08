import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Truck, Shield, Heart } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: Award,
      title: "Premium Quality",
      description: "Each piece is carefully curated from the finest materials and crafted with exceptional attention to detail."
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Express shipping worldwide with tracking and insurance for all your precious purchases."
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Shop with confidence knowing your personal information and payments are fully protected."
    },
    {
      icon: Heart,
      title: "Personal Style",
      description: "Our styling experts are here to help you create looks that reflect your unique personality."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-semibold mb-6">
                Where Elegance
                <span className="text-gradient block"> Meets Excellence</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Since our founding, we've been dedicated to bringing you the finest in luxury fashion. 
                Our boutique represents more than just clothing—it's a celebration of artistry, 
                craftsmanship, and the timeless pursuit of beauty.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Every piece in our collection tells a story. From the initial sketch to the final stitch, 
                we work with master artisans who share our passion for creating garments that transcend trends 
                and become treasured parts of your wardrobe.
              </p>
              <Button variant="elegant" size="lg" className="px-8">
                Our Story
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-soft hover:shadow-medium transition-all duration-300 bg-card">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto bg-gradient-accent rounded-full flex items-center justify-center shadow-soft">
                    <feature.icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <h3 className="font-display text-lg font-medium">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 pt-16 border-t border-border">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-display font-semibold text-secondary">
                10K+
              </div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-display font-semibold text-secondary">
                500+
              </div>
              <div className="text-muted-foreground">Premium Products</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-display font-semibold text-secondary">
                25+
              </div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl md:text-4xl font-display font-semibold text-secondary">
                15
              </div>
              <div className="text-muted-foreground">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;