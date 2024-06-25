import { Timestamp } from "react-native-reanimated/lib/typescript/reanimated2/commonTypes";

export interface Store {
  id: string;
  storeName: string;
  codeName: string;
  latitude: number;
  longitude: number;
  phoneNumber: string;
  createdDoc: Timestamp; // Ajusta el tipo según sea necesario
  freezerSize: string;
  FrezzerAmount: number;
  daysOfWeek: number;
  visitBeforeOf: Date;
}
