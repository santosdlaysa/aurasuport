import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { reason, urgency = 'normal' } = await request.json();

    // Gera um ID único para o protocolo (simulação)
    const protocolId = `AURA-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Simula tempo de resposta baseado na urgência
    const responseTime = urgency === 'emergency' ? '5-10 minutos' : '15-30 minutos';
    
    // Log da solicitação (em produção, salvaria em banco de dados)
    console.log('Escalation request:', {
      protocolId,
      reason,
      urgency,
      timestamp: new Date().toISOString()
    });

    // Simula resposta de criação de ticket
    return NextResponse.json({
      success: true,
      protocolId,
      message: `Sua solicitação foi registrada com sucesso!

**Protocolo:** ${protocolId}

Uma de nossas especialistas em apoio à mulher entrará em contato em até ${responseTime}.

Enquanto isso:
• Mantenha-se em local seguro
• Tenha à mão os números de emergência (190, 180)
• Você pode continuar conversando comigo

**Lembre-se:** Em caso de perigo imediato, ligue 190.

Você foi muito corajosa ao buscar ajuda. Não está sozinha nessa jornada.`,
      
      estimatedResponse: responseTime,
      contactInfo: {
        emergency: process.env.NEXT_PUBLIC_EMERGENCY_NUMBER,
        womenHotline: process.env.NEXT_PUBLIC_WOMAN_HOTLINE
      },
      nextSteps: [
        'Uma especialista entrará em contato',
        'Mantenha o protocolo anotado',
        'Continue em local seguro',
        'Use números de emergência se necessário'
      ]
    });

  } catch (error) {
    console.error('Erro no endpoint escalate:', error);
    
    return NextResponse.json({
      success: false,
      message: `Sinto muito, mas não foi possível processar sua solicitação no momento.

**Alternativas imediatas:**
• **Central da Mulher: 180** (24h, gratuito)
• **Emergência: 190**
• **Direitos Humanos: 100**

Tente novamente em alguns minutos. Sua segurança é nossa prioridade.`,
      
      error: 'Erro temporário no sistema',
      contactInfo: {
        emergency: process.env.NEXT_PUBLIC_EMERGENCY_NUMBER,
        womenHotline: process.env.NEXT_PUBLIC_WOMAN_HOTLINE
      }
    }, { status: 500 });
  }
}

// Método GET para verificar status do sistema de escalation
export async function GET() {
  return NextResponse.json({
    status: 'Escalation service is active',
    availableUrgencyLevels: ['normal', 'urgent', 'emergency'],
    averageResponseTimes: {
      normal: '15-30 minutos',
      urgent: '10-20 minutos', 
      emergency: '5-10 minutos'
    },
    emergencyContacts: {
      police: process.env.NEXT_PUBLIC_EMERGENCY_NUMBER,
      womenHotline: process.env.NEXT_PUBLIC_WOMAN_HOTLINE
    }
  });
}