import CopyButton from "@/components/public/CopyButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@radix-ui/react-separator";
import { CopyIcon } from "lucide-react";
CopyButton;

export default async function Page() {
  const scriptCode = `<script src="https://chatbot.id/embed.js" uid="5ec2a341-5ed8-4bd0-abbd-3121a2faa548" async defer></script>`;
  const scriptFullPage = `<script src="https://chatbot.id/ai-bot/5ec2a341-5ed8-4bd0-abbd-3121a2faa548></script>`;
  const scriptWhatsappp = `https://chat-bot-api-283127950541.app/5ec2a341-5ed8-4bd0-abbd-3121a2faa548/webhook/`;
  const scriptInline = `<iframe
  src="https://chatbot.id/aibot-iframe/5ec2a341-5ed8-4bd0-abbd-3121a2faa548"
  style="border:1px solid #EAEAEA"
  width="100%"
  height="680"
  frameborder="0"
  allow="microphone"
></iframe>`;

  return (
    <div>
      <Tabs defaultValue="messenger">
        <TabsList>
          <TabsTrigger className="px-2 font-semibold" value="messenger">
            Add as Messenger
          </TabsTrigger>
          <TabsTrigger className="px-2 font-semibold" value="full-page">
            Full Page Chat
          </TabsTrigger>
          <TabsTrigger className="px-2 font-semibold" value="inline">
            Inline Chat
          </TabsTrigger>
          <TabsTrigger className="px-2 font-semibold" value="whatsapp">
            Add Whatsapp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="messenger">
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
        <TabsContent value="full-page">
          {/* Wrapper */}
          <div className="mt-8">
            <p className="text-sm">
              You can share Geen AI with your desired visitor via this link.
            </p>
            <div className="relative mt-5 max-w-5xl rounded-2xl bg-slate-700 p-1.5">
              <div className="mb-2 p-3 text-xs font-medium text-white/60">
                script
              </div>
              <CopyButton textToCopy={scriptFullPage} />
              <pre className="rounded-xl bg-slate-800 p-6 text-sm text-white">
                <code className="text-sky-300">{scriptFullPage}</code>
              </pre>
            </div>{" "}
          </div>
          {/* / Wrapper */}
        </TabsContent>
        <TabsContent value="inline">
          {/* Wrapper */}
          <div className="mt-8">
            <p className="text-sm">
              Paste (embed) this code snippet where you want to show the chat
              widget.
            </p>
            <div className="relative mt-5 max-w-5xl rounded-2xl bg-slate-700 p-1.5">
              <div className="mb-2 p-3 text-xs font-medium text-white/60">
                script
              </div>
              <CopyButton textToCopy={scriptInline} />
              <pre className="rounded-xl bg-slate-800 p-6 text-sm text-white">
                <code className="text-sky-300">{scriptInline}</code>
              </pre>
            </div>{" "}
          </div>
          {/* / Wrapper */}
        </TabsContent>
        <TabsContent value="whatsapp">
          {/* Wrapper */}
          <div className="mt-8">
            <p className="text-sm">
              You can use this URL to configure your Whatsapp Webhook on Meta
              Developers.
            </p>
            <div className="relative mt-5 max-w-5xl rounded-2xl bg-slate-700 p-1.5">
              <div className="mb-2 p-3 text-xs font-medium text-white/60">
                script
              </div>
              <CopyButton textToCopy={scriptWhatsappp} />
              <pre className="rounded-xl bg-slate-800 p-6 text-sm text-white">
                <code className="text-sky-300">{scriptWhatsappp}</code>
              </pre>
            </div>{" "}
          </div>
          {/* / Wrapper */}
        </TabsContent>
      </Tabs>
    </div>
  );
}
