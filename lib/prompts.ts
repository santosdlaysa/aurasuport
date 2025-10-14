export const SYSTEM_PROMPT = `Você é AURA — Assistente de Apoio e Resposta Humanizada.

Seu papel é ouvir, acolher e orientar mulheres em situação de violência doméstica, familiar ou de gênero.

DIRETRIZES FUNDAMENTAIS:
- Sempre responda com empatia, sem julgamento e com foco na segurança
- Use linguagem acolhedora, respeitosa e não intimidadora
- Nunca minimize ou questione a experiência da pessoa
- Priorize sempre a segurança da pessoa em primeiro lugar
- Não forneça conselhos médicos ou jurídicos definitivos
- Incentive a busca por ajuda profissional quando apropriado
- Mantenha conversas focadas em apoio e orientação segura

TIPOS DE RESPOSTA:
1. Para situações de risco imediato: instrua a procurar local seguro e ligar para emergência
2. Para outras situações: ofereça apoio emocional, informações sobre recursos disponíveis e orientações de segurança

RECURSOS IMPORTANTES:
- Emergência: 190 (Polícia Militar)
- Central de Atendimento à Mulher: 180
- Disque Direitos Humanos: 100

Lembre-se: você está aqui para apoiar, não para julgar. Cada mulher conhece melhor sua situação.`;

export const EMERGENCY_KEYWORDS = [
  // Violência física imediata
  'está me batendo',
  'está me agredindo',
  'ele está aqui',
  'ele chegou',
  'ele está bêbado',
  'ele está furioso',
  'me bateu',
  'me agrediu',
  'estou sendo agredida',
  'estou sendo espancada',
  'ele me machucou',
  'estou com medo agora',
  'preciso de ajuda agora',
  'emergência',
  'socorro',
  'me ajuda',
  'ele vai me matar',
  'tenho medo que ele me mate',
  'não consigo sair',
  'estou presa',
  'ele trancou a porta',
  'estou escondida',
  'ele está procurando',
  // Ameaças diretas
  'ameaçou me matar',
  'disse que vai me matar',
  'tem uma arma',
  'pegou uma faca',
  'vai me machucar',
  // Situações de perigo iminente
  'estou com muito medo',
  'ele está violento',
  'não sei o que fazer',
  'preciso sair agora'
];

export const EMERGENCY_RESPONSE = {
  message: `🚨 **SITUAÇÃO DE EMERGÊNCIA DETECTADA**

Sua segurança é prioridade absoluta. Se você está em perigo imediato:

1. **PROCURE UM LOCAL SEGURO** - Vá para um cômodo com saída, evite cozinha e banheiro
2. **LIGUE IMEDIATAMENTE PARA 190** - Polícia Militar (emergência)
3. **Se não puder falar, use o app ou SMS** - Envie sua localização

**Números importantes:**
• **Emergência: 190**
• **Central da Mulher: 180**
• **Direitos Humanos: 100**

Você não está sozinha. Há pessoas prontas para ajudar você.`,
  
  isEmergency: true,
  
  actions: [
    {
      type: 'call',
      label: 'Ligar para 190',
      number: '190'
    },
    {
      type: 'escalate',
      label: 'Conectar com atendente humano',
      action: 'human_support'
    }
  ]
};

export function detectEmergency(message: string): boolean {
  const lowerMessage = message.toLowerCase();
  return EMERGENCY_KEYWORDS.some(keyword => 
    lowerMessage.includes(keyword.toLowerCase())
  );
}

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

// Sistema de respostas offline inteligentes
const EMOTION_KEYWORDS = {
  sadness: ['triste', 'tristeza', 'chorando', 'choro', 'deprimida', 'depressa', 'abatida'],
  fear: ['medo', 'assustada', 'aterrorizada', 'nervosa', 'ansiosa', 'preocupada', 'tensa'],
  anger: ['raiva', 'furiosa', 'irritada', 'brava', 'ódio', 'indignada'],
  confusion: ['confusa', 'perdida', 'não sei', 'dúvida', 'incerta', 'não entendo'],
  guilt: ['culpa', 'culpada', 'envergonhada', 'constrangida'],
  hope: ['esperança', 'força', 'melhorar', 'sair dessa', 'recomeçar']
};

const SITUATION_KEYWORDS = {
  relationship: ['relacionamento', 'marido', 'namorado', 'companheiro', 'parceiro', 'ex'],
  family: ['família', 'pai', 'irmão', 'parente', 'casa', 'filhos'],
  work: ['trabalho', 'chefe', 'emprego', 'colega'],
  financial: ['dinheiro', 'financeira', 'dependente', 'trabalhar', 'sustentar'],
  legal: ['denúncia', 'polícia', 'advogado', 'direitos', 'lei'],
  support: ['ajuda', 'apoio', 'conversar', 'desabafar', 'orientação']
};

const RESPONSES = {
  sadness: [
    `Entendo que você está passando por um momento muito difícil. É natural sentir tristeza quando estamos enfrentando situações complicadas. Quero que saiba que seus sentimentos são válidos e que você não está sozinha.

**Lembre-se:**
• Você é mais forte do que imagina
• Buscar ajuda é um ato de coragem
• Suas emoções são importantes e merecem ser acolhidas

**Recursos de apoio:**
• Central da Mulher: 180 (24h, gratuito)
• Mapa do Acolhimento: apoio psicológico gratuito

Como posso te apoiar melhor neste momento?`,

    `Percebo que você está carregando uma dor muito grande. Quero que saiba que reconheço sua coragem ao compartilhar isso comigo, mesmo estando triste.

**É importante saber que:**
• Chorar é uma forma saudável de expressar emoções
• Você merece cuidado e carinho
• Não há problema em pedir ajuda

**Cuidados que podem ajudar:**
• Converse com pessoas de confiança
• Busque momentos de autocuidado
• Consider apoio profissional

Estou aqui para te ouvir. O que mais está pesando no seu coração?`
  ],

  fear: [
    `Reconheço que você está com medo, e isso é uma reação natural diante de situações ameaçadoras. Sua segurança é o mais importante, e é muito corajoso você buscar ajuda.

**Para sua segurança:**
• Confie nos seus instintos
• Mantenha contatos de emergência sempre acessíveis
• Planeje rotas de fuga se necessário

**Números de emergência:**
• 190 - Em caso de perigo imediato
• 180 - Central da Mulher (24h)

**Estratégias que podem ajudar:**
• Identifique pessoas de confiança
• Tenha um local seguro em mente
• Guarde documentos importantes em local seguro

Você quer conversar sobre o que está causando esse medo?`,

    `Entendo que você está assustada. O medo é um sinal importante que nosso corpo nos dá, e é fundamental levá-lo a sério.

**Lembre-se:**
• Você conhece melhor sua situação
• Confie na sua intuição
• Priorize sempre sua segurança

**Recursos disponíveis:**
• App PenhaS - botão de pânico
• Central da Mulher: 180
• Delegacia da Mulher mais próxima

Estou aqui para te apoiar. Como posso ajudar você a se sentir mais segura?`
  ],

  confusion: [
    `É compreensível você se sentir confusa diante de uma situação complexa. Relacionamentos abusivos podem criar muita confusão mental, e isso é normal.

**Sinais importantes para observar:**
• Você se sente "pisando em ovos" ao redor da pessoa?
• Sua autoestima diminuiu no relacionamento?
• Você evita certas conversas ou ações por medo da reação?
• Sente que perdeu contato com amigos/família?

**Lembre-se:**
• Confusão mental é comum em relacionamentos abusivos
• Você tem o direito de ser tratada com respeito
• Não é sua culpa

**Recursos para esclarecimentos:**
• Instituto Maria da Penha (website)
• Central da Mulher: 180 (orientações)
• Mapa do Acolhimento (apoio psicológico)

Quer conversar sobre o que está te deixando confusa?`,

    `Entendo sua confusão. Às vezes, quando estamos muito próximas de uma situação, fica difícil enxergar com clareza. Isso não é falha sua.

**Perguntas que podem ajudar:**
• Como você se sentia antes desta relação/situação?
• O que seus amigos e família pensam?
• Você se sente livre para expressar suas opiniões?

**É importante saber:**
• Você merece relacionamentos saudáveis
• Suas necessidades e sentimentos importam
• Confusão pode ser resultado de manipulação

Estou aqui para te ajudar a organizar seus pensamentos. O que mais te preocupa?`
  ],

  relationship: [
    `Relacionamentos podem ser complexos, mas é fundamental que sejam baseados no respeito mútuo, carinho e segurança. Se você está questionando seu relacionamento, já é um passo importante.

**Sinais de relacionamento saudável:**
• Respeito às suas opiniões e decisões
• Liberdade para manter amizades e família
• Comunicação sem medo ou intimidação
• Apoio aos seus sonhos e objetivos

**Sinais de alerta:**
• Controle excessivo sobre suas atividades
• Isolamento de amigos e família
• Humilhações ou desprezo
• Qualquer forma de violência

**Recursos especializados:**
• Central da Mulher: 180
• Delegacias especializadas
• Casas de apoio à mulher

Você gostaria de conversar sobre aspectos específicos do seu relacionamento?`,

    `Entendo que você está passando por dificuldades no relacionamento. Quero que saiba que você merece amor, respeito e segurança sempre.

**Lembre-se:**
• Você tem o direito de ser tratada com dignidade
• Nenhuma forma de violência é aceitável
• Você não é responsável pelo comportamento do outro

**Se você está considerando sair:**
• Planeje com segurança
• Busque apoio de pessoas confiáveis
• Conheça seus direitos legais
• Tenha documentos organizados

**Apoio disponível:**
• Casas de apoio temporário
• Assistência jurídica gratuita
• Apoio psicológico especializado

Como posso te apoiar neste momento?`
  ],

  support: [
    `Que bom que você está buscando apoio! Reconhecer que precisamos de ajuda é um ato de força e autocuidado. Estou aqui para te ouvir e orientar.

**Tipos de apoio disponíveis:**
• **Emocional**: Terapia, grupos de apoio, amigos confiáveis
• **Jurídico**: Defensoria Pública, advogados especializados
• **Social**: Assistência social, abrigos, programas governamentais
• **Emergencial**: 190, 180, Bombeiros

**Rede de apoio especializada:**
• Mapa do Acolhimento - apoio psicológico
• Instituto Maria da Penha - informações
• ONGs locais de apoio à mulher

**Lembre-se:**
• Você merece todo o apoio possível
• Não há problema em precisar de ajuda
• Cada passo conta, mesmo os pequenos

O que você sente que mais precisa neste momento: apoio emocional, informações práticas, ou orientação sobre próximos passos?`,

    `Estou muito orgulhosa de você por buscar apoio. Isso mostra sua força e determinação em cuidar de si mesma.

**Formas de apoio que você pode buscar:**
• **Conversas**: Com pessoas de confiança, profissionais, grupos
• **Informações**: Sobre direitos, recursos, opções disponíveis
• **Apoio prático**: Financeiro, habitacional, jurídico
• **Cuidado emocional**: Terapia, autocuidado, atividades prazerosas

**Passos que você pode dar:**
• Identifique pessoas de confiança ao seu redor
• Conheça os recursos disponíveis na sua cidade
• Cuide da sua saúde mental e física
• Mantenha documentos importantes organizados

Estou aqui para conversar sobre qualquer coisa que você precisar. Como você está se sentindo hoje?`
  ],

  general: [
    `Olá, eu sou a AURA. Obrigada por confiar em mim para conversar. Estou aqui para te ouvir, acolher e apoiar, sem qualquer julgamento.

**Você pode conversar comigo sobre:**
• Seus sentimentos e preocupações
• Situações difíceis que está enfrentando
• Dúvidas sobre relacionamentos
• Necessidade de orientação e apoio

**Lembre-se sempre:**
• Seus sentimentos são válidos
• Você merece respeito e cuidado
• Buscar ajuda é um ato de coragem
• Você não está sozinha

**Recursos sempre disponíveis:**
• Central da Mulher: 180 (24h)
• Emergência: 190
• Direitos Humanos: 100

Como você está se sentindo hoje? Estou aqui para te escutar.`,

    `Que bom ter você aqui! Sou a AURA e meu objetivo é oferecer um espaço seguro para você se expressar e receber apoio.

**Este é um espaço onde você pode:**
• Falar sobre seus sentimentos sem medo
• Buscar orientações sobre situações difíceis
• Receber informações sobre recursos de apoio
• Ser ouvida com empatia e respeito

**Princípios que me guiam:**
• Sem julgamentos ou críticas
• Foco na sua segurança e bem-estar
• Respeito às suas decisões e tempo
• Apoio incondicional

**Sempre lembre:**
• Você é mais forte do que imagina
• Merece amor e respeito
• Tem direito à felicidade e segurança

O que você gostaria de compartilhar comigo hoje?`
  ]
};

export function generateOfflineResponse(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Detecta emoções principais
  const detectedEmotion = Object.entries(EMOTION_KEYWORDS).find(([emotion, keywords]) =>
    keywords.some(keyword => lowerMessage.includes(keyword))
  )?.[0];

  // Detecta contexto da situação
  const detectedSituation = Object.entries(SITUATION_KEYWORDS).find(([situation, keywords]) =>
    keywords.some(keyword => lowerMessage.includes(keyword))
  )?.[0];

  // Seleciona resposta baseada no contexto detectado
  if (detectedEmotion && RESPONSES[detectedEmotion as keyof typeof RESPONSES]) {
    const emotionResponses = RESPONSES[detectedEmotion as keyof typeof RESPONSES];
    return emotionResponses[Math.floor(Math.random() * emotionResponses.length)];
  }

  if (detectedSituation && RESPONSES[detectedSituation as keyof typeof RESPONSES]) {
    const situationResponses = RESPONSES[detectedSituation as keyof typeof RESPONSES];
    return situationResponses[Math.floor(Math.random() * situationResponses.length)];
  }

  // Resposta geral se não detectar contexto específico
  const generalResponses = RESPONSES.general;
  return generalResponses[Math.floor(Math.random() * generalResponses.length)];
}