import { MatchDatum } from "@/models/Match"

type Props = {
    item: MatchDatum
}

const AppResult: React.FC<Props> = ({ item }) => {

    return (
        <div>
            <h3>{item.hour}</h3>
            <span>{item.squad_home.name}</span>
            <span>
                <input type="text" /> - <input type="text" />
            </span>
            <span>{item.squad_away.name}</span>
        </div>
    )
}

export default AppResult;