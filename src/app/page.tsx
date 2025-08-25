export const dynamic = 'force-dynamic';

export default function Page() {
	// Minimal placeholder home page. The real content lives under app/[locale]/
	// This ensures Next.js treats this file as a module during the build.
	return (
		<main className="min-h-screen flex items-center justify-center">
			<div className="text-center">
				<h1 className="text-2xl font-semibold">Wheelhouse</h1>
				<p className="text-sm text-gray-600">Placeholder root page — localized pages are under /[locale]/</p>
			</div>
		</main>
	);
}
