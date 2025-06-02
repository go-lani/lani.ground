interface Props {
  packageName: string;
  children: React.ReactNode;
}

export default function ContentLayout({ packageName, children }: Props) {
  return (
    <section className="w-full">
      {/* 헤더 섹션 */}
      <div className="mb-4 rounded-lg border border-neutral-700/50 bg-gradient-to-br from-neutral-800/50 to-neutral-900/50 p-4 backdrop-blur-sm sm:mb-6 sm:rounded-xl sm:p-6 lg:mb-8 lg:rounded-2xl lg:p-8">
        {/* 배경 패턴 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5" />
        <div className="absolute inset-0 opacity-30">
          <div className="h-full w-full bg-gradient-to-br from-transparent via-white/5 to-transparent" />
        </div>

        <div className="relative">
          <div className="mb-3 flex items-start gap-2 sm:mb-4 sm:items-center sm:gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-lg font-bold text-white shadow-lg sm:h-12 sm:w-12 sm:rounded-xl sm:text-xl lg:h-14 lg:w-14 lg:text-2xl">
              📦
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="break-words bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-xl font-bold leading-tight text-transparent sm:text-2xl/snug lg:text-4xl/snug">
                @lani.ground/{packageName}
              </h1>
              <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                React Component Library
              </p>
            </div>
          </div>

          {/* NPM 배지 */}
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <div className="flex items-center gap-1 rounded-full bg-neutral-800/70 px-2 py-1.5 backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-2 lg:px-4">
              <img
                src={`https://img.shields.io/npm/v/%40lani.ground/${packageName}`}
                alt="NPM Version"
                className="h-4 sm:h-5"
              />
            </div>
            <div className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1.5 text-green-400 backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-2 lg:px-4">
              <svg
                className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs font-medium sm:text-sm">
                Production Ready
              </span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-1.5 text-blue-400 backdrop-blur-sm sm:gap-2 sm:px-3 sm:py-2 lg:px-4">
              <svg
                className="h-3 w-3 flex-shrink-0 sm:h-4 sm:w-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-medium sm:text-sm">TypeScript</span>
            </div>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}
