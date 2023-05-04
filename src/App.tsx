import Dictionary from '@features/Dictionary';
import Header from '@features/Header';

export default function App() {
  return (
    <div className="font-sansSerif bg-white dark:bg-grey-600 text-grey-600 dark:text-white">
      <div className="max-w-screen-md w-11/12 min-h-screen mx-auto py-12 grid grid-rows-[auto_1fr] gap-8">
        <Header />
        <Dictionary />
      </div>
    </div>
  );
}
