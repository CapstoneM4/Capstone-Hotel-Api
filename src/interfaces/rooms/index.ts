export interface IRommsrequest {
  roomNumber: number;
  floorNumber: number;
  price: number;
  isClean: boolean;
  isAvailable: boolean;
}

export interface IRommsupdate {
  price?: number;
  isClean?: boolean;
  isAvailable?: boolean;
}
