import { SendIcon } from "lucide-react";

type PageProps = {
  params: {
    id: string;
  };
};

export default async function Page({ params }: PageProps) {
  return (
    // Wrapper
    <div className="w-full">
      <div className="text-2xl font-bold">Preview</div>

      <div className="mt-6 grid grid-cols-1">
        {/* Chatbox Preview */}
        <div className="max-w-lg overflow-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50">
          {/* Header */}
          <div className="bg-primary-brand flex p-5">
            <div className="text-xl font-semibold text-white">Agent Geen</div>
          </div>

          {/* Text Box */}
          <div className="relative flex h-[500px] flex-col gap-4 bg-neutral-50 p-5">
            {/* Message Container */}
            <div className="flex-1 overflow-y-auto"></div>

            <form action="">
              <div className="flex items-center rounded-md border pe-4">
                <input
                  type="text"
                  className="w-full p-4 outline-0"
                  placeholder="Text me"
                />
                <SendIcon className="cursor-pointer text-slate-400 hover:text-slate-600" />
              </div>
            </form>
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
