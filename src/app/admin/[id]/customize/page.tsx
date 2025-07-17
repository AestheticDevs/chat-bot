type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  return (
    // Wrapper
    <div className="w-full">
      <div className="text-2xl font-bold">Customize {params.id}</div>

      <div className="mt-6 grid grid-cols-1">
        {/* Chatbox Preview */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50">
          {/* Header */}
          <div className="bg-primary-brand flex p-5">
            <div className="text-xl font-semibold text-white">Agent Geen</div>
          </div>

          {/* Text Box */}
          <div className="relative flex h-[500px] flex-col gap-4 bg-neutral-50 p-5">
            {/* Message Container */}
            <div className="flex-1 overflow-y-auto"></div>

            <input
              type="text"
              className="sticky bottom-0 rounded-md border p-4"
              placeholder="Text me"
            />
          </div>

          {/* Footer */}
          <div className="bg-slate-300 p-5 py-4 text-center">
            <div className="text-sm font-semibold text-slate-500">
              Powered by <span className="text-primary-brand">Chatbot</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
