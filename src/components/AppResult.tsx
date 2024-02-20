import { updateResult } from "@/api/supabase";
import { MatchDatum } from "@/models/Match"
import { useState } from "react";

type Props = {
    item: MatchDatum
}

const AppResult: React.FC<Props> = ({ item }) => {

    const { squad_home, score_home, squad_away, score_away, hour } = item;

    const [form, setForm] = useState<MatchDatum>({
        id: "",
        created_at: "",
        day: "",
        hour: "",
        squad_home: {
            id: "",
            name: "",
            logo: "",
            group: "",
            category: "",
            created_at: ""
        },
        squad_away: {
            id: "",
            name: "",
            logo: "",
            group: "",
            category: "",
            created_at: ""
        },
        outcome: "",
        score_home: "",
        score_away: "",
        field: ""
    })

    async function handleSubmitResult(event: React.FocusEvent<HTMLFormElement>) {
        event.preventDefault();

        const { score_home, score_away } = form;
        const outcome = `${score_home} - ${score_away}`;

        await updateResult(item.id, score_home, score_away, outcome);
    }

    const handleChangeInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setForm({ ...form, [name]: value })
    }

    return (
        <form action="" onSubmit={handleSubmitResult}>
            <h3>{hour}</h3>
            <span>{squad_home.name}</span>
            <span>
                <input
                    type="text"
                    name="score_home"
                    value={score_home ?? form.score_home}
                    onChange={handleChangeInput}
                />
                -
                <input
                    type="text"
                    name="score_away"
                    value={score_away ?? form.score_away}
                    onChange={handleChangeInput}
                />
            </span>
            <span>{squad_away.name}</span>
            <button type="submit">Submit</button>
        </form>
    )
}

export default AppResult;