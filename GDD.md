# Game Design Document (GDD) - MARACA: Brasileirão de Série A (Damas)

## 1. Visão Geral do Projeto
**MARACA - Brasileirão de Série A** é um jogo de Damas temático e interativo baseado no Campeonato Brasileiro de Futebol (Série A). O jogo combina as regras clássicas de damas com identidade visual dos 13 maiores clubes do Brasil (escudos 3D em SVG, mascotes e gritos de torcida).

## 2. Estrutura do Projeto
```
meu-jogo/
├── index.html
├── style.css
├── script.js
├── GDD.md
└── assets/
    ├── imagens/
    ├── sons/
    └── fontes/
```

## 3. Funcionalidades Principais
* **Modos de Jogo:**
  * 2 Jogadores (Local PvP)
  * Contra Inteligência Artificial (Fácil, Médio, Difícil)
  * IA vs IA (Partida de exibição)
  * Simulador Completo do Campeonato (Gera o Campeão Único da Série A)
* **Motor de Regras:**
  * Movimentos e capturas obrigatórias de Damas.
  * Promoção para Dama com aura dourada e mascote do clube.
  * Regra do Cronômetro (20 minutos por partida).
  * Série de 3 partidas por confronto.
* **Inteligência Artificial (Minimax com Poda Alpha-Beta):**
  * Avaliação posicional tática (avanço de peças, controle de centro, proteção de linha de fundo).
* **Partida IA Paralela:**
  * Um mini-tabuleiro no painel lateral simula jogos entre outras equipes em tempo real.
* **Galeria de Títulos:**
  * Estatísticas históricas e conquistas dos 13 clubes da Série A.

## 4. Tecnologias Utilizadas
* **HTML5 Canvas:** Renderização 2D/3D interativa do tabuleiro e efeitos visuais (partículas, iluminação).
* **Tailwind CSS & FontAwesome:** Interface moderna, responsiva e tematizada.
* **Tone.js:** Síntese de áudio e efeitos sonoros para peças, capturas e vitória.
* **JavaScript (ES6+):** Lógica do jogo, inteligência artificial e estado da competição.
