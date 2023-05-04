import Dictionary from '@features/Dictionary';
import Header from '@features/Header';
import useThemeStore from '@store/theme';

export default function App() {
  const { font } = useThemeStore();

  return (
    <div
      className={`${
        // eslint-disable-next-line no-nested-ternary
        font === 'sansSerif'
          ? 'font-sansSerif'
          : font === 'serif'
          ? 'font-serif'
          : 'font-mono'
      } bg-white dark:bg-grey-600 text-grey-400 dark:text-white`}
    >
      <div className="max-w-screen-md w-11/12 min-h-screen mx-auto py-12 grid grid-rows-[auto_1fr] gap-8">
        <Header />
        <Dictionary />
      </div>
    </div>
  );
}
