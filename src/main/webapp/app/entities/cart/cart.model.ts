export interface ICart {
  id: number;
  userID?: number | null;
  productID?: number | null;
  productName?:string |null;
  quantity?: number | null;
}

export type NewCart = Omit<ICart, 'id'> & { id: null };
