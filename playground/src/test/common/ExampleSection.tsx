import React from 'react';

interface ExampleSectionProps {
  title: string;
  children: React.ReactNode;
}

export const ExampleSection = ({ title, children }: ExampleSectionProps) => (
  <div className="relative mb-10 rounded-lg border border-neutral-700 p-6">
    <h2 className="absolute left-[10px] top-[-15px] mb-4 bg-neutral-900 px-2 text-xl font-bold">
      {title}
    </h2>
    <div className="flex flex-col gap-4 rounded-md bg-neutral-900 p-4">
      {children}
    </div>
  </div>
);

export default ExampleSection;
