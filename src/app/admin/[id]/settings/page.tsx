export default async function Page(props: any) {
  const id = props?.params?.id;

  return (
    // Wrapper
    <div className="w-full">
      <div className="text-2xl font-bold">Setting</div>

      <div className="mt-6 grid grid-cols-1">Setting</div>
    </div>
  );
}
