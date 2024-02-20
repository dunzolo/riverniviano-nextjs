import { dateFormat } from '../utils/utils';
export type Match = MatchDatum[]

export interface MatchDatum {
    id: string
    created_at: string
    day: string
    squad_home: SquadHome
    squad_away: SquadAway
    score_home: any
    score_away: any
    outcome: any
    hour: string
    field: string
}

export interface SquadHome {
    id: string
    logo: string
    name: string
    group: string
    category: string
    created_at: string
}

export interface SquadAway {
    id: string
    logo: string
    name: string
    group: string
    category: string
    created_at: string
}