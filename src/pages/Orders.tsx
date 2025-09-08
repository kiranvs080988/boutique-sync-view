import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  Plus, 
  Calendar, 
  User, 
  Clock, 
  DollarSign,
  Edit,
  Trash2
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { apiService, WorkOrder } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Orders = () => {
  const [orders, setOrders] = useState<WorkOrder[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("delivery_date");
  const { toast } = useToast();

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    filterAndSortOrders();
  }, [orders, searchTerm, statusFilter, sortBy]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await apiService.getAllWorkOrders();
      setOrders(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load orders",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortOrders = () => {
    let filtered = orders;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((order) =>
        order.client?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.client?.mobile_number.includes(searchTerm) ||
        order.id?.toString().includes(searchTerm)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      if (statusFilter === "overdue") {
        filtered = filtered.filter((order) => order.is_overdue);
      } else {
        filtered = filtered.filter((order) => order.status === statusFilter);
      }
    }

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "delivery_date":
          return new Date(a.expected_delivery_date).getTime() - new Date(b.expected_delivery_date).getTime();
        case "order_date":
          return new Date(b.order_date || '').getTime() - new Date(a.order_date || '').getTime();
        case "status":
          return a.status.localeCompare(b.status);
        case "client":
          return (a.client?.name || '').localeCompare(b.client?.name || '');
        default:
          return 0;
      }
    });

    setFilteredOrders(filtered);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Started': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Finished': return 'bg-green-100 text-green-800 border-green-200';
      case 'Delivered - Fully Paid': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'Delivered – Payment Pending': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    
    try {
      await apiService.deleteWorkOrder(orderId);
      setOrders(orders.filter(order => order.id !== orderId));
      toast({
        title: "Success",
        description: "Order deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete order",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Loading orders...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-display font-semibold mb-4">
              Work
              <span className="text-gradient"> Orders</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage all your boutique work orders and track their progress
            </p>
          </div>
          <Link to="/create-order">
            <Button variant="luxury" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              Create Order
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-8 border-0 shadow-soft">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by client name, mobile, or order ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Order Placed">Order Placed</SelectItem>
                  <SelectItem value="Started">Started</SelectItem>
                  <SelectItem value="Finished">Finished</SelectItem>
                  <SelectItem value="Delivered - Fully Paid">Delivered - Paid</SelectItem>
                  <SelectItem value="Delivered – Payment Pending">Delivered - Pending</SelectItem>
                  <SelectItem value="overdue">Overdue Only</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delivery_date">Delivery Date</SelectItem>
                  <SelectItem value="order_date">Order Date</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="client">Client Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <Card key={order.id} className="border-0 shadow-soft hover:shadow-strong transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold">Order #{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                      {order.is_overdue && (
                        <Badge variant="destructive" className="animate-pulse">
                          Overdue
                        </Badge>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{order.client?.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Due: {new Date(order.expected_delivery_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Mobile:</span>
                        <span>{order.client?.mobile_number}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Ordered: {order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}</span>
                      </div>
                    </div>

                    {/* Billing Info */}
                    {(order.advance_amount || order.estimated_amount || order.due_amount) && (
                      <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium text-sm">Billing Information</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          {order.advance_amount && (
                            <div>Advance: ${order.advance_amount}</div>
                          )}
                          {order.estimated_amount && (
                            <div>Estimate: ${order.estimated_amount}</div>
                          )}
                          {order.due_amount && (
                            <div className="font-medium text-destructive">Due: ${order.due_amount}</div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex lg:flex-col gap-2">
                    <Link to={`/orders/${order.id}/edit`} className="flex-1 lg:flex-none">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 lg:flex-none text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => order.id && handleDeleteOrder(order.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredOrders.length === 0 && (
            <Card className="border-0 shadow-soft">
              <CardContent className="p-12 text-center">
                <div className="text-muted-foreground mb-4">
                  <Clock className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                  <p>No orders match your current filters.</p>
                </div>
                <Link to="/create-order">
                  <Button variant="luxury">
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Order
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Orders;