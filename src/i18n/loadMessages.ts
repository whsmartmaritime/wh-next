// Static JSON imports (no fs) so it works on Edge/Serverless and during SSG
// EN
import en_about from "@messages/en/about.json";
import en_entry from "@messages/en/entry.json";
import en_footer from "@messages/en/footer.json";
import en_header from "@messages/en/header.json";
import en_home from "@messages/en/home.json";
import en_menu from "@messages/en/menu.json";
import en_services from "@messages/en/services.json";
import en_solutions_index from "@messages/en/solutions.json";
import en_solutions_connectivity from "@messages/en/solutions/connectivity.json";
import en_solutions_enavigation from "@messages/en/solutions/e-navigation.json";
import en_solutions_gmdss from "@messages/en/solutions/gmdss.json";
import en_solutions_navigation from "@messages/en/solutions/navigation.json";

// VI
import vi_about from "@messages/vi/about.json";
import vi_entry from "@messages/vi/entry.json";
import vi_footer from "@messages/vi/footer.json";
import vi_header from "@messages/vi/header.json";
import vi_home from "@messages/vi/home.json";
import vi_menu from "@messages/vi/menu.json";
import vi_services from "@messages/vi/services.json";
import vi_solutions_index from "@messages/vi/solutions.json";
import vi_solutions_connectivity from "@messages/vi/solutions/connectivity.json";
import vi_solutions_enavigation from "@messages/vi/solutions/e-navigation.json";
import vi_solutions_gmdss from "@messages/vi/solutions/gmdss.json";
import vi_solutions_navigation from "@messages/vi/solutions/navigation.json";

const MAP: Record<string, Record<string, unknown>> = {
  en: {
    about: en_about,
    entry: en_entry,
    footer: en_footer,
    header: en_header,
    home: en_home,
    menu: en_menu,
    services: en_services,
    solutions: en_solutions_index,
    "solutions/connectivity": en_solutions_connectivity,
    "solutions/e-navigation": en_solutions_enavigation,
    "solutions/gmdss": en_solutions_gmdss,
    "solutions/navigation": en_solutions_navigation,
  },
  vi: {
    about: vi_about,
    entry: vi_entry,
    footer: vi_footer,
    header: vi_header,
    home: vi_home,
    menu: vi_menu,
    services: vi_services,
    solutions: vi_solutions_index,
    "solutions/connectivity": vi_solutions_connectivity,
    "solutions/e-navigation": vi_solutions_enavigation,
    "solutions/gmdss": vi_solutions_gmdss,
    "solutions/navigation": vi_solutions_navigation,
  },
};

export async function loadMessages(
  locale: string
): Promise<Record<string, unknown>> {
  const m = MAP[locale];
  if (!m) throw new Error(`Không tìm thấy messages cho locale: ${locale}`);
  return m;
}
