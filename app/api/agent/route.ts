import { NextRequest, NextResponse } from 'next/server';
import { 
  detectEmergency, 
  EMERGENCY_RESPONSE, 
  generateOfflineResponse
} from '@/lib/prompts';

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Mensagem é obrigatória' },
        { status: 400 }
      );
    }

    // Verifica se é uma situação de emergência ANTES de chamar a IA
    if (detectEmergency(message)) {
      return NextResponse.json({
        message: EMERGENCY_RESPONSE.message,
        isEmergency: true,
        actions: EMERGENCY_RESPONSE.actions,
        source: 'emergency_detection'
      });
    }

    // Se não é emergência, processa com respostas offline
    const offlineResponse = generateOfflineResponse(message);
    
    return NextResponse.json({
      message: offlineResponse,
      isEmergency: false,
      source: 'offline_response'
    });

  } catch (error) {
    console.error('Erro no endpoint do agente:', error);
    
    return NextResponse.json({
      message: `Sinto muito, mas estou enfrentando dificuldades técnicas no momento. 

Se você está em uma situação de emergência, por favor ligue imediatamente para:

• **Emergência: 190**
• **Central da Mulher: 180**

Sua segurança é o mais importante. Tente novamente em alguns minutos, e estarei aqui para te apoiar.`,
      isEmergency: false,
      source: 'error_response',
      error: 'Erro interno do servidor'
    }, { status: 500 });
  }
}

// Método GET para verificar se a API está funcionando
export async function GET() {
  return NextResponse.json({
    status: 'AURA API está funcionando OFFLINE',
    timestamp: new Date().toISOString(),
    mode: 'offline',
    tier: 'gratuito - sem APIs externas',
    emergency_numbers: {
      police: process.env.NEXT_PUBLIC_EMERGENCY_NUMBER,
      women_hotline: process.env.NEXT_PUBLIC_WOMAN_HOTLINE
    }
  });
}