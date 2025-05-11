type RulingMetadata = {
  ruling_type: string | null;
  involved_cards: string[];
};

export type CardRuling = {
  card: string | null;
  content: string;
  metadata: RulingMetadata;
};
