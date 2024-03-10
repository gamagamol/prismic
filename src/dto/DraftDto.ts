/** @format */

export type documentDto = {
  title: string;
  content: string;
  creator_id?: number;
  created_at?: string;
  updated_at?: string | null;
  author_id?: number | null;
  current_version: number;
  history?: document[];
};

export type document = {
  title: string;
  content: string;
  creator_id?: number;
  created_at: string;
  updated_at?: string;
  author_id?: number;
  current_version: number;
};
