import Link from 'next/link';

interface NavProps {
	locale: string;
}

export default async function NavMenu({ locale }: NavProps) {
	const commonMessages = (await import(`@messages/${locale}/common.json`))
		.default;
	return (
		<ul aria-label="Main menu" className="flex">
			<li className="relative group p-6">
				<Link
					href={`/${locale}${commonMessages.nav.solutions.href}`}
					className=" font-semibold"
				>
					{commonMessages.nav.solutions.label}
				</Link>
				<ul className="absolute uppercase left-0 mt-2 w-40 border bg-white opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
					<li>
						<Link
							href={`/${locale}${commonMessages.nav.solutions.items.navigation.href}`}
							className="block px-4 py-2 hover:bg-gray-100"
						>
							{commonMessages.nav.solutions.items.navigation.label}
						</Link>
					</li>
					<li>
						<Link
							href={`/${locale}${commonMessages.nav.solutions.items.gmdss.href}`}
							className="block px-4 py-2 hover:bg-gray-100"
						>
							{commonMessages.nav.solutions.items.gmdss.label}
						</Link>
					</li>
					<li>
						<Link
							href={`/${locale}${commonMessages.nav.solutions.items.connectivity.href}`}
							className="block px-4 py-2 hover:bg-gray-100"
						>
							{commonMessages.nav.solutions.items.connectivity.label}
						</Link>
					</li>
					<li>
						<Link
							href={`/${locale}${commonMessages.nav.solutions.items['e-navigation'].href}`}
							className="block px-4 py-2 hover:bg-gray-100"
						>
							{commonMessages.nav.solutions.items['e-navigation'].label}
						</Link>
					</li>
				</ul>
			</li>
			<li className="relative group p-6">
				<Link
					href={`/${locale}${commonMessages.nav.services.href}`}
					className="font-semibold"
				>
					{commonMessages.nav.services.label}
				</Link>
				<ul className="absolute uppercase left-0 mt-2 w-40 bg-white border rounded shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity duration-200">
					<li>
						<Link
							href={`/${locale}${commonMessages.nav.services.items.rm.href}`}
							className="block px-4 py-2 hover:bg-gray-100"
						>
							{commonMessages.nav.services.items.rm.label}
						</Link>
					</li>
					<li>
						<Link
							href={`/${locale}${commonMessages.nav.services.items.installation.href}`}
							className="block px-4 py-2 hover:bg-gray-100"
						>
							{commonMessages.nav.services.items.installation.label}
						</Link>
					</li>
					<li>
						<Link
							href={`/${locale}${commonMessages.nav.services.items.annualSurvey.href}`}
							className="block px-4 py-2 hover:bg-gray-100"
						>
							{commonMessages.nav.services.items.annualSurvey.label}
						</Link>
					</li>
				</ul>
			</li>
			<li className="p-6">
				<Link
					href={`/${locale}${commonMessages.nav.about.href}`}
					className="font-semibold"
				>
					{commonMessages.nav.about.label}
				</Link>
			</li>
			<li className="p-6">
				<Link
					href={`/${locale}${commonMessages.nav.contact.href}`}
					className="font-semibold"
				>
					{commonMessages.nav.contact.label}
				</Link>
			</li>
		</ul>
	);
}
