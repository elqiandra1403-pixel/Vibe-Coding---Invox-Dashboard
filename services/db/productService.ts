import { ProductRow } from '@/types/database';

export class ProductService {
  private static products: ProductRow[] = [];

  static async getProducts(userId: string): Promise<ProductRow[]> {
    return this.products.filter(p => p.user_id === userId && p.is_active);
  }

  static async createProduct(userId: string, data: Omit<ProductRow, 'id' | 'user_id' | 'is_active' | 'created_at' | 'updated_at'>): Promise<ProductRow> {
    const newProduct: ProductRow = {
      id: `prod-${Date.now()}`,
      user_id: userId,
      ...data,
      is_active: true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    this.products.push(newProduct);
    return newProduct;
  }
}
