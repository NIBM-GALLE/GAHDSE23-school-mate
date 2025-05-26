import { useState, useEffect, useRef } from "react";
import { Send, Search, ChevronLeft, MoreVertical, Paperclip, Users, Clock, Calendar } from "lucide-react";

export default function TeacherParentChat() {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messageEndRef = useRef(null);
  
  // Sample data for students and chat history
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Emily Johnson",
      parent: "Sarah Johnson",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Thank you for the update on Emily's progress.",
      time: "10:30 AM",
      unread: 0,
      messages: [
        { id: 1, sender: "parent", text: "Good morning! I wanted to ask about Emily's upcoming science project.", time: "Yesterday, 9:15 AM" },
        { id: 2, sender: "teacher", text: "Hello Mrs. Johnson! The science project is due next Friday. Emily has been making good progress in class.", time: "Yesterday, 9:30 AM" },
        { id: 3, sender: "parent", text: "Thank you for the update on Emily's progress.", time: "Yesterday, 10:30 AM" },
      ]
    },
    {
      id: 2,
      name: "Michael Smith",
      parent: "Robert Smith",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Will Michael need to bring any supplies for the field trip?",
      time: "Yesterday",
      unread: 2,
      messages: [
        { id: 1, sender: "teacher", text: "Hello Mr. Smith, just a reminder that we have a field trip scheduled next week.", time: "Yesterday, 2:15 PM" },
        { id: 2, sender: "parent", text: "Thank you for the reminder! Will Michael need to bring any supplies for the field trip?", time: "Yesterday, 3:30 PM" },
      ]
    },
    {
      id: 3,
      name: "Sophia Williams",
      parent: "Jennifer Williams",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Sophia will be absent tomorrow due to a doctor's appointment.",
      time: "Apr 24",
      unread: 0,
      messages: [
        { id: 1, sender: "parent", text: "Hello, I wanted to let you know that Sophia will be absent tomorrow due to a doctor's appointment.", time: "Apr 24, 4:45 PM" },
        { id: 2, sender: "teacher", text: "Thank you for letting me know. I'll make sure to provide the missed assignments when she returns.", time: "Apr 24, 5:00 PM" },
      ]
    },
    {
      id: 4,
      name: "Ethan Brown",
      parent: "David Brown",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Can we schedule a meeting to discuss Ethan's reading progress?",
      time: "Apr 22",
      unread: 0,
      messages: [
        { id: 1, sender: "parent", text: "Good afternoon. Can we schedule a meeting to discuss Ethan's reading progress?", time: "Apr 22, 1:15 PM" },
        { id: 2, sender: "teacher", text: "I'd be happy to meet with you. Would next Tuesday at 3:30 PM work for you?", time: "Apr 22, 2:00 PM" },
        { id: 3, sender: "parent", text: "That time works perfectly. Thank you!", time: "Apr 22, 2:10 PM" },
      ]
    },
    {
      id: 5,
      name: "Olivia Davis",
      parent: "Amanda Davis",
      avatar: "/api/placeholder/40/40",
      lastMessage: "Olivia really enjoyed the art project today!",
      time: "Apr 20",
      unread: 0,
      messages: [
        { id: 1, sender: "parent", text: "Olivia really enjoyed the art project today!", time: "Apr 20, 5:30 PM" },
        { id: 2, sender: "teacher", text: "I'm glad to hear that! She showed great creativity and attention to detail.", time: "Apr 20, 6:15 PM" },
      ]
    }
  ]);
  
  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    student.parent.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (message.trim() === "") return;
    
    const newMessage = {
      id: selectedChat.messages.length + 1,
      sender: "teacher",
      text: message,
      time: "Just now"
    };
    
    const updatedStudents = students.map(student => {
      if (student.id === selectedChat.id) {
        return {
          ...student,
          lastMessage: message,
          time: "Just now",
          messages: [...student.messages, newMessage]
        };
      }
      return student;
    });
    
    setStudents(updatedStudents);
    setSelectedChat({
      ...selectedChat,
      lastMessage: message,
      time: "Just now",
      messages: [...selectedChat.messages, newMessage]
    });
    
    setMessage("");
  };
  
  // Scroll to bottom of chat when messages update
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChat?.messages]);
  
  // Handle key press for sending messages
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-neutral-700 text-white flex flex-col border-r border-gray-300">
        {/* Teacher Profile */}
        <div className="p-4 bg-neutral-800 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-neutral-700 rounded-full p-2">
              <Users size={20} className="text-gray-200" />
            </div>
            <div className="ml-3">
              <h2 className="font-semibold">Ms. Thompson</h2>
              <p className="text-xs text-gray-300">Grade 5 Teacher</p>
            </div>
          </div>
          <MoreVertical size={20} className="text-gray-300 cursor-pointer" />
        </div>
        
        {/* Search Bar */}
        <div className="p-4 bg-neutral-800">
          <div className="flex items-center bg-neutral-700 rounded-lg px-3 py-2">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search students or parents"
              className="ml-2 bg-transparent border-none focus:outline-none text-white w-full text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Student List */}
        <div className="flex-1 overflow-y-auto">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-slate-600 ${
                selectedChat?.id === student.id ? "bg-slate-600" : ""
              }`}
              onClick={() => setSelectedChat(student)}
            >
              <img
                src={student.avatar}
                alt={student.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{student.name}</h3>
                  <span className="text-xs text-gray-300">{student.time}</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-300 truncate">{student.parent}: {student.lastMessage}</p>
                  {student.unread > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {student.unread}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-neutral-800 text-white p-4 flex items-center justify-between shadow">
              <div className="flex items-center">
                <ChevronLeft
                  size={24}
                  className="text-gray-300 cursor-pointer md:hidden"
                  onClick={() => setSelectedChat(null)}
                />
                <img
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  className="w-10 h-10 rounded-full ml-2"
                />
                <div className="ml-3">
                  <h2 className="font-semibold">{selectedChat.name}</h2>
                  <p className="text-xs text-gray-300">Parent: {selectedChat.parent}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Clock size={20} className="text-gray-300 cursor-pointer" />
                <Calendar size={20} className="text-gray-300 cursor-pointer" />
                <MoreVertical size={20} className="text-gray-300 cursor-pointer" />
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {selectedChat.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex mb-4 ${
                    msg.sender === "teacher" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`px-4 py-2 rounded-lg max-w-xs lg:max-w-md ${
                      msg.sender === "teacher"
                        ? "bg-rose-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <p className={`text-xs mt-1 ${
                      msg.sender === "teacher" ? "text-gray-200" : "text-gray-500"
                    }`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messageEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="p-4 bg-gray-100 border-t border-gray-300">
              <div className="flex items-center">
                <button className="text-gray-400 hover:text-gray-600">
                  <Paperclip size={20} />
                </button>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type a message..."
                  className="ml-3 flex-1 bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-neutral-700 resize-none"
                  rows="1"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className={`ml-3 p-2 rounded-full ${
                    message.trim() ? "bg-rose-500 text-white" : "bg-gray-300 text-gray-500"
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          // No Chat Selected State
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
            <div className="text-neutral-700 text-xl font-semibold mb-2">Welcome to Class Chat</div>
            <p className="text-gray-500 text-center max-w-md">
              Select a conversation from the list to start messaging with parents.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}