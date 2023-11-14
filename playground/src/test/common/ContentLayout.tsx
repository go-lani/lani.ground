interface Props {
  packageName: string;
  children: React.ReactNode;
}

export default function ContentLayout({ packageName, children }: Props) {
  return (
    <section className="w-full">
      <div className="border-style mb-4 flex items-center gap-4 border-b pb-4">
        <h1 className="text-3xl font-bold">@lani.ground/{packageName}</h1>
      </div>
      <ul className="mb-8 mt-4">
        <li>
          <img
            src={`https://img.shields.io/npm/v/%40lani.ground/${packageName}`}
            alt=""
          />
        </li>
      </ul>
      {children}
    </section>
  );
}
