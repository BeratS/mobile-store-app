import IconSymbol from '@/components/ui/icon-symbol';
import React, { useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  text: string;
}

export default function AIScreen() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: 'assistant', text: "Hi Berat! I can help you secure a hotdesk near your team, reserve a parking spot, or check your schedule today. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  // Quick Action Prompts to make simulation engaging
  const quickPrompts = [
    { text: "Book Desk 5th Floor 🖥️", prompt: "Can you book me a hotdesk on the 5th floor close to the development team?" },
    { text: "Reserve Parking 🚗", prompt: "I need to reserve a parking spot for tomorrow morning." },
    { text: "Today's Schedule 📅", prompt: "What does my meeting calendar look like for today?" }
  ];

  const triggerAssistantReply = (userQuery: string) => {
    setIsTyping(true);
    scrollViewRef.current?.scrollToEnd({ animated: true });

    // Simulate AI thinking and typing latency
    setTimeout(() => {
      let replyText = "I've searched our backend systems... ";
      
      const query = userQuery.toLowerCase();
      if (query.includes('desk') || query.includes('floor')) {
        replyText += "Your automated desk booking on the 5th floor has been successfully secured next to the Endava engineering hub! 🖥️";
      } else if (query.includes('parking') || query.includes('car')) {
        replyText += "Level -1, Spot B12 has been reserved for your vehicle from 8:00 AM tomorrow. Access permit synced to your Corporate Card! 🚗";
      } else if (query.includes('schedule') || query.includes('calendar') || query.includes('meeting')) {
        replyText += "You have 3 sync meetings today. Your first standup starts at 10:00 AM on Floor 5, Room 'Alpha'. 📅";
      } else {
        replyText += "I've processed your request and updated your workspace preferences. Let me know if you need anything else, Berat!";
      }

      setMessages(prev => [...prev, { id: Date.now(), role: 'assistant', text: replyText }]);
      setIsTyping(false);
      
      // Allow slight render buffer before scrolling to bottom
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }, 1500);
  };

  const sendMessage = (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // Append User Message
    const userMsg: Message = { id: Date.now(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    
    if (!textToSend) setInput('');
    
    setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 50);

    // Trigger Simulated System Reply
    triggerAssistantReply(text);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
      className="flex-1 bg-white dark:bg-darkBg"
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View className="flex-1 p-6 pb-4">
        
        {/* Header Container */}
        <View className="flex-row items-center justify-between mb-6">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-primary/10 items-center justify-center border border-primary/20">
              <IconSymbol name="sparkles" size={20} color="#ff5640" />
            </View>
            <View>
              <Text className="text-slate-900 dark:text-lightText text-xl font-extrabold leading-none">Office Copilot</Text>
              <Text className="text-slate-400 dark:text-mutedText text-[10px] uppercase font-bold tracking-widest mt-1">Autonomous Assistant</Text>
            </View>
          </View>
          {/* Status Dot */}
          <View className="bg-primary/10 px-2.5 py-1 rounded-full flex-row items-center gap-1.5">
            <View className="w-1.5 h-1.5 rounded-full bg-primary" />
            <Text className="text-primary font-extrabold text-[9px] uppercase tracking-wider">Agent v1.0</Text>
          </View>
        </View>

        {/* Chat Engine Body */}
        <ScrollView 
          ref={scrollViewRef}
          className="flex-1 mb-4" 
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              className={`max-w-[82%] p-4 rounded-2xl mb-4 shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-primary self-end rounded-tr-none' 
                  : 'bg-slate-100 dark:bg-cardBg self-start rounded-tl-none border border-slate-200/20 dark:border-slate-800'
              }`}
            >
              <Text className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-white font-medium' : 'text-slate-800 dark:text-lightText'}`}>
                {msg.text}
              </Text>
            </View>
          ))}

          {/* Dynamic Typing Wave Indicator */}
          {isTyping && (
            <View className="bg-slate-100 dark:bg-cardBg self-start p-4 rounded-2xl rounded-tl-none border border-slate-200/20 dark:border-slate-800 mb-4 max-w-[82%]">
              <View className="flex-row items-center gap-1 px-1 py-0.5">
                <Text className="text-slate-400 dark:text-mutedText text-xs italic animate-pulse">Copilot is thinking...</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Quick Action Prompt suggestions */}
        {messages.length === 1 && !isTyping && (
          <View className="mb-4">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
              {quickPrompts.map((item, index) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => sendMessage(item.prompt)}
                  className="bg-slate-100/80 dark:bg-cardBg/60 border border-slate-200/40 dark:border-slate-800/80 px-4 py-2.5 rounded-full mr-2"
                >
                  <Text className="text-slate-700 dark:text-lightText text-xs font-semibold">{item.text}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Interactive Input Bar */}
        <View className="flex-row items-center bg-slate-50 dark:bg-cardBg rounded-2xl px-4 py-1.5 border border-slate-200/60 dark:border-slate-800">
          <TextInput
            className="flex-1 text-slate-900 dark:text-lightText py-2 text-sm"
            placeholder="Ask AI to book a desk, workspace..."
            placeholderTextColor="#64748b"
            value={input}
            onChangeText={setInput}
            editable={!isTyping}
          />
          <TouchableOpacity 
            onPress={() => sendMessage()} 
            disabled={isTyping}
            className={`p-2.5 rounded-xl ml-2 ${isTyping ? 'bg-slate-300 dark:bg-slate-800' : 'bg-primary'}`}
          >
            <IconSymbol name="paperplane.fill" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

      </View>
    </KeyboardAvoidingView>
  );
}