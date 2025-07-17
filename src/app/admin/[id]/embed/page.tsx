import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { BundledLanguage } from "shiki";
import { codeToHtml } from "shiki";

export default async function Page() {
  return (
    <div>
      <Tabs defaultValue="messenger" className="h-14">
        <TabsList>
          <TabsTrigger className="" value="messenger">
            Add as Messenger
          </TabsTrigger>
          <TabsTrigger className="" value="full-page">
            Full Page Chat
          </TabsTrigger>
          <TabsTrigger className="" value="inline">
            Inline Chat
          </TabsTrigger>
          <TabsTrigger className="" value="whatsapp">
            Add Whatsapp
          </TabsTrigger>
        </TabsList>
        <TabsContent value="messenger">
          <div>
            <pre>
              <code>
                <span></span>
              </code>
            </pre>
          </div>{" "}
        </TabsContent>
        <TabsContent value="full-page">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
