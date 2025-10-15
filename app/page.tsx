import SupportChat from '@/components/SupportChat';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative z-10">
        {/* Logo and Title */}
        <div className="text-center mb-8 sm:mb-10 animate-fadeInDown">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full shadow-2xl">
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-4 sm:mb-6 px-2 drop-shadow-2xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-pink-100 to-purple-100">
              AURA
            </span>
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-white/95 mb-2">
            Assistente de Apoio e Resposta Humanizada
          </p>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl mx-auto mb-4 sm:mb-6 px-4 leading-relaxed">
            Um espaço seguro para conversar, buscar apoio e orientação.
            Estamos aqui para ouvir, acolher e ajudar mulheres em situações difíceis.
          </p>
          <div className="flex items-center justify-center gap-2 text-white/70 text-xs sm:text-sm">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">💜 Apoio</span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">🔒 Privado</span>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">🤝 Acolhimento</span>
          </div>
        </div>
          
        {/* Important Notice */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300/50 backdrop-blur-sm rounded-2xl p-4 sm:p-6 max-w-4xl mx-auto mb-6 sm:mb-8 shadow-xl animate-fadeIn">
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="flex-shrink-0 bg-amber-200 p-2 rounded-full">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left flex-1">
              <h3 className="text-sm sm:text-base font-bold text-amber-900 mb-2 flex items-center gap-2">
                ⚠️ Aviso Importante
              </h3>
              <p className="text-xs sm:text-sm text-amber-800 leading-relaxed">
                Este é um <strong className="font-bold">protótipo educacional</strong> e não substitui serviços profissionais especializados.
                Em situações de risco imediato, procure ajuda profissional ou ligue para os números de emergência.
              </p>
            </div>
          </div>
        </div>

        {/* Emergency Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto mb-8 sm:mb-10 px-4 sm:px-0">
          <div className="group relative bg-white/95 backdrop-blur-md border-2 border-red-200 rounded-2xl p-5 sm:p-6 shadow-2xl hover:shadow-red-300/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden animate-fadeInUp">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="bg-red-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-black text-xs sm:text-sm uppercase tracking-wider mb-2 text-red-900">🚨 Emergência</h3>
              <p className="text-5xl sm:text-6xl font-black my-3 bg-gradient-to-br from-red-600 to-red-800 bg-clip-text text-transparent">190</p>
              <p className="text-xs font-semibold text-red-700">Polícia Militar</p>
            </div>
          </div>

          <div className="group relative bg-white/95 backdrop-blur-md border-2 border-purple-200 rounded-2xl p-5 sm:p-6 shadow-2xl hover:shadow-purple-300/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden animate-fadeInUp animation-delay-200">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="bg-purple-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-black text-xs sm:text-sm uppercase tracking-wider mb-2 text-purple-900">💜 Central da Mulher</h3>
              <p className="text-5xl sm:text-6xl font-black my-3 bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">180</p>
              <p className="text-xs font-semibold text-purple-700">24h • Gratuito</p>
            </div>
          </div>

          <div className="group relative bg-white/95 backdrop-blur-md border-2 border-blue-200 rounded-2xl p-5 sm:p-6 shadow-2xl hover:shadow-blue-300/50 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 overflow-hidden animate-fadeInUp animation-delay-400">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 text-center">
              <div className="bg-blue-100 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-black text-xs sm:text-sm uppercase tracking-wider mb-2 text-blue-900">🛡️ Direitos Humanos</h3>
              <p className="text-5xl sm:text-6xl font-black my-3 bg-gradient-to-br from-blue-600 to-blue-800 bg-clip-text text-transparent">100</p>
              <p className="text-xs font-semibold text-blue-700">Disque 100</p>
            </div>
          </div>
        </div>

        {/* Chat Component */}
        <SupportChat />

        {/* Footer Information */}
        <div className="mt-8 sm:mt-12 text-center px-4 sm:px-0 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 max-w-5xl mx-auto border-2 border-purple-200/30">
            <div className="mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-2">
                Recursos Adicionais de Apoio
              </h3>
              <p className="text-xs sm:text-sm text-gray-500">Você tem uma rede de apoio disponível</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 text-left">
              <div className="group relative bg-gradient-to-br from-purple-50 via-purple-50/50 to-white p-5 sm:p-6 rounded-2xl border-2 border-purple-200/50 hover:border-purple-400/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-purple-100 rounded-full filter blur-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-purple-100 p-2.5 rounded-xl mr-3 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h4 className="font-black text-base sm:text-lg text-gray-800">Serviços Nacionais</h4>
                  </div>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-3">
                    <li className="flex items-start bg-white/60 p-2.5 rounded-lg hover:bg-white transition-colors">
                      <span className="text-purple-500 mr-2 text-base">→</span>
                      <span><strong className="text-purple-700">Central de Atendimento à Mulher:</strong> 180</span>
                    </li>
                    <li className="flex items-start bg-white/60 p-2.5 rounded-lg hover:bg-white transition-colors">
                      <span className="text-purple-500 mr-2 text-base">→</span>
                      <span><strong className="text-purple-700">Delegacia da Mulher:</strong> Consulte sua cidade</span>
                    </li>
                    <li className="flex items-start bg-white/60 p-2.5 rounded-lg hover:bg-white transition-colors">
                      <span className="text-purple-500 mr-2 text-base">→</span>
                      <span><strong className="text-purple-700">Casa da Mulher Brasileira:</strong> Atendimento integral</span>
                    </li>
                    <li className="flex items-start bg-white/60 p-2.5 rounded-lg hover:bg-white transition-colors">
                      <span className="text-purple-500 mr-2 text-base">→</span>
                      <span><strong className="text-purple-700">Defensoria Pública:</strong> Assistência jurídica gratuita</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-pink-50 via-pink-50/50 to-white p-5 sm:p-6 rounded-2xl border-2 border-pink-200/50 hover:border-pink-400/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 right-0 w-20 h-20 bg-pink-100 rounded-full filter blur-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="bg-pink-100 p-2.5 rounded-xl mr-3 group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h4 className="font-black text-base sm:text-lg text-gray-800">Aplicativos e Sites</h4>
                  </div>
                  <ul className="text-xs sm:text-sm text-gray-700 space-y-3">
                    <li className="flex items-start bg-white/60 p-2.5 rounded-lg hover:bg-white transition-colors">
                      <span className="text-pink-500 mr-2 text-base">→</span>
                      <span><strong className="text-pink-700">App de segurança:</strong> App de segurança para mulheres</span>
                    </li>
                    <li className="flex items-start bg-white/60 p-2.5 rounded-lg hover:bg-white transition-colors">
                      <span className="text-pink-500 mr-2 text-base">→</span>
                      <span><strong className="text-pink-700">Clique 180:</strong> Denúncia online</span>
                    </li>
                    <li className="flex items-start bg-white/60 p-2.5 rounded-lg hover:bg-white transition-colors">
                      <span className="text-pink-500 mr-2 text-base">→</span>
                      <span><strong className="text-pink-700">Mapa do Acolhimento:</strong> Rede de apoio psicológico</span>
                    </li>
                    <li className="flex items-start bg-white/60 p-2.5 rounded-lg hover:bg-white transition-colors">
                      <span className="text-pink-500 mr-2 text-base">→</span>
                      <span><strong className="text-pink-700">Instituto Maria da Penha:</strong> Informações e orientações</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-6 border-t-2 border-gradient-to-r from-purple-200 to-pink-200">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 sm:p-6 rounded-2xl">
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
                  💜 <strong className="text-purple-700">Você não está sozinha.</strong> Buscar ajuda é um ato de coragem e autocuidado.
                  Há uma rede de apoio disponível para te acolher e orientar.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}