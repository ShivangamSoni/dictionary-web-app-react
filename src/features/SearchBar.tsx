import { object, string, InferType } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useSearch from '@store/search';

const FormSchema = object({
  search: string().required('Whoops, can’t be empty'),
});
type FormState = InferType<typeof FormSchema>;

export default function SearchBar() {
  const { setSearch } = useSearch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormState>({
    resolver: yupResolver(FormSchema),
  });

  function submitHandler({ search }: FormState) {
    reset({ search: '' }, { keepErrors: false });
    setSearch(search);
  }

  const isError = Object.entries(errors).length > 0;

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <label htmlFor="wordSearch" className="sr-only">
        Search for any word
      </label>
      <div className="relative">
        <input
          type="search"
          id="wordSearch"
          className={`block w-full p-4 pr-14 text-sm font-bold text-grey-400 border-none outline-none rounded-xl bg-grey-50 focus:ring-1 focus:ring-primary-purple dark:bg-grey-500 dark:text-white ${
            isError && errors.search ? 'ring-1 ring-primary-red' : ''
          }`}
          placeholder="Search for any word"
          {...register('search')}
        />
        <button
          type="submit"
          className="text-grey-200 absolute right-2.5 bottom-2.5 hover:text-primary-purple focus:outline-none focus:text-primary-purple font-medium rounded-lg text-sm p-2"
        >
          <span className="sr-only">Search</span>
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {isError && errors.search && (
        <span className="block mt-2 text-md text-primary-red">
          {errors.search.message}
        </span>
      )}
    </form>
  );
}
