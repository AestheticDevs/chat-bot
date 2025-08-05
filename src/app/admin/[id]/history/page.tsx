"use client";

import type React from "react";

import { useState } from "react";
import {
  Phone,
  Video,
  MoreVertical,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Sample chat history data
const allContacts = [
  {
    id: 1,
    name: "AI Assistant",
    username: "@ai_helper",
    lastMessage: "Hello! How can I help you?",
    time: "12:30",
    unread: 0,
  },
  {
    id: 2,
    name: "John Doe",
    username: "@johndoe",
    lastMessage: "See you tomorrow!",
    time: "11:45",
    unread: 2,
  },
  {
    id: 3,
    name: "Jane Smith",
    username: "@janesmith",
    lastMessage: "Thanks for the help",
    time: "10:20",
    unread: 0,
  },
  {
    id: 4,
    name: "Team Group",
    username: "@team_group",
    lastMessage: "Meeting at 3 PM",
    time: "09:15",
    unread: 5,
  },
  {
    id: 5,
    name: "Alice Johnson",
    username: "@alice_j",
    lastMessage: "Great work on the project!",
    time: "08:30",
    unread: 1,
  },
  {
    id: 6,
    name: "Bob Wilson",
    username: "@bobwilson",
    lastMessage: "Can we reschedule?",
    time: "07:45",
    unread: 0,
  },
  {
    id: 7,
    name: "Sarah Davis",
    username: "@sarahdavis",
    lastMessage: "The files are ready",
    time: "07:20",
    unread: 3,
  },
  {
    id: 8,
    name: "Mike Brown",
    username: "@mikebrown",
    lastMessage: "Thanks for the update",
    time: "06:55",
    unread: 0,
  },
  {
    id: 9,
    name: "Emma Taylor",
    username: "@emmataylor",
    lastMessage: "Let's discuss this later",
    time: "06:30",
    unread: 2,
  },
  {
    id: 10,
    name: "David Lee",
    username: "@davidlee",
    lastMessage: "Perfect timing!",
    time: "06:10",
    unread: 0,
  },
  {
    id: 11,
    name: "Lisa Garcia",
    username: "@lisagarcia",
    lastMessage: "I'll send the documents",
    time: "05:45",
    unread: 1,
  },
  {
    id: 12,
    name: "Tom Anderson",
    username: "@tomanderson",
    lastMessage: "Great idea!",
    time: "05:20",
    unread: 0,
  },
];

// Sample messages for the selected chat
const sampleMessages = [
  {
    id: 1,
    role: "assistant",
    content: "Hello! How can I help you today?",
    createdAt: new Date(Date.now() - 3600000),
  },
  {
    id: 2,
    role: "user",
    content: "Hi there! I was wondering about the project status.",
    createdAt: new Date(Date.now() - 3000000),
  },
  {
    id: 3,
    role: "assistant",
    content:
      "The project is progressing well. We've completed about 75% of the tasks and are on track to finish by the deadline.",
    createdAt: new Date(Date.now() - 2400000),
  },
  {
    id: 4,
    role: "user",
    content:
      "That's great to hear! Are there any blockers I should be aware of?",
    createdAt: new Date(Date.now() - 1800000),
  },
  {
    id: 5,
    role: "assistant",
    content:
      "Currently, we're waiting for approval on the design changes from the client. Once we get that, we should be able to proceed smoothly.",
    createdAt: new Date(Date.now() - 1200000),
  },
];

const CONTACTS_PER_PAGE = 6;

export default function WhatsAppChat() {
  const [selectedContact, setSelectedContact] = useState(allContacts[0]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter contacts based on search term
  const filteredContacts = allContacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.username.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredContacts.length / CONTACTS_PER_PAGE);
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
    <Card>
      <CardContent className="flex">
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
          <div className="flex-1 overflow-y-auto">
            {currentContacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`flex cursor-pointer items-center border-b border-gray-100 p-3 hover:bg-gray-50 ${
                  selectedContact.id === contact.id ? "bg-gray-100" : ""
                }`}
              >
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between">
                    <h3 className="truncate font-medium text-gray-900">
                      {contact.name}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {contact.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="mb-1 text-xs text-gray-500">
                        {contact.username}
                      </span>
                      <p className="truncate text-sm text-gray-600">
                        {contact.lastMessage}
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
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSidebar(!showSidebar)}
                className="mr-2 md:hidden"
              >
                ☰
              </Button>
              <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#00a884] font-semibold text-white">
                {selectedContact.name.charAt(0)}
              </div>
              <div>
                <h2 className="font-medium text-gray-900">
                  {selectedContact.name}
                </h2>
                <p className="text-sm text-gray-500">
                  {selectedContact.username}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 space-y-4 overflow-y-auto p-4"
          >
            {sampleMessages.length === 0 && (
              <div className="mt-20 text-center text-gray-500">
                <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-sm">
                  <h3 className="mb-2 font-medium">No messages</h3>
                  <p className="text-sm">This chat history is empty.</p>
                </div>
              </div>
            )}

            {sampleMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs rounded-lg rounded-tr-none px-6 py-4 lg:max-w-md ${
                    message.role === "user"
                      ? "bg-slate-100 text-gray-900"
                      : "text-gray-900"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
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
