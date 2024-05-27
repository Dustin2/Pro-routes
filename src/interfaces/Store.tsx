export interface Store {
  id: string;
  storeName: string;
  codeName: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  createdDoc: any; // Ajusta el tipo según sea necesario
}
