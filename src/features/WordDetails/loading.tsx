export default function WordDetailsLoading() {
  return (
    <div
      role="status"
      className="flex flex-col gap-10 animate-pulse duration-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="bg-grey-200 w-56 h-7 sm:h-10 rounded-full" />
          <div className="mt-3 bg-grey-200 w-40 h-4 sm:h-5 rounded-full" />
        </div>

        <div className="bg-grey-200 w-14 h-14 sm:w-24 sm:h-24 rounded-full" />
      </div>

      <div>
        <ul className="flex flex-col gap-10">
          {Array.from({ length: 2 }, (_, i) => i).map((i) => (
            <li key={i}>
              <div className="grid gap-10">
                <div className="relative isolate w-full after:content-[''] after:absolute after:h-[1px] after:bg-grey-100 after:inset-0 after:top-1/2 after:-translate-y-1/2 after:-z-[1]">
                  <div className="bg-grey-200 w-28 h-4 sm:h-7 rounded-full" />
                </div>
                <div className="grid gap-6">
                  <div className="bg-grey-200 w-32 h-3.5 sm:h-6 rounded-full" />
                  <ul className="list-disc marker:text-primary-purple pl-10 grid gap-3">
                    {Array.from({ length: 2 }, (_, i) => i).map((i) => (
                      <li key={i} className="pl-5">
                        <div className="grid gap-3">
                          <div className="bg-grey-200 w-10/12 h-2.5 sm:h-3.5 rounded-full" />
                          <div className="bg-grey-200 w-8/12 h-1.5 sm:h-2.5 rounded-full" />
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <hr className="mb-5" />
        <div className="grid grid-cols-[auto_1fr] gap-4">
          <div className="bg-grey-200 w-20 sm:w-32 h-2.5 sm:h-4 rounded-full" />
          <ul className="grid gap-3">
            {Array.from({ length: 3 }, (_, i) => i).map((i) => (
              <li key={i}>
                <div className="bg-grey-200 w-10/12 h-1.5 sm:h-2.5 rounded-full" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
