import { LucideBot } from "lucide-react";

const page = () => {
  return (
    // Wrapper
    <div className="w-full">
      <div className="text-2xl font-bold">Set up your Chat Bot</div>

      <div className="mt-6 grid grid-cols-4">
        {/* Card */}
        <div className="bg-slate-100te rounded-2xl border-2 border-white p-5">
          <div className="flex items-center justify-between">
            <div className="text-primary-brand flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <LucideBot />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
