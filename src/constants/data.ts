import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Tornei",
    href: "/admin/tournaments",
    icon: "trophy",
    label: "squadre",
  },
  {
    title: "Match",
    href: "/admin/match",
    icon: "match",
    label: "match",
  },
  {
    title: "Associazioni",
    href: "/admin/companies",
    icon: "company",
    label: "squadre",
  },
  {
    title: "Squadre",
    href: "/admin/squad",
    icon: "groups",
    label: "squadre",
  },
];

export const footerAdminItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Aggiungi",
    href: "/admin/match/update",
    icon: "pencil",
    label: "Aggiungi",
  },
];
