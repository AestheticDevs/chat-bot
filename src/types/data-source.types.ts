export interface ListDocumentInCollectionResult {
  id_collection: string;
  collection_name: string;
  documents: Documents[];
  total: number;
  message: string;
}

export interface Documents {
  id: number;
  filename: string;
  file_type: string;
  upload_date: null;
  file_size: null;
  processing_status: "processing" | "completed";
  metadata: Metadata;
}

export interface Metadata {
  note: string;
  points_count: number;
  vector_store: string;
  status: string;
}

export interface CreateDataSourceResult {
  success: boolean;
  message: string;
  id_collection: string;
  collection_name: string;
  filename: string;
  file_size_mb: number;
  vector_store: string;
  status: string;
  processing_url: string;
}
