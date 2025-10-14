# 📋 DOCUMENTAÇÃO TÉCNICA - AURA

## Assistente de Apoio e Resposta Humanizada

*Versão: 1.0.0*  
*Data: Outubro 2024*

---

## 📖 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura do Sistema](#arquitetura-do-sistema)
3. [Componentes Implementados](#componentes-implementados)
4. [APIs e Endpoints](#apis-e-endpoints)
5. [Sistema de Detecção de Emergência](#sistema-de-detecção-de-emergência)
6. [Interface do Usuário](#interface-do-usuário)
7. [Integração com IA](#integração-com-ia)
8. [Segurança e Privacidade](#segurança-e-privacidade)
9. [Configuração e Deploy](#configuração-e-deploy)
10. [Testes e Validação](#testes-e-validação)

---

## 🎯 Visão Geral

### Objetivo do Projeto
O AURA é um sistema de chat inteligente desenvolvido especificamente para oferecer apoio a mulheres em situação de violência doméstica ou de gênero. O sistema combina:

- **Detecção automática de emergências** através de análise de palavras-chave
- **Respostas empáticas geradas por IA** para situações não críticas
- **Sistema de escalation** para atendimento humano especializado
- **Interface segura e acessível** com recursos de emergência

### Tecnologias Utilizadas
- **Framework**: Next.js 14 com App Router
- **Linguagem**: TypeScript
- **Estilização**: Tailwind CSS
- **IA**: OpenAI GPT-4 Turbo
- **Hospedagem**: Preparado para Vercel/Netlify

---

## 🏗️ Arquitetura do Sistema

### Estrutura de Pastas Criada

```
agentewoman/
├── 📁 app/                     # Next.js App Router
│   ├── 📁 api/                 # Endpoints da API
│   │   ├── 📁 agent/
│   │   │   └── route.ts        # API principal do chat
│   │   └── 📁 escalate/
│   │       └── route.ts        # API de escalation
│   ├── globals.css             # Estilos globais
│   ├── layout.tsx              # Layout raiz
│   └── page.tsx                # Página principal
├── 📁 components/              # Componentes React
│   └── SupportChat.tsx         # Interface do chat
├── 📁 lib/                     # Utilitários e lógica
│   └── prompts.ts              # Prompts e detecção
├── .env.local                  # Variáveis de ambiente
├── package.json                # Dependências
├── tsconfig.json               # Config TypeScript
├── tailwind.config.js          # Config Tailwind
├── postcss.config.js           # Config PostCSS
├── next.config.js              # Config Next.js
└── README.md                   # Documentação
```

### Fluxo de Dados

```mermaid
graph TD
    A[Usuária digita mensagem] --> B[SupportChat.tsx]
    B --> C{Envio para API}
    C --> D[/api/agent/route.ts]
    D --> E{Detectar Emergência?}
    E -->|Sim| F[Resposta Imediata + Botões]
    E -->|Não| G[Processar com OpenAI]
    G --> H[Resposta Empática da IA]
    F --> I[Exibir no Chat]
    H --> I
    I --> J[Usuária pode Escalar]
    J --> K[/api/escalate/route.ts]
    K --> L[Gerar Protocolo + Orientações]
```

---

## 🔧 Componentes Implementados

### 1. **SupportChat.tsx** - Interface Principal do Chat

**Localização**: `components/SupportChat.tsx`

**Funcionalidades**:
- ✅ Interface de chat com bolhas de mensagem
- ✅ Detecção de tecla Enter para envio
- ✅ Estados de carregamento com animação
- ✅ Botões de ação para emergências
- ✅ Scroll automático para última mensagem
- ✅ Responsividade mobile/desktop

**Principais Features**:
```typescript
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'aura';
  timestamp: Date;
  isEmergency?: boolean;
  actions?: ActionButton[];
}
```

**Estados Gerenciados**:
- `messages`: Array de mensagens da conversa
- `inputMessage`: Texto atual sendo digitado
- `isLoading`: Estado de carregamento

### 2. **page.tsx** - Página Principal

**Localização**: `app/page.tsx`

**Elementos Implementados**:
- ✅ Header com título e descrição
- ✅ Aviso sobre protótipo educacional
- ✅ Cards com números de emergência (190, 180, 100)
- ✅ Integração do componente SupportChat
- ✅ Seção de recursos adicionais
- ✅ Footer informativo

### 3. **layout.tsx** - Layout Raiz

**Localização**: `app/layout.tsx`

**Configurações**:
- ✅ Metadata para SEO
- ✅ Configuração para idioma português
- ✅ Meta tags de segurança
- ✅ Theme color para mobile

---

## 🌐 APIs e Endpoints

### 1. **POST /api/agent** - Chat Principal

**Arquivo**: `app/api/agent/route.ts`

**Funcionalidade**: Processa mensagens do chat com detecção de emergência

**Fluxo de Processamento**:
1. **Validação** da mensagem recebida
2. **Detecção de emergência** via palavras-chave
3. **Processamento com IA** (se não for emergência)
4. **Fallback seguro** em caso de erro

**Request**:
```json
{
  "message": "string - mensagem da usuária"
}
```

**Response - Situação Normal**:
```json
{
  "message": "Resposta empática da IA",
  "isEmergency": false,
  "source": "ai_response"
}
```

**Response - Emergência Detectada**:
```json
{
  "message": "🚨 SITUAÇÃO DE EMERGÊNCIA DETECTADA...",
  "isEmergency": true,
  "actions": [
    {
      "type": "call",
      "label": "Ligar para 190",
      "number": "190"
    },
    {
      "type": "escalate", 
      "label": "Conectar com atendente humano",
      "action": "human_support"
    }
  ],
  "source": "emergency_detection"
}
```

### 2. **POST /api/escalate** - Escalation para Humanos

**Arquivo**: `app/api/escalate/route.ts`

**Funcionalidade**: Simula criação de ticket para atendimento humano

**Request**:
```json
{
  "reason": "string - motivo da escalation",
  "urgency": "normal" | "urgent" | "emergency"
}
```

**Response**:
```json
{
  "success": true,
  "protocolId": "AURA-1729123456789-ABC123DEF",
  "message": "Sua solicitação foi registrada...",
  "estimatedResponse": "15-30 minutos",
  "contactInfo": {
    "emergency": "190",
    "womenHotline": "180"
  }
}
```

### 3. **GET /api/agent** e **GET /api/escalate** - Health Check

Ambos endpoints possuem métodos GET para verificar o status da API.

---

## 🚨 Sistema de Detecção de Emergência

### Arquivo: `lib/prompts.ts`

### Palavras-chave Implementadas

**Violência Física Imediata**:
- "está me batendo", "está me agredindo"
- "ele está aqui", "ele chegou" 
- "estou sendo agredida", "estou sendo espancada"
- "me bateu", "me agrediu", "ele me machucou"

**Situações de Perigo**:
- "estou com medo agora", "preciso de ajuda agora"
- "emergência", "socorro", "me ajuda"
- "não consigo sair", "estou presa"
- "ele trancou a porta", "estou escondida"

**Ameaças Diretas**:
- "ameaçou me matar", "disse que vai me matar"
- "tem uma arma", "pegou uma faca"
- "vai me machucar"

### Função de Detecção

```typescript
export function detectEmergency(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return EMERGENCY_KEYWORDS.some(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
}
```

### Resposta de Emergência Padrão

```typescript
export const EMERGENCY_RESPONSE = {
  message: `🚨 **SITUAÇÃO DE EMERGÊNCIA DETECTADA**
  
Sua segurança é prioridade absoluta. Se você está em perigo imediato:

1. **PROCURE UM LOCAL SEGURO**
2. **LIGUE IMEDIATAMENTE PARA 190**
3. **Se não puder falar, use SMS**

Você não está sozinha.`,
  isEmergency: true,
  actions: [...]
};
```

---

## 🎨 Interface do Usuário

### Componentes Visuais Implementados

#### 1. **Header Section**
- Título principal com gradiente roxo/rosa
- Descrição acolhedora
- Cards de números de emergência com cores distintas

#### 2. **Chat Interface**
- Bolhas de mensagem diferenciadas (usuária: azul, AURA: branco/vermelho)
- Timestamps nas mensagens
- Animação de "digitando..." com dots pulsantes
- Botões de ação para emergências

#### 3. **Input Area**
- Textarea responsiva
- Botão de envio com estados disabled
- Números de emergência sempre visíveis no rodapé

#### 4. **Emergency Actions**
- Botões para ligar (tel: protocol)
- Botão de escalation para humanos
- Cores diferenciadas: vermelho para emergência, roxo para escalation

### Responsividade

**Desktop** (lg:):
- Layout de duas colunas para informações
- Chat com largura máxima otimizada
- Botões lado a lado

**Mobile** (base):
- Layout empilhado
- Chat em tela cheia
- Botões em bloco

### Acessibilidade

- ✅ Contrastes adequados (WCAG AA)
- ✅ Focus states visíveis
- ✅ Textos alternativos
- ✅ Navegação por teclado
- ✅ Estrutura semântica HTML

---

## 🤖 Integração com IA

### Configuração OpenAI

**Modelo**: GPT-4 Turbo Preview  
**Parâmetros**:
- `max_tokens`: 500
- `temperature`: 0.7 (equilíbrio entre criatividade e consistência)

### System Prompt Implementado

```typescript
export const SYSTEM_PROMPT = `Você é AURA — Assistente de Apoio e Resposta Humanizada.

Seu papel é ouvir, acolher e orientar mulheres em situação de violência doméstica, familiar ou de gênero.

DIRETRIZES FUNDAMENTAIS:
- Sempre responda com empatia, sem julgamento e com foco na segurança
- Use linguagem acolhedora, respeitosa e não intimidadora
- Nunca minimize ou questione a experiência da pessoa
- Priorize sempre a segurança da pessoa em primeiro lugar
- Não forneça conselhos médicos ou jurídicos definitivos
- Incentive a busca por ajuda profissional quando apropriado

RECURSOS IMPORTANTES:
- Emergência: 190 (Polícia Militar)
- Central de Atendimento à Mulher: 180
- Disque Direitos Humanos: 100

Lembre-se: você está aqui para apoiar, não para julgar.`;
```

### Prompt Dinâmico

```typescript
export function createChatPrompt(userMessage: string): string {
  return `Como AURA, responda à seguinte mensagem de uma mulher que pode estar em situação de violência.

Lembre-se de:
- Ser empática e acolhedora
- Não julgar ou questionar  
- Oferecer apoio prático e emocional
- Sugerir recursos adequados quando necessário
- Manter foco na segurança

Mensagem: "${userMessage}"

Responda de forma humana, carinhosa e prestativa:`;
}
```

### Fallbacks de Segurança

1. **Erro da OpenAI**: Resposta empática padrão + números de emergência
2. **Erro de rede**: Mensagem de erro + orientações de segurança
3. **Timeout**: Resposta rápida + recursos alternativos

---

## 🔐 Segurança e Privacidade

### Medidas Implementadas

#### 1. **Não Persistência de Dados**
- ❌ Mensagens não são salvas em banco de dados
- ❌ Histórico não é mantido no servidor
- ✅ Dados apenas em memória durante a sessão

#### 2. **Validação Server-Side**
- ✅ Validação de tipos de entrada
- ✅ Sanitização de strings
- ✅ Rate limiting implícito do Next.js

#### 3. **Proteção de API Keys**
- ✅ Variáveis de ambiente (.env.local)
- ✅ Keys não expostas no frontend
- ✅ Configuração server-side only

#### 4. **Headers de Segurança**
```typescript
// Implementado no layout.tsx
<meta name="robots" content="noindex, nofollow" />
<meta name="theme-color" content="#9333ea" />
```

#### 5. **Fallbacks Seguros**
- ✅ Sempre mostrar números de emergência
- ✅ Respostas padrão em caso de erro
- ✅ Orientações de segurança em todas as interações

### Considerações de Privacidade

- **Transparência**: Sistema informa quando é IA vs emergência
- **Consentimento**: Avisos sobre protótipo educacional
- **Minimização**: Coleta apenas dados necessários
- **Retenção**: Zero retenção de dados sensíveis

---

## ⚙️ Configuração e Deploy

### Variáveis de Ambiente

```bash
# .env.local
OPENAI_API_KEY=sk-sua-chave-aqui           # Obrigatória
NEXT_PUBLIC_EMERGENCY_NUMBER=190            # Número da polícia
NEXT_PUBLIC_WOMAN_HOTLINE=180              # Central da Mulher
```

### Scripts de Build

```json
{
  "scripts": {
    "dev": "next dev",           // Desenvolvimento
    "build": "next build",       // Build produção
    "start": "next start",       // Start produção
    "lint": "next lint"          // Linting
  }
}
```

### Deploy Recommendations

#### **Vercel** (Recomendado)
1. Conectar repositório GitHub
2. Configurar variáveis de ambiente
3. Deploy automático

#### **Netlify**
1. Build command: `npm run build`
2. Publish directory: `.next`
3. Configurar environment variables

#### **Docker** (Opcional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY .. .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## 🧪 Testes e Validação

### Cenários de Teste Implementados

#### 1. **Detecção de Emergência**
- ✅ Palavras-chave detectadas corretamente
- ✅ Resposta imediata sem chamar IA
- ✅ Botões de ação funcionais

#### 2. **Chat Normal**
- ✅ Integração com OpenAI funcionando
- ✅ Fallbacks em caso de erro
- ✅ Formatação de mensagens

#### 3. **Escalation**
- ✅ Geração de protocolo único
- ✅ Resposta com orientações
- ✅ Tratamento de erros

#### 4. **Interface**
- ✅ Responsividade mobile/desktop
- ✅ Estados de loading
- ✅ Acessibilidade básica

### Teste Manual Sugerido

```bash
# 1. Testar situação normal
Mensagem: "Estou me sentindo confusa"
Resultado esperado: Resposta empática da IA

# 2. Testar emergência
Mensagem: "ele está me batendo"
Resultado esperado: Resposta imediata + botões

# 3. Testar escalation
Ação: Clicar "Conectar com atendente"
Resultado esperado: Protocolo gerado

# 4. Testar erro de API
Ação: Configurar API key inválida
Resultado esperado: Fallback seguro
```

---

## 📊 Métricas e Monitoramento

### Logs Implementados

```typescript
// Emergency detection
console.log('Emergency detected:', { message, timestamp });

// Escalation requests  
console.log('Escalation request:', {
  protocolId,
  reason,
  urgency,
  timestamp
});

// API errors
console.error('OpenAI error:', error);
```

### Métricas Sugeridas para Produção

- **Taxa de emergências detectadas**
- **Tempo de resposta da IA**
- **Número de escalations**
- **Erros de API**
- **Sessões por dia**

---

## 🔮 Próximos Passos

### Funcionalidades Planejadas

#### **Curto Prazo**
- [ ] Integração com banco de dados
- [ ] Sistema de autenticação
- [ ] Chat por voz
- [ ] Melhor detecção de contexto

#### **Médio Prazo**
- [ ] Dashboard para atendentes
- [ ] Integração com serviços reais
- [ ] Sistema de métricas
- [ ] Testes automatizados

#### **Longo Prazo**
- [ ] IA mais sofisticada
- [ ] Integração com emergência
- [ ] App mobile nativo
- [ ] Rede de apoio integrada

---

## 📞 Contatos e Suporte

### Recursos Integrados no Sistema

- **Emergência**: 190 (Polícia Militar)
- **Central da Mulher**: 180 (24h, gratuito)
- **Direitos Humanos**: 100 (Disque 100)

### Para Desenvolvedores

Este projeto foi desenvolvido como protótipo educacional para demonstrar como a tecnologia pode auxiliar no apoio a mulheres em situação de violência.

---

## 📄 Licença e Responsabilidade

**IMPORTANTE**: Este é um protótipo educacional que NÃO substitui serviços profissionais especializados. Em situações reais de emergência, sempre procure ajuda profissional adequada.

O código foi desenvolvido seguindo boas práticas de segurança e privacidade, mas deve ser auditado e testado adequadamente antes de qualquer uso em produção.

---

*Documentação criada em: Outubro 2024*  
*Versão do projeto: 1.0.0*  
*Framework: Next.js 14 + TypeScript*