export type UF = 'SP' | 'RJ' | 'ES' | 'MG';

export type User = {
  _id: string;
  email: string;
  firstName: string;
  friendIds: string[];
  lastName: string;
  password: string;
  phone: string;
  username: string;
  age: number;
  UF: UF;
  shareInfoWithPublic: boolean;
};

export type FriendDisplayData = {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
};
