"use client";

import {
  CheckCheck,
  Copy,
  Loader2Icon,
  SendHorizonal,
  SparklesIcon,
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
import { Prisma } from "@prisma/client";
import { AutosizeTextarea } from "@/components/autoresize-textarea";

export interface ChatType {
  question: string;
  answer: {
    text: string;
    html?: string;
    isLoading: boolean;
    isError?: boolean;
  };
}

export default function ChatBox({
  collection_id,
  agent,
}: {
  collection_id: string;
  agent: Prisma.agentsGetPayload<{ include: { setting: true } }> | null;
}) {
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
          greetings={agent?.setting?.greetings}
          sendQuestionAction={sendQuestionAction}
        />
      </div>

      {/* Footer */}
      {/* <div className="bg-slate-100 p-5 py-4 text-center">
        <div className="text-sm font-semibold text-slate-500">
          Powered by <span className="text-primary-brand">KSPSTK</span>
        </div>
      </div> */}
    </div>
  );
}

function Conversation({
  conversation,
  greetings,
  sendQuestionAction,
}: {
  conversation: ChatType[];
  greetings?: string;
  sendQuestionAction: (formData: FormData) => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    addOptimisticConversation(formData.get("question") as string);
    formRef.current?.reset();
    startTransition(async () => {
      await sendQuestionAction(formData);
      setLoading(false);
    });
  }

  useEffect(() => {
    if (bottomDivRef.current) {
      // bottomDivRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [conversationOptimistic]);

  return (
    <>
      {/* Message Container */}
      <div className="flex flex-1 grow flex-col overflow-y-auto p-8">
        <small className="mb-5 text-center text-slate-500">
          {new Date().toLocaleDateString()}
        </small>
        {greetings ? (
          <div className="mb-4">
            <p>{greetings}</p>
          </div>
        ) : null}
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
        <div>
          <div className="flex items-start gap-2 rounded-lg border pr-4">
            <AutosizeTextarea
              className="resize-none border-none bg-transparent p-4 text-base focus-visible:border-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-0"
              placeholder="Ketik pertanyaan disini"
              maxHeight={160}
              name="question"
              disabled={loading}
              required={true}
            />
            <Button
              variant={"default"}
              className="my-4 rounded-lg px-4"
              disabled={loading}
              type="submit"
            >
              <SendHorizonal className="cursor-pointer text-white" />
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}

function QuestionBubble({ text }: { text: string }) {
  const questionBubleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (questionBubleRef.current) {
      questionBubleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, []);
  return (
    <div
      className="prose mb-2 ml-auto block w-fit max-w-3/4 rounded-2xl rounded-tr-none bg-slate-100 p-3 px-4 text-end break-words whitespace-normal"
      ref={questionBubleRef}
    >
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
  const answerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading && answerRef.current) {
      answerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isLoading]);

  if (isError) {
    return (
      <p className="text-destructive mb-6">
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
        <div ref={answerRef}>
          <div
            className="prose mb-3"
            dangerouslySetInnerHTML={{ __html: html as string }}
          ></div>
          <div>
            <div className="mb-3 flex items-center gap-1 text-slate-600">
              <SparklesIcon className="size-3" strokeWidth={1.5} />
              <small>
                Jawaban ini dihasilkan oleh AI dan mungkin tidak sepenuhnya
                akurat.
              </small>
            </div>
            <Button variant={"outline"} size={"sm"} onClick={copyToClipboard}>
              {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
              Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
