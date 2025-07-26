export interface Collection {
  id_collection: string;
  name: string;
  status: string;
}

export interface ListCollectionResult {
  result: {
    collections: Collection[];
  };
  status: string;
  time: number;
  total_collection: number;
}
