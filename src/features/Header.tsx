import { useEffect } from 'react';
import { IoMoonOutline as ThemeIcon } from 'react-icons/io5';

import useThemeStore from '@store/theme';

import Select from '@components/Select';

export default function Header() {
  const { font, mode, setThemeFont, setThemeMode } = useThemeStore();

  function toggleMode() {
    setThemeMode(mode === 'dark' ? 'light' : 'dark');
  }

  useEffect(() => {
    if (mode === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [mode]);

  return (
    <header className="flex items-center justify-between">
      <h1>
        <img src="/logo.svg" alt="" aria-hidden />
        <span className="sr-only">Dictionary Web App</span>
      </h1>

      <div className="flex items-center justify-between gap-4">
        <Select
          id="fontSwitcher"
          value={font}
          onChange={(value) => setThemeFont(value as typeof font)}
          options={[
            {
              value: 'sansSerif',
              item: (
                <span className="font-sansSerif font-semibold">Sans Serif</span>
              ),
            },
            {
              value: 'serif',
              item: <span className="font-serif font-semibold">Serif</span>,
            },
            {
              value: 'mono',
              item: <span className="font-mono font-semibold">Mono</span>,
            },
          ]}
        />

        <label
          htmlFor="themeSwitcher"
          className="relative inline-flex items-center cursor-pointer"
        >
          <input
            type="checkbox"
            id="themeSwitcher"
            className="sr-only peer"
            checked={mode === 'dark'}
            onChange={toggleMode}
          />
          <div className="w-9 h-5 bg-grey-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-purple hover:bg-primary-purple" />
          <span className="ml-3">
            <ThemeIcon
              className={`text-xl ${
                mode === 'light' ? 'stroke-grey-200' : 'stroke-primary-purple'
              }`}
            />
          </span>
        </label>
      </div>
    </header>
  );
}
