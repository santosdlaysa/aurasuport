import SupportChat from '@/components/SupportChat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            AURA — Assistente de Apoio e Resposta Humanizada
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-6">
            Um espaço seguro para conversar, buscar apoio e orientação. 
            Estamos aqui para ouvir, acolher e ajudar mulheres em situações difíceis.
          </p>
          
          {/* Important Notice */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 max-w-4xl mx-auto mb-8">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-sm font-medium text-amber-800">Aviso Importante</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Este é um <strong>protótipo educacional</strong> e não substitui serviços profissionais especializados. 
                  Em situações de risco imediato, procure ajuda profissional ou ligue para os números de emergência.
                </p>
              </div>
            </div>
          </div>

          {/* Emergency Numbers */}
          <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-red-100 border border-red-300 rounded-lg p-4">
              <div className="text-red-800">
                <h3 className="font-semibold text-sm">Emergência</h3>
                <p className="text-2xl font-bold">190</p>
                <p className="text-xs">Polícia Militar</p>
              </div>
            </div>
            
            <div className="bg-purple-100 border border-purple-300 rounded-lg p-4">
              <div className="text-purple-800">
                <h3 className="font-semibold text-sm">Central da Mulher</h3>
                <p className="text-2xl font-bold">180</p>
                <p className="text-xs">24h • Gratuito</p>
              </div>
            </div>
            
            <div className="bg-blue-100 border border-blue-300 rounded-lg p-4">
              <div className="text-blue-800">
                <h3 className="font-semibold text-sm">Direitos Humanos</h3>
                <p className="text-2xl font-bold">100</p>
                <p className="text-xs">Disque 100</p>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Component */}
        <SupportChat />

        {/* Footer Information */}
        <div className="mt-8 text-center">
          <div className="bg-white rounded-lg shadow-sm p-6 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recursos Adicionais de Apoio
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Serviços Nacionais</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>Central de Atendimento à Mulher:</strong> 180</li>
                  <li>• <strong>Delegacia da Mulher:</strong> Consulte sua cidade</li>
                  <li>• <strong>Casa da Mulher Brasileira:</strong> Atendimento integral</li>
                  <li>• <strong>Defensoria Pública:</strong> Assistência jurídica gratuita</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-700 mb-2">Aplicativos e Sites</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• <strong>PenhaS:</strong> App de segurança para mulheres</li>
                  <li>• <strong>Clique 180:</strong> Denúncia online</li>
                  <li>• <strong>Mapa do Acolhimento:</strong> Rede de apoio psicológico</li>
                  <li>• <strong>Instituto Maria da Penha:</strong> Informações e orientações</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                💜 Você não está sozinha. Buscar ajuda é um ato de coragem e autocuidado.
                Há uma rede de apoio disponível para te acolher e orientar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}