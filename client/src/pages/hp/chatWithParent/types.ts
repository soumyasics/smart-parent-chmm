export interface ParentData {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  dateOfBirth: string;
  profilePicture: any;
}


export interface ChatMessage {
  HPId: string;
  conversationId: string;
  createdAt: string;
  lastUpdated: string;
  message: string;
  parentId: string;
  receiverType: "parent" | "hp";
  senderType: "hp" | "parent";
  updatedAt: string;
  __v: number;
  _id: string;
}
