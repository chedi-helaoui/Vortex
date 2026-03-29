import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  selectedSize?: string | null;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id?: string;
  userId: string;
  userEmail: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  subtotal: number;
  total: number;
  paymentMethod: string;
  createdAt?: Timestamp;
}

/** Create a new order in Firestore. Returns the generated order ID. */
export async function createOrder(order: Omit<Order, "id" | "createdAt">): Promise<string> {
  const docRef = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/** Get all orders for a specific user, sorted by newest first. */
export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
}

/** Get all orders (admin only — enforced by Firestore rules). */
export async function getAllOrders(): Promise<Order[]> {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Order));
}
