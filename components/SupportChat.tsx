'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'aura';
  timestamp: Date;
  isEmergency?: boolean;
  actions?: Array<{
    type: 'call' | 'escalate';
    label: string;
    number?: string;
    action?: string;
  }>;
}

interface ApiResponse {
  message: string;
  isEmergency: boolean;
  actions?: Array<{
    type: 'call' | 'escalate';
    label: string;
    number?: string;
    action?: string;
  }>;
  source: string;
}

export default function SupportChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Olá! Eu sou a AURA — Assistente de Apoio e Resposta Humanizada. 

Estou aqui para te ouvir, acolher e orientar. Você pode compartilhar comigo o que está acontecendo, seus sentimentos ou dúvidas. 

**Lembre-se:**
• Suas conversas são privadas
• Não há julgamentos aqui
• Em emergência, ligue 190
• Central da Mulher: 180

Como posso te apoiar hoje?`,
      sender: 'aura',
      timestamp: new Date()
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: currentMessage }),
      });

      if (!response.ok) {
        throw new Error('Erro na comunicação com o servidor');
      }

      const data: ApiResponse = await response.json();

      const auraMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        sender: 'aura',
        timestamp: new Date(),
        isEmergency: data.isEmergency,
        actions: data.actions
      };

      setMessages(prev => [...prev, auraMessage]);

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sinto muito, mas estou enfrentando dificuldades técnicas. 

Se você está em situação de emergência, ligue imediatamente:
• **Emergência: 190**
• **Central da Mulher: 180**

Tente enviar sua mensagem novamente em alguns instantes.`,
        sender: 'aura',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCallEmergency = (number: string) => {
    window.open(`tel:${number}`, '_self');
  };

  const handleEscalate = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/escalate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          reason: 'Solicitação de atendimento humano via chat',
          urgency: 'normal'
        }),
      });

      const data = await response.json();

      const escalateMessage: Message = {
        id: Date.now().toString(),
        content: data.message,
        sender: 'aura',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, escalateMessage]);

    } catch (error) {
      console.error('Erro ao escalar atendimento:', error);
      
      const errorMessage: Message = {
        id: Date.now().toString(),
        content: `Não foi possível conectar com atendente no momento. 

**Tente:**
• Central da Mulher: 180
• WhatsApp da Central: (61) 99216-1020

Sua segurança é prioridade. Não hesite em ligar se precisar.`,
        sender: 'aura',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4">
        <h2 className="text-xl font-semibold">AURA — Assistente de Apoio</h2>
        <p className="text-sm opacity-90">Aqui para te ouvir e apoiar 💜</p>
      </div>

      {/* Messages Area */}
      <div className="h-96 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : message.isEmergency
                  ? 'bg-red-100 border border-red-300 text-red-800'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm">{message.content}</div>
              
              {/* Action buttons for emergency responses */}
              {message.actions && (
                <div className="mt-3 space-y-2">
                  {message.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        if (action.type === 'call' && action.number) {
                          handleCallEmergency(action.number);
                        } else if (action.type === 'escalate') {
                          handleEscalate();
                        }
                      }}
                      className={`w-full px-3 py-2 text-sm rounded-md font-medium ${
                        action.type === 'call'
                          ? 'bg-red-600 hover:bg-red-700 text-white'
                          : 'bg-purple-600 hover:bg-purple-700 text-white'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}
              
              <div className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString('pt-BR', { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 text-gray-800 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500">AURA está digitando...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4 bg-white">
        <div className="flex space-x-3">
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem... (pressione Enter para enviar)"
            disabled={isLoading}
            className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={2}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
          >
            {isLoading ? '...' : 'Enviar'}
          </button>
        </div>
        
        <div className="mt-2 text-xs text-gray-500 text-center">
          🚨 Em caso de emergência imediata, ligue <strong>190</strong> • Central da Mulher: <strong>180</strong>
        </div>
      </div>
    </div>
  );
}