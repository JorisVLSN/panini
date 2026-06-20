export type Sticker = {
  id: string;
  country: string;
  number: number;
  duplicates: number;
};

export type TradeLogItem = {
  id: string;
  stickerId: string;
  country: string;
  number: number;
  delta: number;
  note?: string;
  createdAt: string;
};
