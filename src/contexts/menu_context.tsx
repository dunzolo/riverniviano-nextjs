import {
  getAllCategories,
  getCurrentTournament,
  getTournament,
} from "@/api/supabase";
import { NavItem } from "@/types";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ContextProps {
  menu_items: NavItem[];
  current_tournament: any[];
}

const Context = createContext<ContextProps | undefined>(undefined);

export const MenuContextProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<NavItem[]>([]);
  const [tournament, setTournament] = useState<any[]>([]);

  const router = useRouter();
  const { name } = router.query;

  useEffect(() => {
    const getData = async () => {
      let data: NavItem[] = [
        {
          title: "Categorie",
          href: `/${name}`,
          icon: "user",
          label: "Categorie",
        },
      ];

      setData(data);
    };

    getData();
  }, [name]);

  useEffect(() => {
    const getTournament = async () => {
      const tournament = await getCurrentTournament(name as string);
      setTournament(tournament);
    };

    getTournament();
  }, [name]);

  return (
    <Context.Provider
      value={{ menu_items: data, current_tournament: tournament }}
    >
      {children}
    </Context.Provider>
  );
};

export const useMenuContext = () => {
  const value = useContext(Context);
  if (!value) {
    throw Error(
      "Use menu context can only be used inside a menu context provider"
    );
  }
  return value;
};
