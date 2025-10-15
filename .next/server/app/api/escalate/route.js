"use strict";(()=>{var e={};e.id=326,e.ids=[326],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},514:(e,o,a)=>{a.r(o),a.d(o,{originalPathname:()=>g,patchFetch:()=>x,requestAsyncStorage:()=>l,routeModule:()=>u,serverHooks:()=>d,staticGenerationAsyncStorage:()=>p});var t={};a.r(t),a.d(t,{GET:()=>m,POST:()=>c});var s=a(9303),n=a(8716),r=a(670),i=a(7070);async function c(e){try{let{reason:o,urgency:a="normal"}=await e.json(),t=`AURA-${Date.now()}-${Math.random().toString(36).substr(2,9).toUpperCase()}`,s="emergency"===a?"5-10 minutos":"15-30 minutos";return console.log("Escalation request:",{protocolId:t,reason:o,urgency:a,timestamp:new Date().toISOString()}),i.NextResponse.json({success:!0,protocolId:t,message:`Sua solicita\xe7\xe3o foi registrada com sucesso!

**Protocolo:** ${t}

Uma de nossas especialistas em apoio \xe0 mulher entrar\xe1 em contato em at\xe9 ${s}.

Enquanto isso:
• Mantenha-se em local seguro
• Tenha \xe0 m\xe3o os n\xfameros de emerg\xeancia (190, 180)
• Voc\xea pode continuar conversando comigo

**Lembre-se:** Em caso de perigo imediato, ligue 190.

Voc\xea foi muito corajosa ao buscar ajuda. N\xe3o est\xe1 sozinha nessa jornada.`,estimatedResponse:s,contactInfo:{emergency:"190",womenHotline:"180"},nextSteps:["Uma especialista entrar\xe1 em contato","Mantenha o protocolo anotado","Continue em local seguro","Use n\xfameros de emerg\xeancia se necess\xe1rio"]})}catch(e){return console.error("Erro no endpoint escalate:",e),i.NextResponse.json({success:!1,message:`Sinto muito, mas n\xe3o foi poss\xedvel processar sua solicita\xe7\xe3o no momento.

**Alternativas imediatas:**
• **Central da Mulher: 180** (24h, gratuito)
• **Emerg\xeancia: 190**
• **Direitos Humanos: 100**

Tente novamente em alguns minutos. Sua seguran\xe7a \xe9 nossa prioridade.`,error:"Erro tempor\xe1rio no sistema",contactInfo:{emergency:"190",womenHotline:"180"}},{status:500})}}async function m(){return i.NextResponse.json({status:"Escalation service is active",availableUrgencyLevels:["normal","urgent","emergency"],averageResponseTimes:{normal:"15-30 minutos",urgent:"10-20 minutos",emergency:"5-10 minutos"},emergencyContacts:{police:"190",womenHotline:"180"}})}let u=new s.AppRouteRouteModule({definition:{kind:n.x.APP_ROUTE,page:"/api/escalate/route",pathname:"/api/escalate",filename:"route",bundlePath:"app/api/escalate/route"},resolvedPagePath:"C:\\Users\\ldsantos\\WebstormProjects\\agentewoman\\app\\api\\escalate\\route.ts",nextConfigOutput:"",userland:t}),{requestAsyncStorage:l,staticGenerationAsyncStorage:p,serverHooks:d}=u,g="/api/escalate/route";function x(){return(0,r.patchFetch)({serverHooks:d,staticGenerationAsyncStorage:p})}}};var o=require("../../../webpack-runtime.js");o.C(e);var a=e=>o(o.s=e),t=o.X(0,[276,972],()=>a(514));module.exports=t})();