// ============================================
// FIREBASE — CONFIGURAÇÃO
// Troque pelos valores que o Firebase te deu
// em Configurações do projeto > Seus apps
// ============================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  runTransaction,
  serverTimestamp,
  setDoc,
  arrayUnion,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD5-QQyI6NC4svwQ_rgPEfCk36GygR2pyU",
  authDomain: "casamento-lista-presente.firebaseapp.com",
  projectId: "casamento-lista-presente",
  storageBucket: "casamento-lista-presente.firebasestorage.app",
  messagingSenderId: "572003554062",
  appId: "1:572003554062:web:00dda9c5871d65b073fd5f",
  measurementId: "G-E8VJ1RHHX6",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const reservasRef = collection(db, "reservas");

// ============================================
// CATÁLOGO DE PRESENTES (continua fixo aqui)
// ============================================
const gifts = [
  {
    id: 1,
    name: "Aparelho De Jantar Porcelana ",
    cat: "Mesa Posta",
    desc: "Aparelho De Jantar Porcelana Flat Duna 20 Peças",
    price: "R$ 320",
    qty: 1,
    link: "https://www.havan.com.br/aparelho-de-jantar-porcelana-flat-duna-20-pecas-oxford/p",
  },
  {
    id: 2,
    name: "Toalha De Mesa",
    cat: "Mesa Posta",
    desc: "Toalha De Mesa 160Cm Athena Botanica.",
    price: "R$ 180",
    qty: 1,
    link: "https://www.pernambucanas.com.br/toalha-de-mesa-160cm-athena-botanica595096000000/p",
  },
  {
    id: 3,
    name: "Air Fryer",
    cat: "Cozinha",
    desc: "Philips Walita Fritadeira Airfryer",
    price: "R$ 580",
    qty: 1,
    link: "https://www.amazon.com.br/Fritadeira-Airfryer-Walita-Tecnologia-RapidAir/dp/B0D98VWP2V?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=A1ZZFT5FULY4LN&utm_source=chatgpt.com&th=1",
  },
  {
    id: 4,
    name: "Xícara Irish Coffe ",
    cat: "Mesa Posta",
    desc: "Xícara Irish Coffe Dynasty 230Ml.",
    price: "R$ 280",
    qty: 2,
    link: "https://www.havan.com.br/xicara-irish-coffe-dynasty-230ml-vidro/p",
  },
  {
    id: 5,
    name: "Aspirador de Pó",
    cat: "Utilidades",
    desc: "Aspirador de pó com filtro HEPA, 1200W, 30 min de autonomia.",
    price: "R$ 140",
    qty: 1,
    link: "https://loja.electrolux.com.br/aspirador-vertical-com-fio-ultra-electrolux-2-mm-1--stk15-/p?idsku=310118545&utm_source=chatgpt.comhttps://www.amazon.com.br/Aspirador-Pó-Com-Filtro-HEPA-1200W-30-min-Autonomia/dp/B0859N5JZQ?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=A1ZZFT5FULY4LN&th=1",
  },
  {
    id: 6,
    name: "Batedeira Planetária",
    cat: "Cozinha",
    desc: "Mondial BP-03W-2B com 12 Velocidades e 700W - Branca - 110V.",
    price: "R$ 180",
    qty: 1,
    link: "https://www.casasbahia.com.br/batedeira-planetaria-mondial-bp-03w-2b-com-12-velocidades-e-700w-branca/p/55048232?IdSku=55048232&idLojista=10037&tipoLojista=1P&utm_source=chatgpt.com&utm_medium=llm_iahttps://www.amazon.com.br/Batedeira-Planetária-500W-10-Velocidades-Cor-Prata/dp/B0859N5JZQ?source=ps-sl-shoppingads-lpcontext&ref_=fplfs&smid=A1ZZFT5FULY4LN&th=1",
  },
  {
    id: 7,
    name: "Cafeteira Nespresso",
    cat: "Cozinha",
    desc: "Essenza Mini Preta 110V.",
    price: "R$ 220",
    qty: 1,
    link: "https://www.nespresso.com/br/pt/order/machines/original/maquina-cafe-comprar-essenza-mini-preta-110v",
  },
  {
    id: 8,
    name: "Jogo de Cama",
    cat: "Quarto",
    desc: "Jogo de Cama Casal Harry Potter School of Wizard.",
    price: "R$ 1.200",
    qty: 1,
    link: "https://www.pernambucanas.com.br/jogo-de-cama-casal-harry-potter-school-of-wizard670791000000/p",
  },
  {
    id: 9,
    name: "Jogo de Cama",
    cat: "Quarto",
    desc: "Jogo de Cama Casal Harry Potter School of Wizard Line.",
    price: "R$ 350",
    qty: 1,
    link: "https://www.pernambucanas.com.br/jogo-de-cama-casal-harry-potter-school-of-wizard-line864915000000/p",
  },
  {
    id: 10,
    name: "Edredom Casal ",
    cat: "Quarto",
    desc: "Edredom Casal Harry Potter School of Wizard.",
    price: "R$ 260",
    qty: 1,
    link: "https://www.pernambucanas.com.br/edredom-casal-harry-potter-school-of-wizard499779000000/p",
  },
  {
    id: 11,
    name: "Mini Grill Oster ",
    cat: "Cozinha",
    desc: "MINI GRILL OSTER 2 em 1, 1000W, 110V, OGRL230.",
    price: "R$ 90",
    qty: 1,
    link: "https://www.amazon.com.br/GRILL-OSTER-1000W-110V-OGRL230/dp/B0BSP1XKYL/ref=pd_lpo_d_sccl_2/134-3338768-7108464?pd_rd_w=FXyKF&content-id=amzn1.sym.a2197dac-0fbe-4cc8-beca-b52f96ea33d5&pf_rd_p=a2197dac-0fbe-4cc8-beca-b52f96ea33d5&pf_rd_r=67HZP4P00JZ56M1KF8S0&pd_rd_wg=RPIT0&pd_rd_r=70b588c3-f304-4e9c-ba16-5064fa77bd84&pd_rd_i=B0BSP1XKYL&th=1",
  },
  {
    id: 12,
    name: "Jogo de Jantar Porcelana",
    cat: "Mesa Posta",
    desc: "Jogo de Jantar Porcelana com Filete de Ouro Imperial Havan Casa.",
    price: "R$ 420",
    qty: 1,
    link: "https://www.havan.com.br/jogo-de-jantar-porcelana-imperial-havan-casa-20-peas/p",
  },
  {
    id: 13,
    name: "Jogo De Colcha Casal",
    cat: "Quarto",
    desc: "Jogo De Colcha Casal Milão 150 Fios Corttex Verde.",
    price: "R$ 250",
    qty: 1,
    link: "https://www.pernambucanas.com.br/jogo-de-colcha-casal-milao-150-fios-corttex-verde-1e76886478uw2817/p",
  },
  {
    id: 14,
    name: "Jogo de Assadeiras",
    cat: "Cozinha",
    desc: "3 Peças Portuguesa Retangular Havan Casa - Branco",
    price: "R$ 430",
    qty: 1,
    link: "https://www.havan.com.br/jogo-de-assadeiras-retangular-portuguesa-havan-casa-3-pecas-branco/p",
  },
  {
    id: 15,
    name: "Secador",
    cat: "Utilidades",
    desc: "Secador Style 2000W 127V - Taiff.",
    price: "R$ 310",
    qty: 1,
    link: "https://www.pernambucanas.com.br/secador-taiff-style-2000w-127v-preto922908000000/p",
  },
  {
    id: 16,
    name: "Ferro de Passar ",
    cat: "Utilidades",
    desc: "Ferro de Passar a Vapor EasySpeed Philips Walita 220V Roxo.",
    price: "R$ 240",
    qty: 1,
    link: "https://www.pernambucanas.com.br/ferro-de-passar-a-vapor-easyspeed-philips-walita-220v-roxo959548000000/p",
  },
  {
    id: 17,
    name: "Jogo de Bowls Sobremesa",
    cat: "Mesa Posta",
    desc: "Jogo de Bowls Sobremesa Pearl 250Ml Hauskraft 6 peças.",
    price: "R$ 380",
    qty: 1,
    link: "https://www.havan.com.br/jogo-de-bowls-sobremesa-pearl-250-ml-hauskraft-6-peas/p",
  },
  {
    id: 18,
    name: "Boleira",
    cat: "Mesa Posta",
    desc: "Boleira com Tampa Ruvolo Modena 32Cm.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/boleira-com-tampa-ruvolo-modena-32cm-vidro-transparente/p",
  },
  {
    id: 19,
    name: "Jogo de Assadeiras de Vidro",
    cat: "Cozinha",
    desc: "Jogo de Assadeiras Retangular Sempre Nadir.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/jogo-de-assadeiras-retangular-sempre-nadir-2-peas/p",
  },
  {
    id: 20,
    name: "Taça de Gin ",
    cat: "Mesa Posta",
    desc: "Taça de Gin Aromas 600Ml Decormartin.",
    price: "R$ 130",
    qty: 2,
    link: "https://www.havan.com.br/taca-de-gin-aromas-600ml-decormartin-sortido/p",
  },
  {
    id: 21,
    name: "Jogo de Taças de Vinho",
    cat: "Mesa Posta",
    desc: "Jogo de Taças Água/Vinho 6 Peças Nadir 400Ml.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/jogo-de-tacas-agua-vinho-6-pecas-celebra-400ml-celebra/p",
  },
  {
    id: 22,
    name: "Jogo de Xícaras de Café ",
    cat: "Mesa Posta",
    desc: "Jogo de Xícaras de Café Montecarlo 80Ml Hauskraft 8 peças.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/jogo-de-xicaras-de-cafe-montecarlo-80ml-hauskraft-8-peas/p",
  },
  {
    id: 23,
    name: "Jarra de Vidro",
    cat: "Mesa Posta",
    desc: "Jarra de Vidro com Tampa de Plástico Clink 1 Litro.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/jarra-de-vidro-com-tampa-de-plastico-clink-1-litro-transparente-e-branco/p",
  },
  {
    id: 24,
    name: "Suporte para Xícaras",
    cat: "Cozinha",
    desc: "Suporte para Xícaras Eco Design Terra Brasil.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/pxicaras-de-chacafe-terra-brasil-eco-design-arthi-diversos/p",
  },
  {
    id: 25,
    name: "Bomboniere",
    cat: "Mesa Posta",
    desc: "Bomboniere Vidro Havan Casa 850Ml.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/bomboniere-vidro-havan-casa-850ml-sortido/p",
  },
  {
    id: 26,
    name: "Protetor de Colchão Casal",
    cat: "Quarto",
    desc: "Protetor de Colchão King Impermeável Havan Casa.",
    price: "R$ 130",
    qty: 2,
    link: "https://www.havan.com.br/protetor-de-colchao-king-impermeavel-havan-casa-areia/p",
  },
  {
    id: 27,
    name: "Toalha de Mesa",
    cat: "Mesa Posta",
    desc: "Toalha de Mesa Babados 140x140.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.pernambucanas.com.br/toalha-de-mesa-140x140-babados-off-white667450000000/p",
  },
  {
    id: 28,
    name: "Toalha De Mesa",
    cat: "Mesa Posta",
    desc: "Toalha De Mesa 1,40X1,40 M Listras Azul.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.pernambucanas.com.br/toalha-de-mesa-1-40x1-40-m-listras-azul566362000000/p",
  },
  {
    id: 29,
    name: "Toalha de Mesa",
    cat: "Mesa Posta",
    desc: "Toalha de Mesa em Algodão Estampado Pernambucanas Mesa.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.pernambucanas.com.br/trilho-de-mesa-35-cm-x-100-cm-athena-botanica594147000000/p",
  },
  {
    id: 30,
    name: "Edredom Casal",
    cat: "Quarto",
    desc: "Edredom Casal Microfibra Ket Flowers Verde.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.pernambucanas.com.br/edredom-casal-microfibra-rolinho-ket-flowers403357000000/p",
  },
  {
    id: 31,
    name: "Jogo De Cama",
    cat: "Quarto",
    desc: "Jogo De Cama Casal Toque Acetinado Altenburg Branco.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.pernambucanas.com.br/jogo-de-cama-casal-toque-acetinado-altenburg-branco-175s266916851fl7/p",
  },
  {
    id: 32,
    name: "Toalhas de Banho",
    cat: "Banheiro",
    desc: "Toalha Banhão 76x152 cm Harry Potter School of Wizard.",
    price: "R$ 130",
    qty: 2,
    link: "https://www.pernambucanas.com.br/toalha-banhao-76x152-cm-harry-potter-school-of-wizard788306000000/p",
  },
  {
    id: 33,
    name: "Toalhas de Banho",
    cat: "Banheiro",
    desc: "Jogo De Banho Liso Sortido Pnb.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.pernambucanas.com.br/jogo-de-banho-liso-sortido-pnb544335000000/p",
  },
  {
    id: 34,
    name: "Contribuição para o futuro filho que NÃO está nos planos ainda",
    cat: "URGENTE",
    desc: "Ainda não tá nos planos, mas o clima colabora 😄",
    price: "R$ 120",
    qty: 1,
    link: "",
  },
  {
    id: 35,
    name: 'Vale 1 "você estava certo(a)"',
    cat: "URGENTE",
    desc: "Pra usar naquela discussão que não vale a pena continuar 😄",
    price: "R$ 60",
    qty: 1,
    link: "",
  },
  {
    id: 36,
    name: "Contribuição para o futuro filho que NÃO está nos planos ainda",
    cat: "URGENTE",
    desc: "Ainda não tá nos planos, mas o clima colabora 😄",
    price: "R$ 120",
    qty: 1,
    link: "",
  },
  {
    id: 37,
    name: "💸 Pix para ajudar a pagar as escolhas duvidosas do casal",
    cat: "URGENTE",
    desc: "Porque nem toda decisão em casal é uma boa ideia.",
    price: "R$ 150",
    qty: 1,
    link: "",
  },
  {
    id: 38,
    name: "🛌 Fundo emergencial para uma cama maior",
    cat: "URGENTE",
    desc: "Porque o casal vai crescer (ou pelo menos os pets).",
    price: "R$ 130",
    qty: 1,
    link: "",
  },
  {
    id: 39,
    name: "🚿 Chuveiro para lavar a alma depois da discussão",
    cat: "URGENTE",
    desc: "Um banho resolve muita coisa.",
    price: "R$ 250",
    qty: 1,
    link: "",
  },
  {
    id: 40,
    name: "📺 Assinatura de streaming para decidir por 45 minutos o que assistir",
    cat: "URGENTE",
    desc: "O verdadeiro desafio do relacionamento.",
    price: "R$ 80",
    qty: 1,
    link: "",
  },
  {
    id: 41,
    name: "🧦 Kit de meias porque uma sempre desaparece misteriosamente",
    cat: "URGENTE",
    desc: "Pra onde elas vão, ninguém sabe.",
    price: "R$ 90",
    qty: 1,
    link: "",
  },
  {
    id: 42,
    name: '🥇 Troféu "quem estiver errado primeiro pede desculpas"',
    cat: "URGENTE",
    desc: "Prêmio de paz doméstica.",
    price: "R$ 500",
    qty: 1,
    link: "",
  },
  {
    id: 43,
    name: "🧳 Fundo para a lua de mel porque a realidade vai chegar",
    cat: "URGENTE",
    desc: "Aproveita antes das contas voltarem.",
    price: "R$ 400",
    qty: 1,
    link: "",
  },
  {
    id: 44,
    name: '💰 Fundo "o salário acabou e ainda faltam 20 dias"',
    cat: "URGENTE",
    desc: "Clássico de todo mês.",
    price: "R$ 280",
    qty: 1,
    link: "",
  },
  {
    id: 45,
    name: "Jogo de 4 Xícaras e 4 Pires Disney",
    cat: "Mesa Posta",
    desc: "Jogo de 4 Xícaras e 4 Pires Disney",
    price: "R$ 130",
    qty: 1,
    link: "https://www.avon.com.br/p/jogo-de-4-xicaras-e-4-pires-disney/AVNBRA-204463?position=10&listTitle=category+page+list+showcase+-+casa+estilo+cozinha+pratos",
  },
  {
    id: 46,
    name: "Jogo 4 Pratos Fundos Disney",
    cat: "Mesa Posta",
    desc: "Jogo 4 Pratos Fundos Disney",
    price: "R$ 130",
    qty: 1,
    link: "https://www.avon.com.br/p/jogo-4-pratos-fundos-disney/AVNBRA-204465?position=12&listTitle=category+page+list+showcase+-+casa+estilo+cozinha+pratos",
  },
  {
    id: 47,
    name: "Jogo 4 Pratos Fundos Esplendor",
    cat: "Mesa Posta",
    desc: "Jogo 4 Pratos Fundos Esplendor",
    price: "R$ 130",
    qty: 1,
    link: "https://www.avon.com.br/p/jogo-4-pratos-fundos-esplendor/AVNBRA-248202?position=20&listTitle=category+page+list+showcase+-+casa+estilo+cozinha+pratos",
  },
  {
    id: 48,
    name: "Jogo 4 Xícaras e 4 Pires Esplendor",
    cat: "Mesa Posta",
    desc: "Jogo 4 Xícaras e 4 Pires Esplendor",
    price: "R$ 130",
    qty: 1,
    link: "https://www.avon.com.br/p/jogo-4-xicaras-e-4-pires-esplendor/AVNBRA-248205?position=19&listTitle=category+page+list+showcase+-+casa+estilo+cozinha+pratos",
  },
  {
    id: 49,
    name: "Jogo 4 Pratos Rasos Esplendor",
    cat: "Mesa Posta",
    desc: "Jogo 4 Pratos Rasos Esplendor",
    price: "R$ 130",
    qty: 1,
    link: "https://www.avon.com.br/p/jogo-4-pratos-rasos-esplendor/AVNBRA-248232?position=21&listTitle=category+page+list+showcase+-+casa+estilo+cozinha+pratos",
  },
  {
    id: 50,
    name: "Kit Colcha Casal ",
    cat: "Quarto",
    desc: "Kit Colcha Casal Versalhes/Napoli Estampada Havan Casa 3 Peças - Floral Azul.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/kit-colcha-casal-versalhes-estampada-havan-casa-3-pcs-floral-azul/p",
  },
  {
    id: 51,
    name: "Kit Colcha Casal",
    cat: "Quarto",
    desc: "Kit Colcha Casal Lisa Versalhes/Napoli Havan Casa 3 Peças - Midnight Blue.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/kit-colcha-casal-100-poliester-lisa-versalhes-havan-casa-3-pcs-midnight-blue/p",
  },
  {
    id: 52,
    name: "Kit Colcha Casal",
    cat: "Quarto",
    desc: "Kit Colcha Casal Lisa Versalhes/Napoli Havan Casa 3 Peças - Verde.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/kit-colcha-casal-100-poliester-lisa-versalhes-havan-casa-3-pcs-verde/p",
  },
  {
    id: 53,
    name: "Kit Colcha Casal",
    cat: "Quarto",
    desc: "Kit Colcha Casal Estampada Versalhes/Napoli Havan Casa 3 Peças - Folhagens Verde.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/kit-colcha-casal-estampada-versalhes-3-pecas-havan-casa-folhagens-verde/p",
  },
  {
    id: 54,
    name: "Edredom Casal ",
    cat: "Quarto",
    desc: "Edredom Casal de Malha Tóquio/Mescla Milano Havan Casa - Grid",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/edredom-casal-de-malha-toquio-mescla-milano-havan-casa-grid/p",
  },
  {
    id: 55,
    name: "Cobertor Casal",
    cat: "Quarto",
    desc: "Cobertor Casal 100% Poliéster Premier Canelado Havan Casa - Verde Capri",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/cobertor-casal-100-poliester-premier-canelado-havan-casa-verde-capri/p",
  },
  {
    id: 56,
    name: "Sousplat ",
    cat: "Mesa Posta",
    desc: "Sousplat Basic Havan - Azul Marinho",
    price: "R$ 130",
    qty: 1,
    link: "https://www.havan.com.br/sousplat-basic-havan-azul-marinho/p",
  },
  {
    id: 57,
    name: "Rack para TV",
    cat: "Sala de Estar",
    desc: "Rack para TV Até 75",
    price: "R$ 130",
    qty: 1,
    link: "https://homedock.com.br/products/rack-para-tv-at-75-2-gavetas-2-portas-jasper-185-cm-canella-c-champanhe",
  },
  {
    id: 58,
    name: "Smart TV ",
    cat: "Sala de Estar",
    desc: "Smart TV TCL 50 Polegadas QLED 4K P7K WiFi Bluetooth Google TV HDR10+ Dolby Atmos Dolby Vision 50P7K.",
    price: "R$ 130",
    qty: 1,
    link: "https://www.lojatcl.com.br/smart-tv-tcl-50-polegadas-qled-4k-p7k-wifi-bluetooth-google-tv-hdr10-dolby-atmos-dolby-vision-50p7k/p",
  },
  {
    id: 59,
    name: "Potes Herméticos",
    cat: "Cozinha",
    desc: "Potes Herméticos Electrolux de Plástico Branco Retangular com 20 Unidades.",
    price: "R$ 130",
    qty: 1,
    link: "https://loja.electrolux.com.br/conjunto-de-potes-hermeticos-de-plastico-electrolux-20-unidades/p",
  },
  {
    id: 60,
    name: "Potes Herméticos",
    cat: "Cozinha",
    desc: "Potes Herméticos Porta-Mantimentos com Tampa de Bambu.",
    price: "R$ 130",
    qty: 1,
    link: "https://loja.electrolux.com.br/potes-hermeticos-porta-mantimentos-com-tampa-de-bambu-electrolux/p",
  },
];

let reserved = {}; // { [giftId]: nomeDoConvidado }  — vem do Firestore
let contributions = {}; // { [giftId]: [nome1, nome2, ...] } — só pra itens de Gincana
let activeFilter = "all";
let pendingId = null;
let showCount = 30;

const cats = ["all", ...new Set(gifts.map((g) => g.cat))];

function buildFilters() {
  const el = document.getElementById("filters");
  el.innerHTML = "";
  cats.forEach((c) => {
    const b = document.createElement("button");
    b.className = "filter-btn" + (c === activeFilter ? " active" : "");
    b.textContent = c === "all" ? "Todos" : c;
    b.onclick = () => {
      activeFilter = c;
      showCount = 30;
      buildFilters();
      render();
    };
    el.appendChild(b);
  });
}

function render() {
  const grid = document.getElementById("grid");
  const filtered =
    activeFilter === "all"
      ? gifts
      : gifts.filter((g) => g.cat === activeFilter);
  const list = activeFilter === "all" ? filtered.slice(0, showCount) : filtered;
  grid.innerHTML = "";
  document.querySelector(".show-more-btn")?.remove();

  if (!list.length) {
    grid.innerHTML =
      '<div class="no-results">Nenhum presente nessa categoria.</div>';
    return;
  }

  list.forEach((g) => {
    const isGincana = g.cat === "URGENTE";
    const isRes = !isGincana && !!reserved[g.id];
    const contributors = contributions[g.id] || [];
    const card = document.createElement("div");
    card.className = "gift-card" + (isRes ? " reserved" : "");
    card.innerHTML = `
      ${isRes ? '<div class="reserved-tag">Reservado</div>' : ""}
      <div class="gift-cat">${g.cat}</div>
      <div class="gift-name">${g.name}</div>
      <div class="gift-desc">${g.desc}${g.qty > 1 ? ` <span class="gift-qty">(${g.qty} unid.)</span>` : ""}</div>
      ${isGincana ? `<div class="gift-price">${g.price}</div>` : ""}
      ${
        isGincana
          ? `
        <div class="gift-pix">
          <img src="img/pix-qrcode.png" alt="QR Code Pix" class="gift-qr" />
          <span class="gift-pix-label">Pix pra contribuir direto</span>
        </div>
      `
          : ""
      }
      ${g.link ? `<a href="${g.link}" target="_blank" rel="noopener noreferrer" class="gift-link">Ver produto ↗</a>` : ""}
      <div class="gift-bottom">
        <button class="reserve-btn" ${isRes ? "disabled" : ""} data-id="${g.id}">
          ${isGincana ? "Contribuir" : isRes ? "Reservado" : "Reservar"}
        </button>
      </div>
    `;
    if (!isRes)
      card.querySelector(".reserve-btn").onclick = () => openModal(g.id);
    grid.appendChild(card);
  });

  const resCount = Object.keys(reserved).length;
  document.getElementById("avail").textContent = gifts.length - resCount;
  document.getElementById("res").textContent = resCount;

  if (activeFilter === "all" && showCount < filtered.length) {
    const moreBtn = document.createElement("button");
    moreBtn.className = "show-more-btn";
    moreBtn.textContent = "Mostrar mais";
    moreBtn.onclick = () => {
      showCount += 30;
      render();
    };
    grid.after(moreBtn);
  }
}

function openModal(id) {
  pendingId = id;
  document.getElementById("modal-name").textContent = gifts.find(
    (g) => g.id === id,
  ).name;
  document.getElementById("modal-input").value = "";
  document.getElementById("modal").classList.remove("hidden");
  setTimeout(() => document.getElementById("modal-input").focus(), 80);
}

function closeModal() {
  document.getElementById("modal").classList.add("hidden");
  pendingId = null;
}

// ============================================
// RESERVAR PRESENTE — grava no Firestore
// Usa transaction pra impedir que dois
// convidados reservem o mesmo item ao mesmo tempo
// ============================================
async function confirmReserve() {
  const name = document.getElementById("modal-input").value.trim();
  if (!name) {
    document.getElementById("modal-input").focus();
    return;
  }

  const confirmBtn = document.getElementById("btn-confirm");
  confirmBtn.disabled = true;
  confirmBtn.textContent = "Enviando...";

  const gift = gifts.find((g) => g.id === pendingId);
  const giftId = String(pendingId);
  const ref = doc(db, "reservas", giftId);

  try {
    if (gift.cat === "URGENTE") {
      await setDoc(
        ref,
        {
          presente: gift.name,
          contribuintes: arrayUnion(name),
        },
        { merge: true },
      );
      closeModal();
      showToast("Contribuição registrada! Obrigado. 🤍");
    } else {
      await runTransaction(db, async (transaction) => {
        const docSnap = await transaction.get(ref);
        if (docSnap.exists()) {
          throw new Error("already-reserved");
        }
        transaction.set(ref, {
          presente: gift.name,
          convidado: name,
          reservadoEm: serverTimestamp(),
        });
      });
      closeModal();
      showToast("Presente reservado! Obrigado. 🤍");
    }
  } catch (err) {
    closeModal();
    if (err.message === "already-reserved") {
      showToast("Ops! Esse presente acabou de ser reservado por outra pessoa.");
    } else {
      console.error(err);
      showToast("Erro ao registrar. Tente novamente.");
    }
  } finally {
    confirmBtn.disabled = false;
    confirmBtn.textContent = "Reservar";
  }
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 3000);
}

document.getElementById("btn-cancel").onclick = closeModal;
document.getElementById("btn-confirm").onclick = confirmReserve;
document.getElementById("modal").onclick = (e) => {
  if (e.target === document.getElementById("modal")) closeModal();
};
document.getElementById("modal-input").onkeydown = (e) => {
  if (e.key === "Enter") confirmReserve();
};

// ============================================
// ESCUTA O FIRESTORE EM TEMPO REAL
// Toda vez que alguém reserva algo (de qualquer
// dispositivo), a tela de todos atualiza sozinha
// ============================================
onSnapshot(reservasRef, (snapshot) => {
  reserved = {};
  contributions = {};
  snapshot.forEach((docSnap) => {
    const data = docSnap.data();
    if (data.contribuintes) {
      contributions[docSnap.id] = data.contribuintes;
    } else {
      reserved[docSnap.id] = data.convidado;
    }
  });
  render();
});

buildFilters();
