import { Inter } from "next/font/google";
import supabase from '../supabase/supabase'

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {

  const { data: squads } = await supabase.from('squads').select('*');

  return {
    props: {
      squads,
    }
  }
}

export default function Home({ squads }) {
  return (
    <div>
      <h1>Ciao!</h1>
      <pre>{JSON.stringify(squads, null, 2)}</pre>
    </div>
  );
}
