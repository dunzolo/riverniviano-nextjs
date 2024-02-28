import { Match, MatchDatum } from "@/models/Match";
import { Squad } from "@/models/Squad";
import { supabase } from "@/supabase/supabase"

export const getAllSquads = async () => {
    const response = await supabase.from('squads').select('*');
    return response.data ?? [];
}

/**
 * Recupera le singole categorie dalla risposta della query e rimuovi i duplicati
 * @returns 
 */
export const getAllCategories = async () => {
    const response = await supabase.from('squads').select('category');

    if (response.data) {
        const categories = response.data.map(entry => entry.category);
        const uniqueCategories = categories.filter((category, index) => categories.indexOf(category) === index);
        return uniqueCategories;
    }

    return [];

}

export const getAllDays = async (): Promise<string[]> => {
    const response = await supabase.from('match').select('day');

    if (response.data) {
        const days : string[]= response.data.map(entry => entry.day);
        const uniqueDays = Array.from(new Set(days)).sort();
        return uniqueDays;
    }

    return [];
}

export const getSquadsByCategory = async (category: string) : Promise<Squad[]> => {
    const response = await supabase
        .from('squads')
        .select('*')
        .eq('category', category)
    return response.data ?? [];
}

export const getSquadsByGroup = async (group: string, id? : string) => {

    let query = supabase.from(`group_${group}`).select('*, squad_id(*)').order('id', {ascending: true});

    if(id) query = query.eq('squad_id', id);

    console.log(query)

    const response = await query;
    return response.data ?? [];
}

export const getMatchesByDate = async (date: string): Promise<Match> => {

    const response = await supabase
        .from('match')
        .select('*, squad_home(*), squad_away(*)')
        .eq('day', date)
        .order('id', { ascending: true });

    return response.data ?? [];
}

export const getMatchesBySquad = async (id:string) : Promise<Match> => {
    const response = await supabase
        .from('match')
        .select('*, squad_home(*), squad_away(*)')
        .or(`squad_home.eq.${id}, squad_away.eq.${id}`);

    return response.data ?? [];
}

export const getMatchesWithResult = async () : Promise<MatchDatum[]> => {
    const response = await supabase
        .from('match')
        .select('*, squad_home(*), squad_away(*)')
        .not('score_home', 'is', null)
        .not('score_away', 'is', null)
        .order('id', { ascending: true });

    return response.data ?? [];
}

export const createMatch = async (date: string, hour: string, selectedSquadHome: string, selectedSquadAway: string, field: string) => {
    const response = await supabase
        .from("match")
        .insert([
            {
                day: date,
                hour: hour,
                squad_home: selectedSquadHome,
                squad_away: selectedSquadAway,
                field: field
            }
        ]);
}

/**
 //TODO: gestire il caricamento del logo da pannello admin
 * Crea la squadra con nome, categoria e gruppo
 * NB: il logo è da inserire direttamente da DB
 * @param id 
 * @param name nome della squadra
 * @param category categoria della squadra
 * @param group girone
 * @returns 
 */
export const createSquad = async (id: number, name: string, category: string, group: string) => {
    const response = await supabase
        .from("squads")
        .insert([
            {
                id: id,
                name: name.toUpperCase(),
                category: category,
                group: group.toUpperCase(),
            }
        ]);

        return response
}

export const updateSquad = async (tableName: string, newData: string, recordId: string) => {
    const response = await supabase
        .from(tableName)
        .update(newData)
        .eq('id', recordId);
    return response.data ?? [];
}

export const updateResult = async (id: string, score_home: number, score_away: number, outcome:string) => {
    const response = await supabase
        .from('match')
        .update({score_home, score_away, outcome})
        .eq('id', id);
}

export const updatePointsGroup = async(group: string, id: string, points: number, goal_scored: number, goal_conceded: number, goal_difference: number) => {
    const response = await supabase
        .from(`group_${group}`)
        .update({points, goal_scored, goal_conceded, goal_difference})
        .eq('id', id)
}