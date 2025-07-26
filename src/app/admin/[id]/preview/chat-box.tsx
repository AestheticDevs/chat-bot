"use client";

import { CheckCheck, Copy, Loader2Icon, SendIcon } from "lucide-react";
import {
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import chatWithCollection from "./action";
import { Button } from "@/components/ui/button";

export interface ChatType {
  question: string;
  answer: {
    text: string;
    isLoading: boolean;
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
    <div className="flex grow flex-col overflow-hidden overflow-y-hidden rounded-3xl bg-white shadow-xl shadow-slate-200/50">
      {/* Header */}
      <div className="bg-primary-brand flex p-5">
        <div className="text-xl font-semibold text-white">Agent Geen</div>
      </div>

      {/* Text Box */}
      <div className="relative flex grow flex-col gap-4 overflow-y-auto bg-neutral-50">
        <Conversation
          conversation={conversation}
          sendQuestionAction={sendQuestionAction}
        />
      </div>

      {/* Footer */}
      <div className="bg-slate-300 p-5 py-4 text-center">
        <div className="text-sm font-semibold text-slate-500">
          Powered by <span className="text-primary-brand">Chatbot</span>
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
        {conversationOptimistic.map((item, i) => {
          return (
            <div key={i} className="flex flex-col gap-4">
              <QuestionBubble text={item.question} />
              <AnswerBuble
                isLoading={item.answer.isLoading}
                text={item.answer.text}
              />
            </div>
          );
        })}
        <div ref={bottomDivRef}></div>
      </div>

      <form action={formAction} ref={formRef} className="p-8 pt-2">
        <div className="flex items-center rounded-md border pe-4">
          <input
            type="text"
            className="w-full p-4 outline-0"
            placeholder="Text me"
            name="question"
            required
          />
          <button>
            <SendIcon className="cursor-pointer text-slate-400 hover:text-slate-600" />
          </button>
        </div>
      </form>
    </>
  );
}

function QuestionBubble({ text }: { text: string }) {
  return (
    <div className="mb-2 ml-auto block w-fit max-w-3/4 rounded-2xl rounded-tr-none bg-slate-200 p-3 text-end">
      {text}
    </div>
  );
}

function AnswerBuble({ isLoading, text }: ChatType["answer"]) {
  const [copied, setCopied] = useState(false);
  function copyToClipboard() {
    setCopied(true);
    navigator.clipboard.writeText(text);
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
          <p className="mb-3">{text}</p>
          <Button variant={"outline"} size={"sm"} onClick={copyToClipboard}>
            {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
            Copy
          </Button>
        </div>
      )}
    </div>
  );
}
