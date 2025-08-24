export default function Head() {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Ưu tiên SVG, vẫn giữ .ico để tránh 404 từ trình duyệt */}
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="alternate icon" href="/favicon.ico" />
      {/* Theme color cho light/dark */}
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#0a0a0a" />
    </>
  );
}