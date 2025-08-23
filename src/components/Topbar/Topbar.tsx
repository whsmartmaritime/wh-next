import Link from 'next/link';

export default function Topbar() {
  return (
    <div className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-200 text-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-1.5">
        {/* Logo hoặc tên site */}
        <Link href="/home" className="font-bold tracking-tight text-gray-900 hover:text-black text-base">
          WH
        </Link>
        {/* Hotline hoặc thông tin liên hệ */}
        <div className="hidden md:block text-gray-600">
          Hotline: <a href="tel:0123456789" className="font-semibold text-blue-600 hover:underline">0123 456 789</a>
        </div>
        {/* Social hoặc nút hành động */}
        <div className="flex items-center gap-3">
          <a href="https://facebook.com" target="_blank" rel="noopener" aria-label="Facebook" className="hover:text-blue-600">
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0"/></svg>
          </a>
          <a href="mailto:info@wh.com" className="hover:text-blue-600" aria-label="Email">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.876 1.8l-7.125 5.7a2.25 2.25 0 01-2.748 0l-7.125-5.7a2.25 2.25 0 01-.876-1.8V6.75"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}
