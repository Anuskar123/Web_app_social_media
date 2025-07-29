import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import ConversationList from './components/ConversationList';
import ChatArea from './components/ChatArea';
import MessageInput from './components/MessageInput';
import TypingIndicator from './components/TypingIndicator';

const Messages = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileChat, setShowMobileChat] = useState(false);
  const [typingUsers, setTypingUsers] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      name: "Dawa",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Hey! How was your weekend? I went hiking and it was amazing!",
      lastMessageSender: "Ayusha",
      timestamp: new Date(Date.now() - 300000),
      unreadCount: 2,
      isOnline: true,
      isTyping: false,
      lastSeen: new Date(Date.now() - 60000)
    },
    {
      id: 2,
      name: "Utsab",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage: "You: Thanks for the help with the project! Really appreciate it.",
      lastMessageSender: "You",
      timestamp: new Date(Date.now() - 1800000),
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      lastSeen: new Date(Date.now() - 3600000)
    },
    {
      id: 3,
      name: "Rythmn",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Alex: The new mockups are ready for review. Check them out!",
      lastMessageSender: "Ythmn",
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 5,
      isOnline: true,
      isTyping: true,
      lastSeen: new Date(Date.now() - 120000)
    },
    {
      id: 4,
      name: "Sandesh",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Looking forward to our meeting tomorrow! See you at 2 PM.",
      lastMessageSender: "Sandesh",
      timestamp: new Date(Date.now() - 7200000),
      unreadCount: 0,
      isOnline: false,
      isTyping: false,
      lastSeen: new Date(Date.now() - 1800000)
    },
    {
      id: 5,
      name: "Ayusha",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "You: Perfect! Let\'s schedule that for next week.",
      lastMessageSender: "You",
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 0,
      isOnline: true,
      isTyping: false,
      lastSeen: new Date(Date.now() - 300000)
    },
    {
      id: 6,
      name: "Zoro Tamang",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      lastMessage: "The presentation went really well! Thanks for your input.",
      lastMessageSender: "Lisa Rodriguez",
      timestamp: new Date(Date.now() - 172800000),
      unreadCount: 1,
      isOnline: false,
      isTyping: false,
      lastSeen: new Date(Date.now() - 7200000)
    }
  ];

  // Mock messages for active conversation
  const mockMessages = {
    1: [
      {
        id: 1,
        sender: "Ayusha",
        text: "Hey! How was your weekend?",
        timestamp: new Date(Date.now() - 3600000),
        status: "read",
        type: "text"
      },
      {
        id: 2,
        sender: "You",
        text: "It was great! Went to the beach with friends. How about yours?",
        timestamp: new Date(Date.now() - 3300000),
        status: "read",
        type: "text"
      },
      {
        id: 3,
        sender: "Ayusha",
        text: "I went hiking and it was amazing! The weather was perfect.",
        timestamp: new Date(Date.now() - 3000000),
        status: "read",
        type: "text"
      },
      {
        id: 4,
        sender: "Ayusha",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop",
        text: "Check out this view from the summit!",
        timestamp: new Date(Date.now() - 2700000),
        status: "read",
        type: "image"
      },
      {
        id: 5,
        sender: "You",
        text: "Wow, that's absolutely stunning! 😍 Which trail did you take?",
        timestamp: new Date(Date.now() - 2400000),
        status: "read",
        type: "text"
      },
      {
        id: 6,
        sender: "Ayusha",
        text: "It's the Eagle Peak trail. About 8 miles round trip but totally worth it!\n\nYou should definitely try it sometime. The sunrise views are incredible too.",
        timestamp: new Date(Date.now() - 300000),
        status: "delivered",
        type: "text",
        reactions: [
          { emoji: "👍", count: 1, users: ["You"] },
          { emoji: "🔥", count: 1, users: ["You"] }
        ]
      }
    ],
    2: [
      {
        id: 1,
        sender: "Mike Chen",
        text: "Hey, could you help me with the React component we discussed?",
        timestamp: new Date(Date.now() - 7200000),
        status: "read",
        type: "text"
      },
      {
        id: 2,
        sender: "You",
        text: "Of course! What specific part are you stuck on?",
        timestamp: new Date(Date.now() - 7000000),
        status: "read",
        type: "text"
      },
      {
        id: 3,
        sender: "Mike Chen",
        text: "I\'m having trouble with the state management. The component isn\'t re-rendering when the data changes.",
        timestamp: new Date(Date.now() - 6800000),
        status: "read",
        type: "text"
      },
      {
        id: 4,
        sender: "You",
        text: `Here's a quick example of how to handle it:\n\nconst [data, setData] = useState([]);\n\nuseEffect(() => {\n  // Your data fetching logic\n  fetchData().then(setData);\n}, []);`,
        timestamp: new Date(Date.now() - 6600000),
        status: "read",
        type: "text"
      },
      {
        id: 5,
        sender: "Ronaldo Shrestha",
        text: "That makes perfect sense! Thank you so much for the help.",
        timestamp: new Date(Date.now() - 6400000),
        status: "read",
        type: "text"
      },
      {
        id: 6,
        sender: "You",
        text: "Thanks for the help with the project! Really appreciate it.",
        timestamp: new Date(Date.now() - 1800000),
        status: "read",
        type: "text"
      }
    ],
    3: []
  };

  useEffect(() => {
    // Initialize conversations
    setConversations(mockConversations);
  }, []);

  useEffect(() => {
    // Load messages for active conversation
    if (activeConversation) {
      const conversationMessages = mockMessages[activeConversation.id] || [];
      setMessages(conversationMessages);
    }
  }, [activeConversation]);

  // Simulate typing indicator
  useEffect(() => {
    if (activeConversation?.isTyping) {
      setTypingUsers([{
        id: activeConversation.id,
        name: activeConversation.name,
        avatar: activeConversation.avatar
      }]);
    } else {
      setTypingUsers([]);
    }
  }, [activeConversation]);

  const handleConversationSelect = useCallback((conversation) => {
    setActiveConversation(conversation);
    setShowMobileChat(true);
    
    // Mark conversation as read
    setConversations(prev => 
      prev.map(conv => 
        conv.id === conversation.id 
          ? { ...conv, unreadCount: 0, isTyping: false }
          : conv
      )
    );
  }, []);

  const handleSendMessage = useCallback((messageData) => {
    if (!activeConversation) return;

    const newMessage = {
      id: Date.now(),
      sender: "You",
      text: messageData.text,
      image: messageData.image,
      attachments: messageData.attachments,
      replyTo: messageData.replyTo,
      timestamp: messageData.timestamp,
      status: "sending",
      type: messageData.type
    };

    // Add message to current conversation
    setMessages(prev => [...prev, newMessage]);

    // Update conversation list
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation.id
          ? {
              ...conv,
              lastMessage: messageData.text || "Attachment",
              lastMessageSender: "You",
              timestamp: messageData.timestamp,
              unreadCount: 0
            }
          : conv
      )
    );

    // Simulate message status updates
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: "sent" }
            : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: "delivered" }
            : msg
        )
      );
    }, 2000);

    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id 
            ? { ...msg, status: "read" }
            : msg
        )
      );
    }, 3000);
  }, [activeConversation]);

  const handleBackToList = useCallback(() => {
    setShowMobileChat(false);
    setActiveConversation(null);
    setReplyTo(null);
  }, []);

  const handleReaction = useCallback((messageId, emoji) => {
    setMessages(prev => 
      prev.map(msg => {
        if (msg.id === messageId) {
          const reactions = msg.reactions || [];
          const existingReaction = reactions.find(r => r.emoji === emoji);
          
          if (existingReaction) {
            // Toggle reaction
            if (existingReaction.users.includes("You")) {
              return {
                ...msg,
                reactions: reactions.map(r => 
                  r.emoji === emoji
                    ? {
                        ...r,
                        count: r.count - 1,
                        users: r.users.filter(u => u !== "You")
                      }
                    : r
                ).filter(r => r.count > 0)
              };
            } else {
              return {
                ...msg,
                reactions: reactions.map(r => 
                  r.emoji === emoji
                    ? {
                        ...r,
                        count: r.count + 1,
                        users: [...r.users, "You"]
                      }
                    : r
                )
              };
            }
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [...reactions, {
                emoji,
                count: 1,
                users: ["You"]
              }]
            };
          }
        }
        return msg;
      })
    );
  }, []);

  const handleReply = useCallback((message) => {
    setReplyTo(message);
  }, []);

  const handleCancelReply = useCallback(() => {
    setReplyTo(null);
  }, []);

  const handleTyping = useCallback((isTyping) => {
    // In a real app, this would send typing status to other users
    console.log('User is typing:', isTyping);
  }, []);

  return (
    <>
      <Helmet>
        <title>Messages - SocialConnect</title>
        <meta name="description" content="Stay connected with friends and colleagues through real-time messaging on SocialConnect." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header - Desktop only */}
        <div className="hidden lg:block">
          <Header />
        </div>

        {/* Main Content */}
        <div className="flex h-screen lg:pt-16">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block lg:w-64">
            <BottomNavigation />
          </div>

          {/* Messages Layout */}
          <div className="flex-1 flex">
            {/* Conversation List */}
            <div className={`w-full lg:w-80 lg:border-r lg:border-border ${
              showMobileChat ? 'hidden lg:block' : 'block'
            }`}>
              <ConversationList
                conversations={conversations}
                activeConversationId={activeConversation?.id}
                onConversationSelect={handleConversationSelect}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            </div>

            {/* Chat Area */}
            <div className={`flex-1 flex flex-col ${
              showMobileChat ? 'block' : 'hidden lg:flex'
            }`}>
              <ChatArea
                conversation={activeConversation}
                messages={messages}
                onSendMessage={handleSendMessage}
                onBack={handleBackToList}
                onReaction={handleReaction}
                onReply={handleReply}
              />
              
              {/* Typing Indicator */}
              {typingUsers.length > 0 && (
                <TypingIndicator users={typingUsers} />
              )}
              
              {/* Message Input */}
              {activeConversation && (
                <MessageInput
                  onSendMessage={handleSendMessage}
                  onTyping={handleTyping}
                  replyTo={replyTo}
                  onCancelReply={handleCancelReply}
                />
              )}
            </div>
          </div>
        </div>

        {/* Bottom Navigation - Mobile only */}
        <div className="lg:hidden">
          <BottomNavigation />
        </div>
      </div>
    </>
  );
};

export default Messages;