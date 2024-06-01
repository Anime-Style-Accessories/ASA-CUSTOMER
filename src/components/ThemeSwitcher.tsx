import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isLight = theme === 'light';

  const switchTheme = useCallback(() => {
    setTheme(isLight ? 'dark' : 'light');
  }, [isLight, setTheme]);

  if (!mounted) return null;

  return (
    <button onClick={switchTheme} className="mb-1">
      {isLight ? <Moon size={24} /> : <Sun size={24} />}
    </button>
  );
};

export default ThemeSwitcher;
