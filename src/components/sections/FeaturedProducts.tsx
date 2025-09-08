import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingBag, Eye } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
}

const FeaturedProducts = () => {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);

  // Mock product data - in real app, this would come from your API
  const products: Product[] = [
    {
      id: 1,
      name: "Silk Evening Dress",
      price: 599,
      originalPrice: 799,
      image: "/placeholder.svg",
      category: "Dresses",
      isSale: true
    },
    {
      id: 2,
      name: "Cashmere Coat",
      price: 1299,
      image: "/placeholder.svg",
      category: "Outerwear",
      isNew: true
    },
    {
      id: 3,
      name: "Designer Handbag",
      price: 899,
      image: "/placeholder.svg",
      category: "Accessories"
    },
    {
      id: 4,
      name: "Tailored Blazer",
      price: 749,
      image: "/placeholder.svg",
      category: "Jackets",
      isNew: true
    },
    {
      id: 5,
      name: "Luxury Watch",
      price: 2499,
      image: "/placeholder.svg",
      category: "Accessories"
    },
    {
      id: 6,
      name: "Pearl Necklace",
      price: 399,
      originalPrice: 599,
      image: "/placeholder.svg",
      category: "Jewelry",
      isSale: true
    }
  ];

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-semibold mb-4">
            Featured
            <span className="text-gradient"> Collection</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked pieces that embody our commitment to exceptional quality and timeless design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="group overflow-hidden border-0 shadow-soft hover:shadow-strong transition-all duration-500 bg-card"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && (
                    <Badge className="bg-secondary text-secondary-foreground">New</Badge>
                  )}
                  {product.isSale && (
                    <Badge className="bg-destructive text-destructive-foreground">Sale</Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/90 hover:bg-white shadow-soft"
                    onClick={() => toggleLike(product.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 ${
                        likedProducts.includes(product.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-foreground'
                      }`} 
                    />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="bg-white/90 hover:bg-white shadow-soft"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                  <Button variant="luxury" className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <h3 className="font-display text-xl font-medium mb-3 group-hover:text-secondary transition-colors duration-200">
                  {product.name}
                </h3>
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-semibold text-secondary">
                    ${product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-muted-foreground line-through">
                      ${product.originalPrice}
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="boutique" size="lg" className="px-8">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;