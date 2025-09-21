"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

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
    <select
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
      className="p-2 rounded-md bg-neutral-200 dark:bg-neutral-800 shadow-md text-sm"
      aria-label="Select Theme"
    >
      <option value="system">Auto</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  );
}
