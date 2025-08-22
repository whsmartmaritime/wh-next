export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="py-6 px-4 border-t border-gray-200 text-gray-600 text-center">
      © {year} WH. All rights reserved.
    </footer>
  );
}
