/** @format */

export type PublishDto = {
  draft_id: string;
  draft_version: number;
  title: string;
  content: string;
  creator_id?: number;
  created_at?: string;
  updated_at?: string | null;
  current_version: number;
  history?: Publish[];
};

export type Publish = {
  draft_id: string;
  title: string;
  content: string;
  creator_id?: number;
  created_at: string;
  updated_at?: string;
  current_version: number;
  draft_version: number;
};
