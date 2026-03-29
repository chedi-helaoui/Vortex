import { db } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  QuerySnapshot,
  DocumentData
} from "firebase/firestore";
import { Product } from "@/context/CartContext";

const PRODUCTS_COLLECTION = "products";

// Add a new product (auto-generated ID)
export const createProduct = async (productData: Omit<Product, "id">): Promise<string> => {
  const docRef = await addDoc(collection(db, PRODUCTS_COLLECTION), productData);
  return docRef.id;
};

// Set a product with a specific ID (useful for migrating from static data)
export const setProductWithId = async (id: string, productData: Omit<Product, "id">): Promise<void> => {
  await setDoc(doc(db, PRODUCTS_COLLECTION, id), productData);
};

// Read all products
export const getProducts = async (): Promise<Product[]> => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, PRODUCTS_COLLECTION));
    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() } as Product);
    });
    // Return firestore data if available, else fall back
    if (products.length > 0) return products;
  } catch {
    // Firestore unavailable — fall back to local static data
  }
  // Local fallback so the UI never crashes
  const { products: localProducts } = await import("@/data/products");
  return localProducts;
};

// Read a single product by ID
export const getProductById = async (id: string): Promise<Product | null> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  } else {
    return null;
  }
};

// Update a product
export const updateProduct = async (id: string, productData: Partial<Product>): Promise<void> => {
  const docRef = doc(db, PRODUCTS_COLLECTION, id);
  await updateDoc(docRef, productData);
};

// Delete a product
export const deleteProduct = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, PRODUCTS_COLLECTION, id));
};
