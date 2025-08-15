"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Prisma } from "@prisma/client";
import { markdownToHtml } from "@/lib/utils";

const CONTACTS_PER_PAGE = 6;

export default function ChatHistory({
  chatSession,
}: {
  chatSession?: Prisma.chat_sessionGetPayload<{
    include: { messages: true };
  }>[];
}) {
  const [selectedSession, setSelectedSession] =
    useState<Prisma.chat_sessionGetPayload<{ include: { messages: true } }>>();
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  if (!chatSession) {
    return null;
  }

  // Filter contacts based on search term
  const filteredContacts = chatSession.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate pagination
  const totalPages = Math.ceil(chatSession.length / CONTACTS_PER_PAGE);
  const startIndex = (currentPage - 1) * CONTACTS_PER_PAGE;
  const endIndex = startIndex + CONTACTS_PER_PAGE;
  const currentContacts = filteredContacts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <Card className="h-full">
      <CardContent className="flex h-full">
        {/* Sidebar */}
        <div
          className={`${showSidebar ? "w-80" : "w-0"} flex flex-col overflow-hidden border-r border-gray-200 bg-white transition-all duration-300`}
        >
          {/* Search */}
          <div className="bg-gray-50 p-3">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search chats..."
                className="border-gray-200 bg-white pl-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          {/* Contacts List */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {chatSession.length === 0 ? (
              <div className="text-muted-foreground p-4">There are no chat</div>
            ) : null}
            {chatSession?.map((session) => (
              <div
                key={session.id}
                onClick={() => setSelectedSession(session)}
                className={`flex cursor-pointer items-center border-b border-gray-100 p-3 hover:bg-gray-50 ${
                  false ? "bg-gray-100" : ""
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="truncate font-medium text-gray-900">
                      {session.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {/* {session.email} */}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="mb-1 text-xs text-gray-500">
                        {session.email}
                      </span>
                      <p className="w-full text-sm text-gray-600 line-clamp-1">
                        {session.messages[0]?.message}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="border-t border-gray-200 bg-gray-50 p-3">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="text-gray-600"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="text-gray-600"
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-2 text-center text-xs text-gray-500">
              Showing {startIndex + 1}-
              {Math.min(endIndex, filteredContacts.length)} of{" "}
              {filteredContacts.length} chats
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex flex-1 flex-col">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-[#f0f2f5] p-3">
            <div className="flex h-10 items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(!showSidebar)}
                className="mr-2 md:hidden"
              >
                ☰
              </Button>
              <div>
                <h2 className="font-medium text-gray-900">
                  {selectedSession?.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedSession?.email}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 space-y-4 overflow-y-auto p-4">
            {chatSession.length === 0 && (
              <div className="mt-20 text-center text-gray-500">
                <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-2 font-medium">No messages</h3>
                  <p className="text-sm">This chat history is empty.</p>
                </div>
              </div>
            )}

            {selectedSession?.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-lg rounded-tr-none px-6 py-4 lg:max-w-md ${
                    message.sender === "user"
                      ? "bg-slate-100 text-gray-900"
                      : "text-gray-900"
                  }`}
                >
                  {message.sender === "user" ? (
                    <p className="text-sm">{message.message}</p>
                  ) : null}
                  {message.sender === "bot" ? (
                    <Message message={message.message} />
                  ) : null}
                </div>
              </div>
            ))}
          </div>

          {/* Footer Info */}
          <div className="bg-[#f0f2f5] p-3 text-center">
            <p className="text-sm text-gray-500">Chat History - Read Only</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function Message({ message }: { message: string }) {
  const [html, setHtml] = useState("");

  useEffect(() => {
    markdownToHtml(message).then(setHtml);
  }, [message]);

  return (
    <div className="prose">
      <div dangerouslySetInnerHTML={{ __html: html }}></div>
    </div>
  );
}
