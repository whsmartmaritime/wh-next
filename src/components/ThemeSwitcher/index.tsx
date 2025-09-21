"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LuLaptop, LuSun, LuMoon } from "react-icons/lu";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Tránh lỗi hydration
  useEffect(() => setMounted(true), []);

  // Sync theme với cookie khi thay đổi
  useEffect(() => {
    if (theme) {
      document.cookie = `theme=${theme};path=/;max-age=31536000`; // 1 year
    }
  }, [theme]);

  if (!mounted) return null;

  return (
    <div className="w-full h-16 flex items-center gap-2 px-2 border-t border-b border-neutral-500/20 text-lg lg:text-xl px-4 lg:px-8 text-neutral-500">
      {theme === "light" && <LuSun />}
      {theme === "dark" && <LuMoon />}
      {theme === "system" && <LuLaptop />}
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        className="w-full"
        aria-label="Select Theme"
      >
        <option value="system">Auto</option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}
