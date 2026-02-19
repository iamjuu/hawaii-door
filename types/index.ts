export type ApiResponse<T = unknown> = {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
};

export type WithTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export type UserRole = "user" | "admin";

export interface IUser extends WithTimestamps {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  emailVerified: boolean;
  registered: boolean; // true when user completed initial signup process
  verificationToken?: string | null;
  phone?: string;
  imageUrl?: string;
  addresses?: Array<{
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  }>;
  // Keep address for backward compatibility
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
}

export interface IAdministrator extends WithTimestamps {
  _id: string;
  name: string;
  email: string;
  password: string;
  imageUrl?: string;
}

export interface Product extends WithTimestamps {
  _id: string;
  name: string;
  description?: string;
  category: DoorCategory;
  doorType: InteriorDoorType | ExteriorDoorType;
  skuCode?: string;
  inStock?: boolean;
  imageUrl: string; // Single image URL (relative path)
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus =
  | "pending"
  | "paid"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface Order extends WithTimestamps {
  _id: string;
  userId: string;
  items: OrderItem[];
  amount: number;
  currency: string;
  status: OrderStatus;
  paymentProvider?: string;
  paymentRef?: string;
}

export type DoorCategory = "interior" | "exterior";

export type InteriorDoorType =
  | "Interior Panel Doors"
  | "Bifold Doors"
  | "Primed Interior Panel Doors"
  | "Primed Bifold Doors"
  | "Louver Doors and Bifold Doors"
  | "Interior Barn Doors"
  | "Interior French Doors"
  | "Primed Interior French Doors"
  | "20-Minute Fire Doors"
  | "20-Minute Fire Doors Primed";

export type ExteriorDoorType =
  | "Contemporary Collection"
  | "Craftsman Collection"
  | "Exterior French Doors"
  | "Waterbarrier"
  | "Entry Doors"
  | "Half Lite Doors"
  | "Exterior Panel Doors";

// Gallery model for gallery collection
export interface GalleryItem extends WithTimestamps {
  _id: string;
  name: string;
  category: "interior" | "exterior"; // Product Type
  subCategory: "Single" | "Double" | "Barn" | "Dutch"; // Main Category
  hasGlass: boolean; // With Glass (true) or Without Glass (false)
  imageUrl: string; // Single image URL (relative path)
}

// Door model for gallery collection - simpler schema (deprecated, kept for backward compatibility)
export interface Door extends WithTimestamps {
  _id: string;
  name?: string;
  type: "normal" | "glass" | "interior" | "exterior";
  category?: string;
  imageUrl: string; // Single image URL (relative path)
}
