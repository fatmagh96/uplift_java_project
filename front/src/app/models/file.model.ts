// file.model.ts
export class File {
    id?: number;  // It's optional because it will be assigned by the backend
    path?: string;
    productId?: number; // Assuming you only need to hold a reference to the product ID
    createdAt?: Date;
    updatedAt?: Date;
  
    // constructor(path: string, productId?: number) {
    //   this.path = path;
    //   this.productId = productId;
    // }
  }