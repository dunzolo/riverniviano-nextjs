import { Squad } from './Squad';
export type Match = MatchDatum[]

export interface MatchDatum {
    id: string
    created_at: string
    day: string
    squad_home: Squad
    squad_away: Squad
    score_home: number
    score_away: number
    outcome: string
    hour: string
    field: string
}

export interface MatchFirstGame {
    id: string
    created_at: string
    date: string
    squad_home: Squad
    squad_away: Squad
    hour: string
}

export interface MatchSecondGame {
    id: string
    created_at: string
    date: string
    squad: Squad
    field: string
    hour: string
}