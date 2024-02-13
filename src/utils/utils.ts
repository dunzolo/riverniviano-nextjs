export const dateFormat = (date: string) => {
    const data = new Date(date);

    const opzioni = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
    const dataFormattata = data.toLocaleDateString('it-IT', opzioni);

    // Trasformare la prima lettera del giorno in maiuscolo
    const dataFormattataCapitalized = dataFormattata.charAt(0).toUpperCase() + dataFormattata.slice(1);

    return dataFormattataCapitalized;
}