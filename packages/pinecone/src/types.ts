export type PineconeVector = {
  id: string;
  values: number[];
  metadata: {
    card: string;
    text: string;
    url: string;
  };
};
