import { getAllDays, getMatchesByDate } from "@/api/supabase";
import AppResult from "@/components/AppResult";
import { Days } from "@/models/Days";
import { MatchDatum } from "@/models/Match";
import { dateFormat } from "@/utils/utils";
import { GetServerSideProps } from "next";
import { useState } from "react";

type Props = {
    days: Days
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const days = await getAllDays();
        return {
            props: {
                days,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};


export default function Update({ days }: Props) {
    const [selectedDay, setSelectedDay] = useState<MatchDatum[]>([]);

    const handleSelectDay = async (e: any) => {
        const data = await getMatchesByDate(e.target.value);
        setSelectedDay(data);
    };

    return (
        <div>
            <h1>Inserisci risultato</h1>
            <form action="">
                <select onChange={handleSelectDay}>
                    <option value="">Seleziona la giornata</option>
                    {
                        days.map(day => {
                            return (
                                <option key={day} value={day}>{dateFormat(day)}</option>
                            )
                        })
                    }
                </select>
            </form>
            {/* <pre>{JSON.stringify(selectedDay, null, 2)}</pre> */}
            <form action="">
                {
                    selectedDay.map((item) => {
                        return <AppResult key={item.id} item={item} />
                    })
                }
            </form>
        </div>
    )
}