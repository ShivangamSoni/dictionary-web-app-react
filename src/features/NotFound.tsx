import { WordErrorResponse } from '@customTypes/api';

export default function NotFound({
  error: { title, message, resolution },
}: {
  error: WordErrorResponse;
}) {
  return (
    <div className="text-center mt-32">
      <div className="text-6xl">😕</div>
      <div className="mt-11">
        <h2 className="text-lg font-bold mb-6">{title}</h2>
        <p className="text-sm sm:text-base text-grey-200">{message}</p>
        <p className="text-sm sm:text-base text-grey-200">{resolution}</p>
      </div>
    </div>
  );
}
