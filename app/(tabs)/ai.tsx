import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function AIScreen() {
  const [messages, setMessages] = useState([
    { id: 1, role: 'assistant', text: "Hi Berat! I can help you secure a hotdesk near your team or manage your schedule today. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages,
      { id: Date.now(), role: 'user', text: input },
      { id: Date.now() + 1, role: 'assistant', text: "Searching backend modules... Your automated desk booking request has been configured!" }
    ]);
    setInput('');
  };

  return (
    <View className="flex-1 bg-white dark:bg-darkBg p-6">

      {/* Header Container */}
      <View className="flex-row items-center gap-2 mb-6">
        <IconSymbol name="sparkles" size={24} color="#ff5640" />
        <Text className="text-slate-900 dark:text-lightText text-2xl font-bold ml-1">Office Copilot</Text>
      </View>

      {/* Chat Engine Body */}
      <ScrollView className="flex-1 gap-4 mb-4" showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            className={`max-w-[85%] p-4 rounded-2xl mb-3 ${msg.role === 'user' ? 'bg-primary self-end' : 'bg-slate-100 dark:bg-cardBg self-start'}`}
          >
            <Text className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-white' : 'text-slate-800 dark:text-lightText'}`}>
              {msg.text}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Interactive Input Bar */}
      <View className="flex-row items-center bg-slate-50 dark:bg-cardBg rounded-xl px-4 py-2 border border-slate-200 dark:border-slate-700">
        <TextInput
          className="flex-1 text-slate-900 dark:text-lightText py-2"
          placeholder="Ask AI to book a desk or parking..."
          placeholderTextColor="#94a3b8"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity onPress={sendMessage} className="p-2 bg-primary rounded-lg ml-2">
          <IconSymbol name="paperplane.fill" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}