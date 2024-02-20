import { getAllDays, getMatchesByDate } from "@/api/supabase";
import AppResult from "@/components/AppResult";
import { MatchDatum } from "@/models/Match";
import { dateFormat } from "@/utils/utils";
import { GetServerSideProps } from "next";
import React, { useState } from "react";

type Props = {
    days: string[]
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

    const handleSelectDay = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const data = await getMatchesByDate(event.target.value);
        setSelectedDay(data);
    };

    return (
        <div>
            <h1>Inserisci risultato</h1>
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
            {/* <pre>{JSON.stringify(selectedDay, null, 2)}</pre> */}
            {
                selectedDay.map((item) => {
                    return <AppResult key={item.id} item={item} />
                })
            }
        </div>
    )
}