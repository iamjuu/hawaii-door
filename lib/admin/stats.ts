import connectDB from "@/lib/mongodb";
import Order from "@/models/Order";
import User from "@/models/User";
import Product from "@/models/Product";

export type DashboardStats = {
  revenue: {
    orders: number;
    total: number;
  };
  orders: {
    total: number;
    pending: number;
    paid: number;
    cancelled: number;
  };
  users: {
    total: number;
    verified: number;
  };
  products: {
    total: number;
  };
  recentOrders: any[];
  revenueData: { date: string; revenue: number; orders: number }[];
  orderStatusData: { name: string; value: number; color: string }[];
  productSalesData: { name: string; sales: number; revenue: number }[];
  userData: { date: string; count: number }[];
  ordersData: { date: string; paid: number; pending: number; cancelled: number }[];
};

export async function getDashboardStats(): Promise<DashboardStats> {
  await connectDB();

  const [orders, users, totalUsers, verifiedUsers, totalProducts] = await Promise.all([
    Order.find().lean(),
    User.find().lean(),
    User.countDocuments(),
    User.countDocuments({ emailVerified: true }),
    Product.countDocuments(),
  ]);

  const totalRevenue = orders.filter((o) => o.status === "paid").reduce((sum, o) => sum + o.amount, 0);

  const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(10).lean();

  // Generate revenue data for last 30 days
  const revenueData: { date: string; revenue: number; orders: number }[] = [];
  const today = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    
    const dayOrders = orders.filter((o: any) => {
      const orderDate = new Date(o.createdAt).toISOString().split("T")[0];
      return orderDate === dateStr && o.status === "paid";
    });
    
    const dayOrderRevenue = dayOrders.reduce((sum: number, o: any) => sum + o.amount, 0);
    
    revenueData.push({
      date: dateStr,
      revenue: dayOrderRevenue,
      orders: dayOrders.length,
    });
  }

  // Order status data for pie chart
  const orderStatusData = [
    { name: "Paid", value: orders.filter((o) => o.status === "paid").length, color: "#10b981" },
    { name: "Pending", value: orders.filter((o) => o.status === "pending").length, color: "#f59e0b" },
    { name: "Cancelled", value: orders.filter((o) => o.status === "cancelled").length, color: "#ef4444" },
  ].filter((item) => item.value > 0);

  // Product sales data (top products by revenue)
  const productSalesMap = new Map<string, { sales: number; revenue: number }>();
  orders.filter((o: any) => o.status === "paid").forEach((order: any) => {
    order.items?.forEach((item: any) => {
      const existing = productSalesMap.get(item.name) || { sales: 0, revenue: 0 };
      productSalesMap.set(item.name, {
        sales: existing.sales + item.quantity,
        revenue: existing.revenue + item.price * item.quantity,
      });
    });
  });
  const productSalesData = Array.from(productSalesMap.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 10);

  // Generate user growth data for last 14 days
  const userData: { date: string; count: number }[] = [];
  for (let i = 13; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    
    const dayUsers = (users as any[]).filter((u: any) => {
      const userDate = new Date(u.createdAt).toISOString().split("T")[0];
      return userDate === dateStr;
    });
    
    userData.push({ date: dateStr, count: dayUsers.length });
  }

  // Generate orders data for last 30 days
  const ordersData: { date: string; paid: number; pending: number; cancelled: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    
    const dayOrders = orders.filter((o: any) => {
      const orderDate = new Date(o.createdAt).toISOString().split("T")[0];
      return orderDate === dateStr;
    });
    
    const paidCount = dayOrders.filter((o: any) => o.status === "paid").length;
    const pendingCount = dayOrders.filter((o: any) => o.status === "pending").length;
    const cancelledCount = dayOrders.filter((o: any) => o.status === "cancelled").length;
    
    ordersData.push({ 
      date: dateStr, 
      paid: paidCount,
      pending: pendingCount,
      cancelled: cancelledCount
    });
  }

  return {
    revenue: {
      orders: totalRevenue,
      total: totalRevenue,
    },
    orders: {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      paid: orders.filter((o) => o.status === "paid").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
    },
    users: {
      total: totalUsers,
      verified: verifiedUsers,
    },
    products: {
      total: totalProducts,
    },
    recentOrders,
    revenueData,
    orderStatusData,
    productSalesData,
    userData,
    ordersData,
  };
}



