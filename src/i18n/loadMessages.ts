// Static JSON imports (no fs) so it works on Edge/Serverless and during SSG
// EN
import en_about from '@messages/en/about.json';
import en_common from '@messages/en/common.json';
import en_entry from '@messages/en/entry.json';
import en_home from '@messages/en/home.json';
import en_services from '@messages/en/services.json';
import en_solutions_connectivity from '@messages/en/solutions/connectivity.json';
import en_solutions_enavigation from '@messages/en/solutions/e-navigation.json';
import en_solutions_gmdss from '@messages/en/solutions/gmdss.json';
import en_solutions_navigation from '@messages/en/solutions/navigation.json';
import en_solutions_index from '@messages/en/solutions.json';

// VI
import vi_about from '@messages/vi/about.json';
import vi_common from '@messages/vi/common.json';
import vi_entry from '@messages/vi/entry.json';
import vi_home from '@messages/vi/home.json';
import vi_services from '@messages/vi/services.json';
import vi_solutions_connectivity from '@messages/vi/solutions/connectivity.json';
import vi_solutions_enavigation from '@messages/vi/solutions/e-navigation.json';
import vi_solutions_gmdss from '@messages/vi/solutions/gmdss.json';
import vi_solutions_navigation from '@messages/vi/solutions/navigation.json';
import vi_solutions_index from '@messages/vi/solutions.json';

const MAP: Record<string, Record<string, unknown>> = {
	en: {
		about: en_about,
		common: en_common,
		entry: en_entry,
		home: en_home,
		services: en_services,
		solutions: en_solutions_index,
		'solutions/connectivity': en_solutions_connectivity,
		'solutions/e-navigation': en_solutions_enavigation,
		'solutions/gmdss': en_solutions_gmdss,
		'solutions/navigation': en_solutions_navigation,
	},
	vi: {
		about: vi_about,
		common: vi_common,
		entry: vi_entry,
		home: vi_home,
		services: vi_services,
		solutions: vi_solutions_index,
		'solutions/connectivity': vi_solutions_connectivity,
		'solutions/e-navigation': vi_solutions_enavigation,
		'solutions/gmdss': vi_solutions_gmdss,
		'solutions/navigation': vi_solutions_navigation,
	},
};

export async function loadMessages(
	locale: string,
): Promise<Record<string, unknown>> {
	const m = MAP[locale];
	if (!m) throw new Error(`Không tìm thấy messages cho locale: ${locale}`);
	return m;
}
