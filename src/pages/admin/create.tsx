import { useState } from "react";
import { createMatch, getAllCategories, getAllSquadsByCategory } from "@/api/supabase";
import { GetServerSideProps } from "next";
import { Category } from "@/models/category";

type Props = {
    categories: any
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const categories = await getAllCategories();
        return {
            props: {
                categories,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};

export default function Create({ categories }: Props) {
    const [date, setDate] = useState('');
    const [hour, setHour] = useState('');
    const [selectedSquadHome, setSelectedSquadHome] = useState('');
    const [selectedSquadAway, setSelectedSquadAway] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [subcategories, setSubcategories] = useState<Category[]>([]);
    const [field, setField] = useState('');

    async function handleSubmitMatch(e: any) {
        e.preventDefault();
        await createMatch(date, hour, selectedSquadHome, selectedSquadAway, field)
    }

    const handleSelectCategory = async (e: any) => {
        const category = e.target.value;
        setSelectedCategory(category);

        const data = await getAllSquadsByCategory(category);
        setSubcategories(data);
    };

    const handleSelectField = async (e: any) => {
        const category = e.target.value;
        setField(category);
    };

    const handleSelectedSquadHome = async (e: any) => {
        setSelectedSquadHome(e.target.value);
    };

    const handleSelectedSquadAway = async (e: any) => {
        setSelectedSquadAway(e.target.value);
    };

    return (
        <div>
            <h1>Crea Match</h1>
            <pre>{JSON.stringify(categories, null, 2)}</pre>
            <form action="" onSubmit={(e) => handleSubmitMatch(e)}>
                <div>
                    <select value={selectedCategory} onChange={handleSelectCategory}>
                        <option value="">Seleziona una categoria</option>
                        {
                            categories.map(category => {
                                return (
                                    <option key={category} value={category}>{category}</option>
                                )
                            })
                        }
                    </select>
                    <input placeholder="Data" type="date" value={date || ''} onChange={(e: any) => setDate(e.target.value)} />
                    <input placeholder="Orario" type="time" value={hour || ''} onChange={(e: any) => setHour(e.target.value)} />
                    <select value={field} onChange={handleSelectField}>
                        <option value="Campo 1">Campo 1</option>
                        <option value="Campo 2">Campo 2</option>

                    </select>
                </div>

                <div>
                    <select value={selectedSquadHome} onChange={handleSelectedSquadHome}>
                        <option value="">Seleziona una subcategoria</option>
                        {subcategories.map((subcategory, index) => (
                            <option key={index} value={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </select>

                    <select value={selectedSquadAway} onChange={handleSelectedSquadAway}>
                        <option value="">Seleziona una subcategoria</option>
                        {subcategories.map((subcategory, index) => (
                            <option key={index} value={subcategory.id}>{subcategory.name}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}