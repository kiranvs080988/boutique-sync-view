import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Calendar, DollarSign, ArrowLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { apiService, CreateWorkOrderRequest } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const CreateOrder = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateWorkOrderRequest>({
    client: {
      name: "",
      mobile_number: "",
      email: "",
      address: ""
    },
    expected_delivery_date: "",
    description: "",
    advance_amount: 0,
    estimated_amount: 0
  });

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (field: string, value: string | number) => {
    if (field.startsWith('client.')) {
      const clientField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        client: {
          ...prev.client,
          [clientField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client.name || !formData.client.mobile_number || !formData.expected_delivery_date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Validate mobile number (10 digits)
    if (!/^\d{10}$/.test(formData.client.mobile_number)) {
      toast({
        title: "Error",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      
      // Format the date for the API
      const deliveryDate = new Date(formData.expected_delivery_date);
      const formattedDate = deliveryDate.toLocaleDateString('en-GB') + ' ' + deliveryDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      const orderData = {
        ...formData,
        expected_delivery_date: formattedDate,
        advance_amount: Number(formData.advance_amount) || undefined,
        estimated_amount: Number(formData.estimated_amount) || undefined
      };

      const createdOrder = await apiService.createWorkOrder(orderData);
      
      toast({
        title: "Success",
        description: `Work order #${createdOrder.id} created successfully`,
      });
      
      navigate('/orders');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create work order",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/orders">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
              Create New
              <span className="text-gradient"> Order</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Create a new work order for your boutique
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Client Information */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Client Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={formData.client.name}
                    onChange={(e) => handleInputChange('client.name', e.target.value)}
                    placeholder="Enter client name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile Number *</Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.client.mobile_number}
                    onChange={(e) => handleInputChange('client.mobile_number', e.target.value)}
                    placeholder="Enter 10-digit mobile number"
                    maxLength={10}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.client.email}
                    onChange={(e) => handleInputChange('client.email', e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address (Optional)</Label>
                  <Input
                    id="address"
                    value={formData.client.address}
                    onChange={(e) => handleInputChange('client.address', e.target.value)}
                    placeholder="Enter address"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Order Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="delivery_date">Expected Delivery Date *</Label>
                <Input
                  id="delivery_date"
                  type="datetime-local"
                  value={formData.expected_delivery_date}
                  onChange={(e) => handleInputChange('expected_delivery_date', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Order Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Describe the work order details..."
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Billing Information */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Billing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="advance_amount">Advance Amount ($)</Label>
                  <Input
                    id="advance_amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.advance_amount}
                    onChange={(e) => handleInputChange('advance_amount', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimated_amount">Estimated Amount ($)</Label>
                  <Input
                    id="estimated_amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.estimated_amount}
                    onChange={(e) => handleInputChange('estimated_amount', parseFloat(e.target.value) || 0)}
                    placeholder="0.00"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <Link to="/orders">
              <Button variant="outline" className="w-full sm:w-auto">
                Cancel
              </Button>
            </Link>
            <Button 
              type="submit" 
              variant="luxury" 
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? "Creating..." : "Create Order"}
            </Button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default CreateOrder;