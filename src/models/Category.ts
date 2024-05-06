import { Tournament } from "./Tournament";

export interface Category {
    id: string;
    created_at: string;
    name: string;
    description: string;
    type: string;
    tournament_id: Tournament;
  }
  