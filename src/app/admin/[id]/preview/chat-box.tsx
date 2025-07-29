"use client";

import {
  CheckCheck,
  Copy,
  Loader2Icon,
  SendHorizonal,
  SendIcon,
  TriangleAlert,
} from "lucide-react";
import {
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import chatWithCollection from "./action";
import { Button } from "@/components/ui/button";
import { LOCAL_ENV } from "@/lib/shared";
import { markdownToHtml } from "@/lib/utils";

export interface ChatType {
  question: string;
  answer: {
    text: string;
    html?: string;
    isLoading: boolean;
    isError?: boolean;
  };
}

export default function ChatBox({ collection_id }: { collection_id: string }) {
  const [conversation, setConversation] = useState<ChatType[]>([]);
  async function sendQuestionAction(formData: FormData) {
    const conversation = await chatWithCollection(
      formData.get("question") as string,
      collection_id,
    );

    startTransition(() => {
      setConversation((conv) => [...conv, conversation]);
    });
  }
  return (
    <div className="flex h-full w-full grow flex-col overflow-hidden overflow-y-hidden rounded-3xl border-2 border-white shadow-xl shadow-slate-200/50">
      {/* Header */}
      <div className="flex p-5">
        <div className="text-xl font-semibold text-indigo-900">Chatbot</div>
      </div>

      {/* Text Box */}
      <div className="relative flex grow flex-col gap-4 overflow-y-auto bg-slate-50">
        <Conversation
          conversation={conversation}
          sendQuestionAction={sendQuestionAction}
        />
      </div>

      {/* Footer */}
      <div className="bg-slate-100 p-5 py-4 text-center">
        <div className="text-sm font-semibold text-slate-500">
          Powered by <span className="text-primary-brand">KSPSTK</span>
        </div>
      </div>
    </div>
  );
}

function Conversation({
  conversation,
  sendQuestionAction,
}: {
  conversation: ChatType[];
  sendQuestionAction: (formData: FormData) => Promise<void>;
}) {
  const [conversationOptimistic, addOptimisticConversation] = useOptimistic<
    ChatType[],
    string
  >(conversation, (state, newContent) => [
    ...state,
    {
      question: newContent,
      answer: {
        isLoading: true,
        text: "",
        isError: false,
      },
    },
  ]);

  const formRef = useRef<HTMLFormElement>(null);
  const bottomDivRef = useRef<HTMLDivElement>(null);

  function formAction(formData: FormData) {
    addOptimisticConversation(formData.get("question") as string);
    formRef.current?.reset();
    startTransition(async () => {
      await sendQuestionAction(formData);
    });
  }

  useEffect(() => {
    if (bottomDivRef.current) {
      bottomDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [conversationOptimistic]);

  return (
    <>
      {/* Message Container */}
      <div className="flex flex-1 grow flex-col overflow-y-auto p-8">
        <small className="text-center text-slate-500">
          {new Date().toLocaleDateString()}
        </small>
        {conversationOptimistic.map((item, i) => {
          return (
            <div key={i} className="flex flex-col gap-4">
              <QuestionBubble text={item.question} />
              <AnswerBuble
                isLoading={item.answer.isLoading}
                text={item.answer.text}
                html={item.answer.html}
                isError={item.answer.isError}
              />
            </div>
          );
        })}
        <div ref={bottomDivRef}></div>
      </div>

      <form action={formAction} ref={formRef} className="p-8 pt-2">
        <div className="relative">
          <input
            type="text"
            className="w-full p-4 outline-0 border rounded-lg"
            placeholder="Ketik pertanyaan anda..."
            name="question"
            required
          />
          <Button variant={"default"} className="rounded-lg px-4 absolute right-3 top-1/2 -translate-y-1/2">
            <SendHorizonal className="cursor-pointer text-white" />
          </Button>
        </div>
      </form>
    </>
  );
}

function QuestionBubble({ text }: { text: string }) {
  return (
    <div className="prose mb-2 ml-auto block w-fit max-w-3/4 rounded-2xl rounded-tr-none bg-slate-100 p-3 px-4 text-end">
      {text}
    </div>
  );
}

function AnswerBuble({ isLoading, text, html, isError }: ChatType["answer"]) {
  const [copied, setCopied] = useState(false);
  function copyToClipboard() {
    setCopied(true);
    navigator.clipboard.writeText(text);
  }

  if (isError) {
    return (
      <p className="text-destructive">
        <TriangleAlert strokeWidth={1.5} className="mb-2" /> Something went
        wrong!
        {LOCAL_ENV ? (
          <small
            className="block"
            dangerouslySetInnerHTML={{ __html: text }}
          ></small>
        ) : null}
      </p>
    );
  }

  return (
    <div className="py-4">
      {isLoading ? (
        <p className="flex animate-pulse items-center gap-2">
          Thinking...{" "}
          <Loader2Icon size={16} strokeWidth={1.5} className="animate-spin" />
        </p>
      ) : (
        <div>
          <div
            className="prose mb-3"
            dangerouslySetInnerHTML={{ __html: html as string }}
          ></div>
          <Button variant={"outline"} size={"sm"} onClick={copyToClipboard}>
            {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
            Copy
          </Button>
        </div>
      )}
    </div>
  );
}
