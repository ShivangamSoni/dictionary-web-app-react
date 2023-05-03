import { ReactNode, useState, useRef, useEffect, useCallback } from 'react';

interface Option {
  value: string;
  item: ReactNode;
}

export default function Select({
  id,
  value,
  options,
  onChange,
}: {
  id: string;
  value: string;
  options: Option[];
  onChange: (value: Option['value']) => void;
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownContainer = useRef<HTMLDivElement>(null);

  const selectedItem = options.find((option) => option.value === value);

  const toggleDropdown = useCallback(
    () => setDropdownOpen((prev) => !prev),
    []
  );

  const clickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        dropdownOpen &&
        !dropdownContainer.current?.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    },
    [dropdownOpen]
  );

  useEffect(() => {
    document.addEventListener('mousedown', clickOutside);
    return () => document.removeEventListener('mousedown', clickOutside);
  }, [dropdownOpen, clickOutside]);

  return (
    <div className="relative" ref={dropdownContainer}>
      <button
        id={id}
        className={`font-medium text-md px-4 py-2.5 text-center inline-flex items-center ${
          dropdownOpen ? 'text-primary-purple' : 'text-grey-600 dark:text-white'
        }`}
        type="button"
        onClick={toggleDropdown}
      >
        {selectedItem?.item || 'Invalid Value'}
        <svg
          className="w-4 h-4 ml-2 text-primary-purple"
          aria-hidden="true"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <div
        className={`z-10 absolute top-full right-0 mt-2 bg-white divide-y rounded-lg shadow-md shadow-primary-purple w-44 dark:bg-grey-500 ${
          dropdownOpen ? '' : 'hidden'
        }`}
      >
        <ul className="py-2" role="listbox" aria-labelledby={id}>
          {options.map(({ value, item }) => (
            <li key={value}>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-grey-600 dark:text-white hover:text-primary-purple"
                onClick={(e) => {
                  onChange(value);
                  setDropdownOpen((prev) => !prev);
                  e.currentTarget.blur();
                }}
              >
                {item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
