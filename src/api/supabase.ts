import { Match } from "@/models/Match";
import { Squad } from "@/models/Squad";
import supabase from "@/supabase/supabase"

export const getAllSquads = async () => {
    const response = await supabase.from('squads').select('*');
    return response.data ?? [];
}

export const getAllCategories = async () => {
    const response = await supabase.from('squads').select('category');

    // Recupera le singole categorie dalla risposta della query e rimuovi i duplicati
    if (response.data) {
        const categories = response.data.map(entry => entry.category);
        const uniqueCategories = categories.filter((category, index) => categories.indexOf(category) === index);
        return uniqueCategories;
    }

    return [];

}

export const getAllDays = async (): Promise<string[]> => {
    const response = await supabase.from('match').select('day');

    // Recupera le singole categorie dalla risposta della query e rimuovi i duplicati
    if (response.data) {
        const days = response.data.map(entry => entry.day);
        const uniqueDays = days.filter((day, index) => days.indexOf(day) === index);
        return uniqueDays;
    }

    return [];

}

export const getAllSquadsByCategory = async (category: string) : Promise<Squad[]> => {
    const response = await supabase
        .from('squads')
        .select('id, name')
        .eq('category', category);
    return response.data ?? [];
}

export const getAllSquadsByGroup = async (group: string) => {
    const response = await supabase
        .from(`group_${group}`)
        .select('id, squad_id(*)')
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

export const updateSquad = async (tableName: string, newData: string, recordId: string) => {
    const response = await supabase
        .from(tableName)
        .update(newData)
        .eq('id', recordId);
    return response.data ?? [];
}

export const updateResult = async (id: string, score_home: string, score_away: string, outcome:string) => {
    const response = await supabase
        .from('match')
        .update({score_home, score_away, outcome})
        .eq('id', id);
}