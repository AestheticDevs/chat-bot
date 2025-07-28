import ChatBox from "./chat-box";

export default async function Page(props: any) {
  const { id } = await props.params; // pakai await di object destructuring
  return (
    // Wrapper
    <div className="w-full grow flex flex-col overflow-y-auto h-full">
      <div className="text-2xl font-bold mb-6">Preview </div>

      <ChatBox collection_id={id} />
    </div>
  );
}
