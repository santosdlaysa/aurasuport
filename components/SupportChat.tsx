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
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionMessages = [
    "Preciso de orientação sobre meus direitos",
    "Estou passando por uma situação difícil",
    "Como posso me proteger?",
    "Quero informações sobre medidas protetivas",
    "Onde posso buscar ajuda presencial?",
    "Preciso de apoio emocional"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Hide suggestions after first user message
    if (messages.some(msg => msg.sender === 'user')) {
      setShowSuggestions(false);
    }
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

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion);
    setShowSuggestions(false);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden border-2 border-purple-200/30 animate-fadeInUp">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white p-5 sm:p-7 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm p-2.5 rounded-xl">
              <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base sm:text-lg lg:text-xl font-black">AURA — Assistente de Apoio</h2>
              <p className="text-[10px] sm:text-xs opacity-90 mt-0.5 flex items-center gap-1.5">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online • Aqui para te ouvir e apoiar 💜
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="h-[60vh] sm:h-[500px] overflow-y-auto p-4 sm:p-6 space-y-4 sm:space-y-5 bg-gradient-to-b from-purple-50/30 via-pink-50/20 to-white">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
          >
            <div
              className={`relative max-w-[85%] sm:max-w-md lg:max-w-lg px-4 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 text-white'
                  : message.isEmergency
                  ? 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-400 text-red-900'
                  : 'bg-white border-2 border-purple-100/50 text-gray-800 hover:border-purple-200'
              }`}
            >
              {message.sender === 'aura' && !message.isEmergency && (
                <div className="absolute -left-2 top-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">✨</span>
                </div>
              )}
              <div className="whitespace-pre-wrap text-xs sm:text-sm leading-relaxed font-medium">{message.content}</div>
              
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
                      className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-md ${
                        action.type === 'call'
                          ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                          : 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white'
                      }`}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              )}

              <div className="text-[10px] sm:text-xs opacity-60 mt-1.5">
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
          <div className="flex justify-start animate-fadeIn">
            <div className="relative bg-white border-2 border-purple-100 text-gray-800 max-w-[85%] sm:max-w-md lg:max-w-lg px-4 sm:px-5 py-3 sm:py-4 rounded-2xl shadow-lg">
              <div className="absolute -left-2 top-4 w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-white text-lg">✨</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-bounce"></div>
                  <div className="w-2.5 h-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.15s'}}></div>
                  <div className="w-2.5 h-2.5 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-bounce" style={{animationDelay: '0.3s'}}></div>
                </div>
                <span className="text-xs sm:text-sm text-gray-700 font-semibold">AURA está digitando...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Buttons */}
      {showSuggestions && (
        <div className="border-t border-purple-100/50 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-purple-50/50 to-pink-50/50 animate-fadeIn">
          <p className="text-xs font-semibold text-purple-700 mb-2.5 flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Sugestões para começar:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {suggestionMessages.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                disabled={isLoading}
                className="group relative text-left px-3 sm:px-4 py-2.5 sm:py-3 bg-white border-2 border-purple-200/60 hover:border-purple-400 rounded-xl text-xs sm:text-sm font-medium text-gray-700 hover:text-purple-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-start gap-2">
                  <span className="text-purple-500 text-base flex-shrink-0 mt-0.5">💬</span>
                  <span className="leading-relaxed">{suggestion}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t-2 border-purple-100/50 p-4 sm:p-6 bg-gradient-to-b from-white via-purple-50/20 to-pink-50/20">
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <div className="relative flex-1">
            <textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem aqui..."
              disabled={isLoading}
              className="w-full resize-none border-2 border-purple-200 rounded-2xl px-4 sm:px-5 py-3 sm:py-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-400 transition-all text-sm bg-white shadow-sm hover:shadow-md placeholder-gray-400"
              rows={2}
            />
            <div className="absolute bottom-3 right-3 text-xs text-gray-400">
              Pressione Enter para enviar
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="group relative px-6 sm:px-10 py-3 sm:py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:via-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-105 hover:-translate-y-0.5 shadow-lg hover:shadow-xl disabled:transform-none overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
            <div className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Enviando...</span>
                </>
              ) : (
                <>
                  <span>Enviar</span>
                  <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </div>
          </button>
        </div>

        <div className="mt-3 sm:mt-4 text-[10px] sm:text-xs text-center bg-gradient-to-r from-red-50 via-red-100 to-red-50 border-2 border-red-300 rounded-xl p-3 shadow-sm">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span className="font-semibold text-red-800">🚨 Emergência imediata?</span>
            <span className="text-red-700">Ligue <strong className="font-bold text-red-900">190</strong></span>
            <span className="text-gray-400">•</span>
            <span className="text-purple-700">Central da Mulher: <strong className="font-bold text-purple-900">180</strong></span>
          </div>
        </div>
      </div>
    </div>
  );
}