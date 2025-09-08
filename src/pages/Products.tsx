import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Heart, ShoppingBag, Eye, Filter, Grid, List } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  rating: number;
  reviews: number;
}

const Products = () => {
  const [likedProducts, setLikedProducts] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock products data - replace with API call
  const products: Product[] = [
    {
      id: 1,
      name: "Silk Evening Dress",
      price: 599,
      originalPrice: 799,
      image: "/placeholder.svg",
      category: "dresses",
      isSale: true,
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Cashmere Coat",
      price: 1299,
      image: "/placeholder.svg",
      category: "outerwear",
      isNew: true,
      rating: 4.9,
      reviews: 89
    },
    {
      id: 3,
      name: "Designer Handbag",
      price: 899,
      image: "/placeholder.svg",
      category: "accessories",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: "Tailored Blazer",
      price: 749,
      image: "/placeholder.svg",
      category: "jackets",
      isNew: true,
      rating: 4.6,
      reviews: 203
    },
    {
      id: 5,
      name: "Luxury Watch",
      price: 2499,
      image: "/placeholder.svg",
      category: "accessories",
      rating: 4.9,
      reviews: 67
    },
    {
      id: 6,
      name: "Pearl Necklace",
      price: 399,
      originalPrice: 599,
      image: "/placeholder.svg",
      category: "jewelry",
      isSale: true,
      rating: 4.5,
      reviews: 98
    },
    {
      id: 7,
      name: "Leather Boots",
      price: 449,
      image: "/placeholder.svg",
      category: "shoes",
      rating: 4.7,
      reviews: 178
    },
    {
      id: 8,
      name: "Vintage Scarf",
      price: 199,
      image: "/placeholder.svg",
      category: "accessories",
      rating: 4.4,
      reviews: 89
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'dresses', label: 'Dresses' },
    { value: 'outerwear', label: 'Outerwear' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'jackets', label: 'Jackets' },
    { value: 'jewelry', label: 'Jewelry' },
    { value: 'shoes', label: 'Shoes' }
  ];

  const toggleLike = (productId: number) => {
    setLikedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const filteredProducts = products.filter(product => 
    filterCategory === 'all' || product.category === filterCategory
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
            Our
            <span className="text-gradient"> Collection</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our carefully curated selection of luxury fashion pieces, 
            each chosen for its exceptional quality and timeless appeal.
          </p>
        </div>

        {/* Filters & Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 p-6 bg-muted/30 rounded-lg">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex-1">
              <Input 
                placeholder="Search products..." 
                className="bg-background"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className={`group overflow-hidden border-0 shadow-soft hover:shadow-strong transition-all duration-500 bg-card ${
                viewMode === 'list' ? 'flex flex-row' : ''
              }`}
            >
              <div className={`relative overflow-hidden ${
                viewMode === 'list' ? 'w-64 shrink-0' : ''
              }`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className={`object-cover group-hover:scale-105 transition-transform duration-700 ${
                    viewMode === 'list' ? 'w-full h-full' : 'w-full h-80'
                  }`}
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

                {/* Overlay on Hover (Grid view only) */}
                {viewMode === 'grid' && (
                  <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <Button variant="luxury" className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                )}
              </div>

              <CardContent className="p-6 flex-1">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs">
                    {product.category}
                  </Badge>
                </div>
                <h3 className="font-display text-xl font-medium mb-3 group-hover:text-secondary transition-colors duration-200">
                  {product.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-secondary' : 'text-muted-foreground'}`}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between">
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
                  
                  {viewMode === 'list' && (
                    <Button variant="luxury">
                      <ShoppingBag className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="boutique" size="lg" className="px-8">
            Load More Products
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;