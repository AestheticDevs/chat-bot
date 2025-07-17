type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  return (
    // Wrapper
    <div className="w-full">
      <div className="text-2xl font-bold">Setting</div>

      <div className="mt-6 grid grid-cols-1">Setting</div>
    </div>
  );
}
