<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MARACA - Brasileirão de Série A | Jogo de Damas</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #090d16;
            color: #f1f5f9;
        }
        .hero-gradient {
            background: radial-gradient(circle at center, #3b0707 0%, #090d16 100%),
                        linear-gradient(135deg, rgba(220, 38, 38, 0.2) 0%, rgba(0, 0, 0, 0.9) 100%);
        }
        .card-glow {
            box-shadow: 0 10px 30px -5px rgba(220, 38, 38, 0.3), 0 0 20px rgba(245, 158, 11, 0.15);
        }
    </style>
</head>
<body class="min-h-screen flex flex-col justify-between">

    <!-- Header / Navbar -->
    <header class="w-full bg-slate-900/80 backdrop-blur border-b border-red-900/40 py-4 px-6 fixed top-0 left-0 z-50">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-slate-950 border border-amber-400 p-1 flex items-center justify-center shadow-lg">
                    <span class="text-xl">🔴</span>
                </div>
                <h1 class="text-xl font-extrabold bg-gradient-to-r from-red-500 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
                    MARACA - BRASILEIRÃO D.E SÉRIE A
                </h1>
            </div>
            <a href="https://rholzyck.github.io/DamaFlamengo/" target="_blank" class="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-bold text-sm shadow-lg transition transform hover:scale-105 flex items-center gap-2">
                <i class="fa-solid fa-gamepad"></i> JOGAR AGORA
            </a>
        </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 pt-24 pb-12 px-4 max-w-5xl mx-auto w-full">
        
        <!-- Hero Section -->
        <section class="hero-gradient rounded-3xl p-8 sm:p-12 mb-10 border border-red-900/50 card-glow text-center flex flex-col items-center">
            <span class="px-3 py-1 rounded-full bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider mb-4">
                Jogo Online de Damas Temático
            </span>
            <h2 class="text-3xl sm:text-5xl font-black mb-4 leading-tight">
                O Clássico Jogo de Damas com a Paixão do Futebol Brasileiro!
            </h2>
            <p class="text-slate-300 max-w-2xl text-base sm:text-lg mb-8 leading-relaxed">
                Desafie a Inteligência Artificial ou jogue contra amigos no <strong>MARACA - Brasileirão de Série A</strong>. 
                Dispute partidas com escudos 3D dos 13 maiores clubes do Brasil, mascotes oficiais, auras douradas e a emoção do campeonato.
            </p>
            <div class="flex flex-wrap gap-4 justify-center">
                <a href="https://rholzyck.github.io/DamaFlamengo/" target="_blank" class="px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 hover:from-red-500 hover:to-amber-400 text-white font-black text-lg shadow-xl transition transform hover:scale-105 flex items-center gap-3">
                    <i class="fa-solid fa-play"></i> Acessar o Jogo no GitHub Pages
                </a>
            </div>
        </section>

        <!-- Modos de Jogo -->
        <section class="mb-12">
            <h3 class="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                <i class="fa-solid fa-gamepad"></i> Modos de Jogo Disponíveis
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl hover:border-amber-500/40 transition">
                    <div class="text-amber-400 text-2xl mb-2"><i class="fa-solid fa-users"></i></div>
                    <h4 class="font-bold text-lg mb-1">2 Jogadores (PvP)</h4>
                    <p class="text-xs text-slate-400 leading-relaxed">Dispute partidas locais em tempo real contra amigos no mesmo dispositivo.</p>
                </div>
                <div class="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl hover:border-amber-500/40 transition">
                    <div class="text-amber-400 text-2xl mb-2"><i class="fa-solid fa-robot"></i></div>
                    <h4 class="font-bold text-lg mb-1">Vs Inteligência Artificial</h4>
                    <p class="text-xs text-slate-400 leading-relaxed">Enfrente o computador em 3 níveis de dificuldade (Fácil, Médio e Difícil - algoritmo Minimax com Poda Alpha-Beta).</p>
                </div>
                <div class="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl hover:border-amber-500/40 transition">
                    <div class="text-amber-400 text-2xl mb-2"><i class="fa-solid fa-trophy"></i></div>
                    <h4 class="font-bold text-lg mb-1">IA vs IA</h4>
                    <p class="text-xs text-slate-400 leading-relaxed">Assista a duelos táticos automatizados entre inteligências artificiais com estratégias avançadas.</p>
                </div>
                <div class="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl hover:border-amber-500/40 transition">
                    <div class="text-amber-400 text-2xl mb-2"><i class="fa-solid fa-bolt-lightning"></i></div>
                    <h4 class="font-bold text-lg mb-1">Simulador do Brasileirão</h4>
                    <p class="text-xs text-slate-400 leading-relaxed">Simule um campeonato inteiro e descubra quem será o grande Campeão da Série A!</p>
                </div>
            </div>
        </section>

        <!-- Principais Funcionalidades -->
        <section class="mb-12">
            <h3 class="text-2xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                <i class="fa-solid fa-star"></i> Principais Destaques & Recursos
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex gap-4">
                    <div class="text-red-500 text-3xl"><i class="fa-solid fa-shield-halved"></i></div>
                    <div>
                        <h4 class="font-bold text-base mb-1 text-slate-100">13 Clubes da Série A</h4>
                        <p class="text-xs text-slate-300 leading-relaxed">Peças estilizadas com os escudos vetoriais 3D oficiais e esquemas de cores do Flamengo, Vasco, Palmeiras, São Paulo, Corinthians, Santos, Grêmio, Internacional, Atlético-MG, Botafogo, Fluminense, Bahia e Cruzeiro.</p>
                    </div>
                </div>
                <div class="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex gap-4">
                    <div class="text-amber-400 text-3xl"><i class="fa-solid fa-crown"></i></div>
                    <div>
                        <h4 class="font-bold text-base mb-1 text-slate-100">Super Damas & Mascotes</h4>
                        <p class="text-xs text-slate-300 leading-relaxed">Ao promover uma peça a Dama, ela ganha uma aura dourada reluzente e o mascote oficial do clube (Urubu, Porco, Raposa, Galo, etc.).</p>
                    </div>
                </div>
                <div class="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex gap-4">
                    <div class="text-emerald-400 text-3xl"><i class="fa-solid fa-satellite-dish"></i></div>
                    <div>
                        <h4 class="font-bold text-base mb-1 text-slate-100">Partida IA Paralela ao Vivo</h4>
                        <p class="text-xs text-slate-300 leading-relaxed">Mini-tabuleiro no painel lateral exibindo confrontos simultâneos entre outras equipes do campeonato em tempo real.</p>
                    </div>
                </div>
                <div class="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl flex gap-4">
                    <div class="text-sky-400 text-3xl"><i class="fa-solid fa-clock"></i></div>
                    <div>
                        <h4 class="font-bold text-base mb-1 text-slate-100">Cronômetro & Série de 3 Jogos</h4>
                        <p class="text-xs text-slate-300 leading-relaxed">Partidas de 20 minutos com série de 3 jogos por confronto. Em caso de estouro do tempo, vencem as maiores capturas ou peças restantes.</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Final -->
        <section class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-amber-500/40 p-8 rounded-3xl text-center shadow-2xl">
            <h3 class="text-2xl font-black text-amber-400 mb-2">Pronto para Jogar?</h3>
            <p class="text-xs sm:text-sm text-slate-300 mb-6">Acesse agora diretamente pelo navegador no GitHub Pages, sem necessidade de instalação!</p>
            <a href="https://rholzyck.github.io/DamaFlamengo/" target="_blank" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm shadow-lg transition">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> https://rholzyck.github.io/DamaFlamengo/
            </a>
        </section>

    </main>

    <!-- Footer -->
    <footer class="w-full bg-slate-950 border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        <p>MARACA - Brasileirão de Série A &copy; 2026. Todos os direitos reservados.</p>
    </footer>

</body>
</html>
