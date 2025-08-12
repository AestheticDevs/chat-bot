import CopyButton from "@/components/public/CopyButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import { CopyIcon } from "lucide-react";
CopyButton;

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;

  const scriptCode = `<script async src="https://embed.supergpt.id/widget.js?r=${Math.random() * 1000}" data-collection-id="${id}"></script>`;

  return (
    <div>
      <Tabs defaultValue="widget">
        <TabsList>
          <TabsTrigger className="px-2 font-semibold" value="widget">
            Add as Widget
          </TabsTrigger> 
        </TabsList>
        <TabsContent value="widget">
          {/* Wrapper */}
          <div className="mt-8">
            <p className="text-sm">
              To add a floating button to specific pages, you can either paste
              (inject) the following code snippet into the {`<head> `}section or
              place it anywhere on the page if modifying the{` <head>`} code is
              not possible.
            </p>
            <div className="relative mt-5 max-w-5xl rounded-2xl bg-slate-700 p-1.5">
              <div className="mb-2 p-3 text-xs font-medium text-white/60">
                script
              </div>
              <CopyButton textToCopy={scriptCode} />
              <pre className="rounded-xl bg-slate-800 p-6 text-sm text-white">
                <code className="text-sky-300">{scriptCode}</code>
              </pre>
            </div>{" "}
          </div>
          {/* / Wrapper */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
