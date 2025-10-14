# AURA — Assistente de Apoio e Resposta Humanizada

Um sistema de chat inteligente voltado para apoio a mulheres em situação de violência, com triagem automática de risco e respostas empáticas.

## 🎯 Objetivo

AURA é um assistente virtual projetado para:
- Detectar situações de emergência através de palavras-chave
- Oferecer respostas empáticas e acolhedoras
- Conectar usuárias com recursos de apoio adequados
- Fornecer escalation para atendimento humano quando necessário

## 🚨 Aviso Importante

**Este é um protótipo educacional** desenvolvido para demonstrar como a tecnologia pode auxiliar no apoio a mulheres em situação de violência. **NÃO substitui serviços profissionais especializados**.

## 🏗️ Arquitetura

### Estrutura do Projeto
```
agentewoman/
├── app/
│   ├── api/
│   │   ├── agent/route.ts      # API principal do chat
│   │   └── escalate/route.ts   # API para escalation
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx               # Página principal
├── components/
│   └── SupportChat.tsx        # Componente do chat
├── lib/
│   └── prompts.ts            # Prompts e lógica de detecção
├── .env.local                # Variáveis de ambiente
├── package.json
└── README.md
```

### Funcionalidades Principais

1. **Detecção de Emergência**
   - Analisa mensagens em busca de palavras-chave de risco
   - Resposta imediata sem processar via IA em casos críticos
   - Botões de ação para emergência (ligar 190, conectar humano)

2. **Chat Inteligente**
   - Integração com OpenAI GPT-4
   - Prompts especializados em apoio empático
   - Fallbacks seguros em caso de erro

3. **Escalation para Humanos**
   - Sistema de tickets para atendimento humano
   - Protocolo de acompanhamento
   - Orientações enquanto aguarda resposta

## 🛠️ Configuração e Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Chave de API da OpenAI

### 1. Instalação de Dependências
```bash
npm install
```

### 2. Configuração de Ambiente
Crie o arquivo `.env.local` na raiz do projeto:
```env
OPENAI_API_KEY=sk-sua-chave-da-openai-aqui
NEXT_PUBLIC_EMERGENCY_NUMBER=190
NEXT_PUBLIC_WOMAN_HOTLINE=180
```

### 3. Executar o Projeto
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build
npm start
```

O projeto estará disponível em `http://localhost:3000`

## 🔧 Tecnologias Utilizadas

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **OpenAI API** - Modelo de linguagem (GPT-4)
- **React Hooks** - Gerenciamento de estado

## 🛡️ Segurança e Boas Práticas

### Detecção de Risco
- **Filtro server-side**: Palavras-chave são verificadas no servidor antes da IA
- **Resposta imediata**: Situações críticas têm resposta instantânea
- **Não armazenamento**: Mensagens não são salvas no banco

### Palavras-chave de Emergência
O sistema detecta automaticamente expressões como:
- "está me batendo", "estou sendo agredida"
- "ele está aqui", "tenho medo agora"
- "preciso de ajuda agora", "emergência"

### Fallbacks de Segurança
- Respostas padrão em caso de erro da IA
- Números de emergência sempre visíveis
- Orientações de segurança em todas as interações

## 📱 Interface do Usuário

### Componentes Principais
- **Chat Interface**: Bolhas de conversa responsivas
- **Emergency Actions**: Botões para ligar e conectar humano
- **Info Cards**: Números importantes sempre visíveis
- **Loading States**: Feedback visual durante processamento

### Responsividade
- Design adaptável para mobile e desktop
- Foco em acessibilidade e usabilidade
- Cores e tipografia otimizadas para conforto

## 🔄 Fluxo de Funcionamento

1. **Usuária envia mensagem**
2. **Sistema verifica emergência**
   - Se detectada → Resposta imediata + botões de ação
   - Se não → Processa com IA
3. **IA gera resposta empática**
4. **Sistema exibe resposta + recursos**
5. **Usuária pode escalar para humano**

## 🧪 Exemplo de Uso

### Situação Normal
```
Usuária: "Estou me sentindo perdida na minha relação"
AURA: "Obrigada por compartilhar isso comigo. É natural se sentir assim em relacionamentos difíceis. Gostaria de conversar sobre o que está acontecendo? Estou aqui para te ouvir sem julgamentos."
```

### Situação de Emergência
```
Usuária: "Ele está me batendo agora"
AURA: "🚨 SITUAÇÃO DE EMERGÊNCIA DETECTADA
Sua segurança é prioridade. Procure local seguro e:
[Botão: Ligar 190] [Botão: Conectar Humano]"
```

## 📞 Recursos de Apoio Integrados

- **Emergência**: 190 (Polícia Militar)
- **Central da Mulher**: 180 (24h, gratuito)
- **Direitos Humanos**: 100 (Disque 100)
- **Escalation**: Sistema de tickets para humanos

## 🔮 Próximos Passos (Roadmap)

- [ ] Integração com banco de dados para histórico
- [ ] Sistema de autenticação segura
- [ ] Chat por voz para acessibilidade
- [ ] Integração com serviços de localização
- [ ] Dashboard para atendentes humanos
- [ ] Métricas e analytics de segurança

## ⚖️ Considerações Legais e Éticas

- **Privacidade**: Não armazenamento de conversas sensíveis
- **Transparência**: Sistema identifica quando é IA vs humano
- **Responsabilidade**: Não substitui profissionais especializados
- **Acessibilidade**: Design inclusivo e responsivo

## 🤝 Contribuição

Este é um projeto educacional. Para contribuir:
1. Fork o repositório
2. Crie uma branch para sua feature
3. Desenvolva seguindo as práticas de segurança
4. Teste rigorosamente
5. Abra um Pull Request

## 📄 Licença

Este projeto é destinado apenas para fins educacionais e de demonstração.

---

**💜 Lembre-se: Buscar ajuda é um ato de coragem. Você não está sozinha.**