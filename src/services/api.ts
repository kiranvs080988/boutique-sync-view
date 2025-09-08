const API_BASE_URL = 'http://localhost:8000';

// Types for the API responses
export interface Client {
  id?: number;
  name: string;
  mobile_number: string;
  email?: string;
  address?: string;
}

export interface WorkOrder {
  id?: number;
  client_id: number;
  client?: Client;
  order_date?: string;
  expected_delivery_date: string;
  status: 'Order Placed' | 'Started' | 'Finished' | 'Delivered - Fully Paid' | 'Delivered – Payment Pending';
  description?: string;
  advance_amount?: number;
  estimated_amount?: number;
  actual_amount?: number;
  due_amount?: number;
  is_overdue?: boolean;
}

export interface CreateWorkOrderRequest {
  client: Omit<Client, 'id'>;
  expected_delivery_date: string;
  description?: string;
  advance_amount?: number;
  estimated_amount?: number;
}

export interface DashboardSummary {
  total_work_orders: number;
  active_work_orders: number;
  overdue_work_orders: number;
  orders_due_in_1_day: number;
}

// API service class
class ApiService {
  // Work Orders
  async createWorkOrder(data: CreateWorkOrderRequest): Promise<WorkOrder> {
    const response = await fetch(`${API_BASE_URL}/work-orders/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create work order');
    return response.json();
  }

  async getAllWorkOrders(): Promise<WorkOrder[]> {
    const response = await fetch(`${API_BASE_URL}/work-orders/`);
    if (!response.ok) throw new Error('Failed to fetch work orders');
    return response.json();
  }

  async getWorkOrder(id: number): Promise<WorkOrder> {
    const response = await fetch(`${API_BASE_URL}/work-orders/${id}`);
    if (!response.ok) throw new Error('Failed to fetch work order');
    return response.json();
  }

  async updateWorkOrder(id: number, data: Partial<WorkOrder>): Promise<WorkOrder> {
    const response = await fetch(`${API_BASE_URL}/work-orders/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to update work order');
    return response.json();
  }

  async deleteWorkOrder(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/work-orders/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete work order');
  }

  async getPriorityOrders(sortOrder: 'asc' | 'desc' = 'asc'): Promise<WorkOrder[]> {
    const response = await fetch(`${API_BASE_URL}/work-orders/priority?sort_order=${sortOrder}`);
    if (!response.ok) throw new Error('Failed to fetch priority orders');
    return response.json();
  }

  async filterOrders(params: {
    delivery_date?: string;
    delivery_window_start?: string;
    delivery_window_end?: string;
    overdue_only?: boolean;
  }): Promise<WorkOrder[]> {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    
    const response = await fetch(`${API_BASE_URL}/work-orders/filter?${searchParams}`);
    if (!response.ok) throw new Error('Failed to filter orders');
    return response.json();
  }

  // Clients
  async createClient(client: Omit<Client, 'id'>): Promise<Client> {
    const response = await fetch(`${API_BASE_URL}/clients/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(client),
    });
    if (!response.ok) throw new Error('Failed to create client');
    return response.json();
  }

  async getAllClients(): Promise<Client[]> {
    const response = await fetch(`${API_BASE_URL}/clients/`);
    if (!response.ok) throw new Error('Failed to fetch clients');
    return response.json();
  }

  async getClientSummary(clientId: number): Promise<{ client: Client; work_orders: WorkOrder[] }> {
    const response = await fetch(`${API_BASE_URL}/clients/summary/${clientId}`);
    if (!response.ok) throw new Error('Failed to fetch client summary');
    return response.json();
  }

  async getClientSummaryByMobile(mobile: string): Promise<{ client: Client; work_orders: WorkOrder[] }> {
    const response = await fetch(`${API_BASE_URL}/clients/summary/mobile/${mobile}`);
    if (!response.ok) throw new Error('Failed to fetch client summary');
    return response.json();
  }

  // Dashboard
  async getDashboardSummary(): Promise<DashboardSummary> {
    const response = await fetch(`${API_BASE_URL}/dashboard/summary`);
    if (!response.ok) throw new Error('Failed to fetch dashboard summary');
    return response.json();
  }
}

export const apiService = new ApiService();