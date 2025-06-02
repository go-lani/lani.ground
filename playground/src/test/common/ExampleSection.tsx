import React from 'react';

interface ExampleSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ExampleSection = ({ title, children }: ExampleSectionProps) => (
  <div className="mb-12 rounded-2xl border border-neutral-700/50 bg-gradient-to-br from-neutral-800/30 to-neutral-900/50 backdrop-blur-sm">
    {/* 상단 그라데이션 바 */}
    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

    {/* 헤더 섹션 */}
    <div className="border-b border-neutral-700/50 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
          🎯
        </div>
        <h2 className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">
          {title}
        </h2>
      </div>
    </div>

    {/* 컨텐츠 섹션 */}
    <div className="p-4 md:p-6">
      <div className="space-y-6">{children}</div>
    </div>
  </div>
);

export default ExampleSection;
