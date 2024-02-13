import { Inter } from "next/font/google";
import supabase from '../supabase/supabase'
import { useState } from "react";
import { GetServerSideProps } from "next";
import { getAllCategories, getAllSquadsByCategory } from "@/api/supabase";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  // async function handleUpdate(e) {
  //   e.preventDefault();
  //   const { data, error } = await supabase.from("squads").update({ name: name }).eq('id', squadId);
  // }
  return (
    <div>
      {/* <h1>Ciao!</h1> */}
      {/* <pre>{JSON.stringify(categories, null, 2)}</pre> */}

      {/* <h2>Inserisci</h2>
      <form action="" onSubmit={(e) => handleSubmit(e)}>
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


          <select>
            <option value="">Seleziona una subcategoria</option>
            {subcategories.map((subcategory, index) => (
              <option key={index} value={subcategory.id}>{subcategory.name}</option>
              //<pre>{JSON.stringify(subcategory, null, 2)}</pre>
            ))}
          </select>

          <select>
            <option value="">Seleziona una subcategoria</option>
            {subcategories.map((subcategory, index) => (
              <option key={index} value={subcategory.name}>{subcategory.name}</option>
              //<pre>{JSON.stringify(subcategory, null, 2)}</pre>
            ))}
          </select>
        </div>

        <input placeholder="Nome della squadra" type="text" value={name || ''} onChange={(e) => setText(e.target.value)} />
        <input placeholder="Categoria" type="text" value={category || ''} onChange={(e) => setCategory(e.target.value)} />
        <button type="submit">Submit</button>
      </form> */}

      {/* <h2>Modifica</h2>
      <form action="" onSubmit={(e) => handleUpdate(e)}>
        <input type="text" placeholder="Nome" value={name || ''} onChange={(e) => setText(e.target.value)} />
        <input type="text" placeholder="Id" value={squadId || ''} onChange={(e) => setSquadId(e.target.value)} />
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
}

