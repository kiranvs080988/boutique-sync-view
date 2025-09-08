import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  Clock, 
  AlertCircle, 
  CheckCircle,
  Calendar,
  TrendingUp,
  Users,
  Plus
} from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { apiService, DashboardSummary, WorkOrder } from "@/services/api";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [recentOrders, setRecentOrders] = useState<WorkOrder[]>([]);
  const [priorityOrders, setPriorityOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [summaryData, allOrders, priorityData] = await Promise.all([
        apiService.getDashboardSummary(),
        apiService.getAllWorkOrders(),
        apiService.getPriorityOrders('asc')
      ]);
      
      setSummary(summaryData);
      setRecentOrders(allOrders.slice(0, 5)); // Show last 5 orders
      setPriorityOrders(priorityData.slice(0, 5)); // Show top 5 priority orders
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Order Placed': return 'bg-blue-100 text-blue-800';
      case 'Started': return 'bg-yellow-100 text-yellow-800';
      case 'Finished': return 'bg-green-100 text-green-800';
      case 'Delivered - Fully Paid': return 'bg-emerald-100 text-emerald-800';
      case 'Delivered – Payment Pending': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
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
              <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
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
              Work Orders
              <span className="text-gradient"> Dashboard</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage and track all your boutique work orders in one place
            </p>
          </div>
          <Link to="/create-order">
            <Button variant="luxury" size="lg">
              <Plus className="w-5 h-5 mr-2" />
              New Order
            </Button>
          </Link>
        </div>

        {/* Summary Cards */}
        {summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-subtle border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Orders</p>
                    <p className="text-3xl font-bold text-primary">{summary.total_work_orders}</p>
                  </div>
                  <ShoppingBag className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-subtle border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Active Orders</p>
                    <p className="text-3xl font-bold text-secondary">{summary.active_work_orders}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-subtle border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overdue Orders</p>
                    <p className="text-3xl font-bold text-destructive">{summary.overdue_work_orders}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-subtle border-0 shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Due in 1 Day</p>
                    <p className="text-3xl font-bold text-warning">{summary.orders_due_in_1_day}</p>
                  </div>
                  <Clock className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Recent Orders & Priority Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.client?.name} - {order.client?.mobile_number}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {new Date(order.expected_delivery_date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
                {recentOrders.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No recent orders</p>
                )}
              </div>
              <Link to="/orders" className="block mt-4">
                <Button variant="outline" className="w-full">
                  View All Orders
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Priority Orders */}
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Priority Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {priorityOrders.map((order) => (
                  <div key={order.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium">Order #{order.id}</p>
                      <p className="text-sm text-muted-foreground">
                        {order.client?.name}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3" />
                        <p className="text-xs text-muted-foreground">
                          {new Date(order.expected_delivery_date).toLocaleDateString()}
                        </p>
                        {order.is_overdue && (
                          <Badge variant="destructive" className="text-xs">
                            Overdue
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                ))}
                {priorityOrders.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">No priority orders</p>
                )}
              </div>
              <Link to="/orders?filter=priority" className="block mt-4">
                <Button variant="outline" className="w-full">
                  View Priority Orders
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;