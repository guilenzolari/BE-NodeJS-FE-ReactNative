export type UF = 'SP' | 'RJ' | 'ES' | 'MG';

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  age: number;
  UF: UF;
  friendIds: number[];
  shareInfoWithFriends: boolean;
  shareInfoWithPublic: boolean;
};
