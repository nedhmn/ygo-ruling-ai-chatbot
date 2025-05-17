export interface PineconeVector {
  id: string;
  values: number[];
  metadata: {
    card: string;
    ruling: string;
    title: string;
    url: string;
  };
}
