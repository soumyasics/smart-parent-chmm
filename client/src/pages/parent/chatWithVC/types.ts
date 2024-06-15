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

export interface VCData {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  category: string;
  profilePicture: any;
}

export interface ChatMessage {
  VCId: string;
  conversationId: string;
  createdAt: string;
  lastUpdated: string;
  message: string;
  parentId: string;
  receiverType: "parent" | "vc";
  senderType: "vc" | "parent";
  updatedAt: string;
  __v: number;
  _id: string;
}
