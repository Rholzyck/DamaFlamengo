// CORE GAME CONSTANTS & AUDIO ENGINE
        const BOARD_SIZE = 8;
        const PLAYER_WHITE = 1;
        const PLAYER_BLACK = 2;
        let soundEnabled = true;

        function playSound(type) {
            if (!soundEnabled || typeof Tone === 'undefined') return;
            try {
                if (Tone.context.state !== 'running') {
                    Tone.start();
                }
                const synth = new Tone.Synth().toDestination();
                if (type === 'move') {
                    synth.triggerAttackRelease('E4', '16n');
                } else if (type === 'capture') {
                    synth.triggerAttackRelease('G5', '8n');
                } else if (type === 'king') {
                    synth.triggerAttackRelease('C6', '4n');
                } else if (type === 'win') {
                    const poly = new Tone.PolySynth().toDestination();
                    poly.triggerAttackRelease(['C4', 'E4', 'G4', 'C5'], '4n');
                }
            } catch (e) {
                // Graceful fallback for browser audio autoplay restrictions
            }
        }

        // LISTA COMPLETA DE TIMES DA SÉRIE A DO BRASILEIRÃO (COM ESCUDOS VETORIAIS 3D E HISTÓRICO DE TÍTULOS)
        const SERIE_A_RIVAIS = [
            { 
                id: 'flamengo', 
                name: 'Flamengo', 
                icon: 'CRF', 
                mascot: '🦅', 
                phrase: 'MENGÃO CAMPEÃO!', 
                primaryColor: '#dc2626', 
                secondaryColor: '#111111', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><defs><linearGradient id="flamGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ff3333"/><stop offset="50%" stop-color="%23dc2626"/><stop offset="100%" stop-color="%237f1d1d"/></linearGradient><linearGradient id="goldBevel" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ffe066"/><stop offset="50%" stop-color="%23facc15"/><stop offset="100%" stop-color="%23854d0e"/></linearGradient><filter id="shadow3d" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="%23000000" flood-opacity="0.6"/></filter></defs><path d="M 5 5 H 95 V 40 C 95 85, 75 108, 50 118 C 25 108, 5 85, 5 40 Z" fill="url(%23goldBevel)" filter="url(%23shadow3d)"/><path d="M 9 9 H 91 V 39 C 91 81, 72 103, 50 113 C 28 103, 9 81, 9 39 Z" fill="%23111111"/><path d="M 9 28 H 91 V 46 H 9 Z M 9 64 H 91 V 82 H 9 Z M 16 98 H 84 V 106 C 72 112, 60 114, 50 114 C 40 114, 28 112, 16 98 Z" fill="url(%23flamGrad)"/><rect x="9" y="9" width="46" height="42" fill="%23111111" stroke="url(%23goldBevel)" stroke-width="2"/><text x="32" y="36" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="%23ffffff" text-anchor="middle" filter="url(%23shadow3d)">CRF</text><path d="M 9 9 H 91 V 39 C 91 81, 72 103, 50 113 C 28 103, 9 81, 9 39 Z" fill="none" stroke="%23ffffff" stroke-opacity="0.3" stroke-width="2"/></svg>',
                brasileiraoCount: 8,
                brasileiraoYears: "1980, 1982, 1983, 1987, 1992, 2009, 2019, 2020",
                otherTitles: "3x Libertadores, 4x Copa do Brasil, 1x Mundial Intercontinental",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'vasco', 
                name: 'Vasco', 
                icon: '✠', 
                mascot: '⚓', 
                phrase: 'CHUTA BACALHAU!', 
                primaryColor: '#000000', 
                secondaryColor: '#ffffff', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><defs><linearGradient id="silver3d" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ffffff"/><stop offset="50%" stop-color="%23cbd5e1"/><stop offset="100%" stop-color="%2364748b"/></linearGradient><linearGradient id="cross3d" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ef4444"/><stop offset="50%" stop-color="%23dc2626"/><stop offset="100%" stop-color="%237f1d1d"/></linearGradient><filter id="sh3d" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="%23000000" flood-opacity="0.7"/></filter></defs><path d="M 8 8 H 92 V 50 C 92 88, 50 114, 50 114 C 50 114, 8 88, 8 50 Z" fill="url(%23silver3d)" filter="url(%23sh3d)"/><path d="M 12 12 H 88 V 48 C 88 83, 50 108, 50 108 C 50 108, 12 83, 12 48 Z" fill="%230b0f19"/><polygon points="86,15 14,97 26,105 94,22" fill="url(%23silver3d)" filter="url(%23sh3d)"/><g transform="translate(50, 48) scale(0.95)" filter="url(%23sh3d)"><path d="M 0 -22 L -14 -30 L -7 -14 L -22 -7 L -14 0 L -22 7 L -7 14 L -14 30 L 0 22 L 14 30 L 7 14 L 22 7 L 14 0 L 22 -7 L 7 -14 L 14 -30 Z" fill="url(%23cross3d)" stroke="%23ffffff" stroke-width="1.5"/></g></svg>',
                brasileiraoCount: 4,
                brasileiraoYears: "1974, 1989, 1997, 2000",
                otherTitles: "1x Libertadores, 1x Copa do Brasil, 1x Sul-Americano 1948",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'palmeiras', 
                name: 'Palmeiras', 
                icon: 'Ⓟ', 
                mascot: '🐷', 
                phrase: 'VAI DE RETRO!', 
                primaryColor: '#006437', 
                secondaryColor: '#ffffff', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="palm3d" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="%2310b981"/><stop offset="50%" stop-color="%23006437"/><stop offset="100%" stop-color="%23022c22"/></radialGradient><linearGradient id="goldRim" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fef08a"/><stop offset="50%" stop-color="%23eab308"/><stop offset="100%" stop-color="%23854d0e"/></linearGradient><filter id="sh3d" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="%23000000" flood-opacity="0.6"/></filter></defs><circle cx="50" cy="50" r="47" fill="url(%23goldRim)" filter="url(%23sh3d)"/><circle cx="50" cy="50" r="43" fill="url(%23palm3d)"/><circle cx="50" cy="50" r="34" fill="none" stroke="%23ffffff" stroke-width="2.5"/><text x="50" y="25" font-family="Arial, sans-serif" font-weight="900" font-size="8" fill="%23ffffff" text-anchor="middle" letter-spacing="1">PALMEIRAS</text><circle cx="50" cy="55" r="20" fill="%23ffffff" filter="url(%23sh3d)"/><text x="50" y="63" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="%23006437" text-anchor="middle">P</text></svg>',
                brasileiraoCount: 12,
                brasileiraoYears: "1960, 1967, 1967, 1969, 1972, 1973, 1993, 1994, 2016, 2018, 2022, 2023",
                otherTitles: "3x Libertadores, 4x Copa do Brasil, 1x Copa Rio 1951",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'saopaulo', 
                name: 'São Paulo', 
                icon: 'Ⓢ', 
                mascot: '🧙', 
                phrase: 'AQUI É MENGÃO!', 
                primaryColor: '#cc0000', 
                secondaryColor: '#ffffff', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110"><defs><linearGradient id="spfcRed" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ef4444"/><stop offset="100%" stop-color="%23991b1b"/></linearGradient><linearGradient id="spfcGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fef08a"/><stop offset="100%" stop-color="%23ca8a04"/></linearGradient><filter id="sh3d"><feDropShadow dx="2" dy="3" stdDeviation="2" flood-color="%23000000" flood-opacity="0.6"/></filter></defs><polygon points="25,4 28,11 35,11 29,15 31,22 25,18 19,22 21,15 15,11 22,11" fill="url(%23spfcRed)" filter="url(%23sh3d)"/><polygon points="50,1 53,8 60,8 54,12 56,19 50,15 44,19 46,12 40,8 47,8" fill="url(%23spfcGold)" filter="url(%23sh3d)"/><polygon points="75,4 78,11 85,11 79,15 81,22 75,18 69,22 71,15 65,11 72,11" fill="url(%23spfcRed)" filter="url(%23sh3d)"/><g transform="translate(0, 14)" filter="url(%23sh3d)"><path d="M 8 8 H 92 V 32 L 50 98 L 8 32 Z" fill="%23ffffff" stroke="%23ca8a04" stroke-width="3"/><rect x="10" y="10" width="80" height="22" fill="%23111111"/><text x="50" y="26" font-family="Arial, sans-serif" font-weight="900" font-size="12" fill="%23ffffff" text-anchor="middle" letter-spacing="1">S. P. F. C.</text><polygon points="12,32 50,32 50,92 12,32" fill="url(%23spfcRed)"/><polygon points="88,32 50,32 50,92 88,32" fill="%23111111"/><path d="M 8 8 H 92 V 32 L 50 98 L 8 32 Z" fill="none" stroke="%23ffffff" stroke-width="2" stroke-opacity="0.5"/></g></svg>',
                brasileiraoCount: 6,
                brasileiraoYears: "1977, 1986, 1991, 2006, 2007, 2008",
                otherTitles: "3x Libertadores, 3x Mundiais de Clubes, 1x Copa do Brasil",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'corinthians', 
                name: 'Corinthians', 
                icon: 'Ⓒ', 
                mascot: '🦅', 
                phrase: 'ATROPELADO!', 
                primaryColor: '#111111', 
                secondaryColor: '#ffffff', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><defs><linearGradient id="anchorRed" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23f87171"/><stop offset="50%" stop-color="%23dc2626"/><stop offset="100%" stop-color="%237f1d1d"/></linearGradient><filter id="sh3d"><feDropShadow dx="2" dy="3" stdDeviation="2.5" flood-color="%23000000" flood-opacity="0.7"/></filter></defs><g filter="url(%23sh3d)"><path d="M 18 18 L 82 102 M 82 18 L 18 102" stroke="url(%23anchorRed)" stroke-width="7" stroke-linecap="round"/><circle cx="18" cy="18" r="5" fill="%23dc2626"/><circle cx="82" cy="18" r="5" fill="%23dc2626"/><path d="M 50 8 V 112 M 33 107 C 50 117, 50 117, 67 107" fill="none" stroke="url(%23anchorRed)" stroke-width="7" stroke-linecap="round"/></g><circle cx="50" cy="55" r="39" fill="%23111111" stroke="%23ffffff" stroke-width="3" filter="url(%23sh3d)"/><circle cx="50" cy="55" r="33" fill="%23ffffff"/><path d="M 26 40 H 74 V 70 H 26 Z" fill="%23111111"/><path d="M 34 40 V 70 M 50 40 V 70 M 66 40 V 70" stroke="%23ffffff" stroke-width="5"/><circle cx="50" cy="55" r="33" fill="none" stroke="%23dc2626" stroke-width="4"/><text x="50" y="32" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="%23111111" text-anchor="middle">S.C. CORINTHIANS</text><text x="50" y="85" font-family="Arial, sans-serif" font-weight="900" font-size="9" fill="%23111111" text-anchor="middle">PAULISTA</text></svg>',
                brasileiraoCount: 7,
                brasileiraoYears: "1990, 1998, 1999, 2005, 2011, 2015, 2017",
                otherTitles: "2x Mundiais da FIFA, 1x Libertadores, 3x Copa do Brasil",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'santos', 
                name: 'Santos', 
                icon: 'Ⓢ', 
                mascot: '🐳', 
                phrase: 'PESCOU PEIXE!', 
                primaryColor: '#ffffff', 
                secondaryColor: '#000000', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><defs><linearGradient id="goldStar" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fef08a"/><stop offset="100%" stop-color="%23ca8a04"/></linearGradient><linearGradient id="san3d" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ffffff"/><stop offset="100%" stop-color="%23cbd5e1"/></linearGradient><filter id="sh3d"><feDropShadow dx="2" dy="3" stdDeviation="2.5" flood-color="%23000000" flood-opacity="0.6"/></filter></defs><g transform="translate(0, 12)" filter="url(%23sh3d)"><polygon points="36,-2 40,6 49,6 42,11 44,19 36,15 28,19 30,11 23,6 32,6" fill="url(%23goldStar)"/><polygon points="64,-2 68,6 77,6 70,11 72,19 64,15 56,19 58,11 51,6 60,6" fill="url(%23goldStar)"/><path d="M 8 6 H 92 V 46 C 92 78, 50 102, 50 102 C 50 102, 8 78, 8 46 Z" fill="url(%23san3d)" stroke="%23111111" stroke-width="4"/><path d="M 24 38 V 87 M 40 30 V 99 M 56 22 V 99 M 72 14 V 87" stroke="%23111111" stroke-width="8"/><polygon points="8,6 92,6 8,46" fill="url(%23san3d)" stroke="%23111111" stroke-width="2"/><text x="40" y="29" font-family="Arial, sans-serif" font-weight="900" font-size="14" fill="%23111111" text-anchor="middle" transform="rotate(-25, 40, 29)">S.F.C.</text></g></svg>',
                brasileiraoCount: 8,
                brasileiraoYears: "1961, 1962, 1963, 1964, 1965, 1968, 2002, 2004",
                otherTitles: "3x Libertadores, 2x Mundiais Intercontinentais, 1x Copa do Brasil",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'gremio', 
                name: 'Grêmio', 
                icon: 'Ⓖ', 
                mascot: '🗡️', 
                phrase: 'SAI PRA LÁ!', 
                primaryColor: '#0d80bf', 
                secondaryColor: '#ffffff', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="grem3d" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="%2338bdf8"/><stop offset="60%" stop-color="%230d80bf"/><stop offset="100%" stop-color="%230369a1"/></radialGradient><linearGradient id="silverRim" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ffffff"/><stop offset="100%" stop-color="%2394a3b8"/></linearGradient><filter id="sh3d"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="%23000000" flood-opacity="0.6"/></filter></defs><circle cx="50" cy="50" r="47" fill="url(%23silverRim)" filter="url(%23sh3d)"/><circle cx="50" cy="50" r="43" fill="url(%23grem3d)"/><path d="M 9 50 H 91 M 19 24 H 81 M 19 76 H 81" stroke="%23111111" stroke-width="6"/><rect x="14" y="37" width="72" height="26" fill="%23ffffff" rx="4" filter="url(%23sh3d)"/><text x="50" y="55" font-family="Arial, sans-serif" font-weight="900" font-size="16" fill="%23111111" text-anchor="middle" letter-spacing="1">GREMIO</text></svg>',
                brasileiraoCount: 2,
                brasileiraoYears: "1981, 1996",
                otherTitles: "3x Libertadores, 5x Copa do Brasil, 1x Mundial Intercontinental",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'inter', 
                name: 'Internacional', 
                icon: 'Ⓘ', 
                mascot: '🎩', 
                phrase: 'VENCEU O MENGÃO!', 
                primaryColor: '#e30613', 
                secondaryColor: '#ffffff', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="int3d" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="%23ff4d4d"/><stop offset="50%" stop-color="%23e30613"/><stop offset="100%" stop-color="%23880000"/></radialGradient><linearGradient id="goldRing" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fef08a"/><stop offset="100%" stop-color="%23ca8a04"/></linearGradient><filter id="sh3d"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="%23000000" flood-opacity="0.6"/></filter></defs><circle cx="50" cy="50" r="47" fill="url(%23goldRing)" filter="url(%23sh3d)"/><circle cx="50" cy="50" r="43" fill="url(%23int3d)"/><circle cx="50" cy="50" r="36" fill="none" stroke="%23ffffff" stroke-width="2.5"/><text x="50" y="60" font-family="Arial, sans-serif" font-weight="900" font-size="26" fill="%23ffffff" text-anchor="middle" filter="url(%23sh3d)">SCI</text></svg>',
                brasileiraoCount: 3,
                brasileiraoYears: "1975, 1976, 1979 (Invicto)",
                otherTitles: "2x Libertadores, 1x Mundial da FIFA, 1x Copa do Brasil",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'atleticomg', 
                name: 'Atlético-MG', 
                icon: 'Ⓐ', 
                mascot: '🐓', 
                phrase: 'BICOU A ZEBRA!', 
                primaryColor: '#000000', 
                secondaryColor: '#ffffff', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><defs><linearGradient id="goldStar" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fef08a"/><stop offset="100%" stop-color="%23ca8a04"/></linearGradient><linearGradient id="camBlack" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23334155"/><stop offset="100%" stop-color="%230f172a"/></linearGradient><filter id="sh3d"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="%23000000" flood-opacity="0.7"/></filter></defs><polygon points="50,1 54,11 65,11 56,18 59,28 50,22 41,28 44,18 35,11 46,11" fill="url(%23goldStar)" filter="url(%23sh3d)"/><g transform="translate(0, 10)" filter="url(%23sh3d)"><path d="M 8 12 H 92 V 48 C 92 86, 50 110, 50 110 C 50 110, 8 86, 8 48 Z" fill="url(%23camBlack)" stroke="%23ffffff" stroke-width="4"/><path d="M 24 40 V 94 M 40 40 V 104 M 56 40 V 104 M 72 40 V 94" stroke="%23ffffff" stroke-width="9"/><rect x="10" y="12" width="80" height="30" fill="url(%23camBlack)"/><text x="50" y="35" font-family="Arial, sans-serif" font-weight="900" font-size="22" fill="%23ffffff" text-anchor="middle" letter-spacing="3">CAM</text></g></svg>',
                brasileiraoCount: 3,
                brasileiraoYears: "1937, 1971, 2021",
                otherTitles: "1x Libertadores, 2x Copa do Brasil, 2x Copa Conmebol",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'botafogo', 
                name: 'Botafogo', 
                icon: '★', 
                mascot: '⭐', 
                phrase: 'FOGO APAGADO!', 
                primaryColor: '#000000', 
                secondaryColor: '#ffffff', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><defs><linearGradient id="silverBorder" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ffffff"/><stop offset="50%" stop-color="%23cbd5e1"/><stop offset="100%" stop-color="%2364748b"/></linearGradient><linearGradient id="starGlow" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ffffff"/><stop offset="100%" stop-color="%23e2e8f0"/></linearGradient><filter id="sh3d"><feDropShadow dx="2" dy="4" stdDeviation="3.5" flood-color="%23000000" flood-opacity="0.8"/></filter></defs><path d="M 8 8 H 92 V 50 C 92 88, 50 114, 50 114 C 50 114, 8 88, 8 50 Z" fill="url(%23silverBorder)" filter="url(%23sh3d)"/><path d="M 12 12 H 88 V 48 C 88 83, 50 108, 50 108 C 50 108, 12 83, 12 48 Z" fill="%23090d16"/><polygon points="50,23 55,40 72,40 58,50 63,67 50,57 37,67 42,50 28,40 45,40" fill="url(%23starGlow)" filter="url(%23sh3d)"/></svg>',
                brasileiraoCount: 2,
                brasileiraoYears: "1968, 1995",
                otherTitles: "1x Copa Libertadores, 1x Copa Conmebol",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'fluminense', 
                name: 'Fluminense', 
                icon: 'Ⓕ', 
                mascot: '🎩', 
                phrase: 'FORA TRICOLOR!', 
                primaryColor: '#8a05be', 
                secondaryColor: '#ffffff', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><defs><linearGradient id="fluGarnet" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23b91c1c"/><stop offset="100%" stop-color="%237f1d1d"/></linearGradient><linearGradient id="fluGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fef08a"/><stop offset="100%" stop-color="%23b45309"/></linearGradient><filter id="sh3d"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="%23000000" flood-opacity="0.7"/></filter></defs><path d="M 8 8 H 92 V 50 C 92 88, 50 114, 50 114 C 50 114, 8 88, 8 50 Z" fill="url(%23fluGold)" filter="url(%23sh3d)"/><path d="M 12 12 H 88 V 48 C 88 83, 50 108, 50 108 C 50 108, 12 83, 12 48 Z" fill="url(%23fluGarnet)"/><path d="M 12 12 L 50 108 L 88 12" stroke="%23047857" stroke-width="7"/><text x="50" y="58" font-family="Arial, sans-serif" font-weight="900" font-size="24" fill="%23ffffff" text-anchor="middle" filter="url(%23sh3d)">FFC</text></svg>',
                brasileiraoCount: 4,
                brasileiraoYears: "1970, 1984, 2010, 2012",
                otherTitles: "1x Copa Libertadores, 1x Copa do Brasil, 1x Recopa Sul-Americana",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'bahia', 
                name: 'Bahia', 
                icon: 'Ⓑ', 
                mascot: '🦸', 
                phrase: 'BAHIA VENCIDO!', 
                primaryColor: '#0055a5', 
                secondaryColor: '#ea1d24', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><defs><linearGradient id="bahBlue" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%232563eb"/><stop offset="100%" stop-color="%231e3a8a"/></linearGradient><linearGradient id="bahGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fef08a"/><stop offset="100%" stop-color="%23ca8a04"/></linearGradient><filter id="sh3d"><feDropShadow dx="2" dy="3" stdDeviation="2.5" flood-color="%23000000" flood-opacity="0.6"/></filter></defs><g transform="translate(0, 10)" filter="url(%23sh3d)"><polygon points="35,1 38,8 45,8 39,12 41,19 35,15 29,19 31,12 25,8 32,8" fill="url(%23bahGold)"/><polygon points="65,1 68,8 75,8 69,12 71,19 65,15 59,19 61,12 55,8 62,8" fill="url(%23bahGold)"/><circle cx="50" cy="58" r="43" fill="url(%23bahBlue)" stroke="%23ffffff" stroke-width="3"/><circle cx="50" cy="58" r="34" fill="%23ffffff" stroke="%23dc2626" stroke-width="3"/><rect x="25" y="40" width="50" height="36" fill="%23ffffff" stroke="%231e3a8a" stroke-width="1.5"/><rect x="25" y="40" width="22" height="18" fill="%231e3a8a"/><polygon points="36,44 37.5,48 41,48 38,50 39,54 36,52 33,54 34,50 31,48 34.5,48" fill="%23ffffff"/><rect x="25" y="58" width="50" height="9" fill="%23dc2626"/><rect x="47" y="40" width="28" height="9" fill="%23dc2626"/></g></svg>',
                brasileiraoCount: 2,
                brasileiraoYears: "1959, 1988",
                otherTitles: "4x Copa do Nordeste, 50x Campeonato Baiano",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'cruzeiro', 
                name: 'Cruzeiro', 
                icon: '🦊', 
                mascot: '🦊', 
                phrase: 'FOX CABULOSA!', 
                primaryColor: '#003a70', 
                secondaryColor: '#ffffff', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><radialGradient id="cruz3d" cx="35%" cy="35%" r="65%"><stop offset="0%" stop-color="%231d4ed8"/><stop offset="50%" stop-color="%23003a70"/><stop offset="100%" stop-color="%230f172a"/></radialGradient><linearGradient id="goldCrown" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23fef08a"/><stop offset="100%" stop-color="%23ca8a04"/></linearGradient><filter id="sh3d"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="%23000000" flood-opacity="0.7"/></filter></defs><circle cx="50" cy="50" r="47" fill="url(%23cruz3d)" stroke="%23ffffff" stroke-width="4" filter="url(%23sh3d)"/><circle cx="50" cy="50" r="40" fill="none" stroke="%23ffffff" stroke-width="1.5" stroke-dasharray="3 3"/><g fill="%23ffffff" filter="url(%23sh3d)"><polygon points="50,18 52,23 57,23 53,26 55,31 50,28 45,31 47,26 43,23 48,23"/><polygon points="50,68 52,73 57,73 53,76 55,81 50,78 45,81 47,76 43,73 48,73"/><polygon points="26,45 28,50 33,50 29,53 31,58 26,55 21,58 23,53 19,50 24,50"/><polygon points="74,45 76,50 81,50 77,53 79,58 74,55 69,58 71,53 67,50 72,50"/><polygon points="60,56 61.5,60 65,60 62,62 63,66 60,64 57,66 58,62 55,60 58.5,60"/></g><path d="M 38 10 L 42 14 L 50 8 L 58 14 L 62 10 L 60 17 H 40 Z" fill="url(%23goldCrown)" filter="url(%23sh3d)"/></svg>',
                brasileiraoCount: 4,
                brasileiraoYears: "1966, 2003, 2013, 2014",
                otherTitles: "2x Libertadores, 6x Copa do Brasil, 2x Supercopa Libertadores",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            },
            { 
                id: 'athleticopr', 
                name: 'Athletico-PR', 
                icon: 'CAP', 
                mascot: '🌪️', 
                phrase: 'FURACÃO RUBRO-NEGRO!', 
                primaryColor: '#c2410c', 
                secondaryColor: '#111111', 
                logoUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120"><defs><linearGradient id="capRed" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23ef4444"/><stop offset="100%" stop-color="%23991b1b"/></linearGradient><filter id="sh3d"><feDropShadow dx="2" dy="4" stdDeviation="3" flood-color="%23000000" flood-opacity="0.7"/></filter></defs><path d="M 10 10 L 90 10 L 75 110 L 25 110 Z" fill="%23111111" stroke="%23c2410c" stroke-width="4" filter="url(%23sh3d)"/><path d="M 20 20 L 40 20 L 25 90 L 15 90 Z" fill="url(%23capRed)"/><path d="M 45 20 L 65 20 L 50 90 L 40 90 Z" fill="url(%23capRed)"/><path d="M 70 20 L 85 20 L 75 90 L 65 90 Z" fill="url(%23capRed)"/><text x="50" y="50" font-family="Arial, sans-serif" font-weight="900" font-size="20" fill="%23ffffff" text-anchor="middle" filter="url(%23sh3d)">CAP</text></svg>',
                brasileiraoCount: 1,
                brasileiraoYears: "2001",
                otherTitles: "2x Copa Sul-Americana, 1x Copa do Brasil",
                pts: 0, pj: 0, v: 0, e: 0, d: 0, sp: 0 
            }
        ];

        // EXIBIÇÃO DA GALERIA DE TÍTULOS DO CLUBE
        function showTeamTitlesModalByTeamId(teamId) {
            const team = SERIE_A_RIVAIS.find(t => t.id === teamId);
            if (team) showTeamTitlesModal(team);
        }

        function showTeamTitlesModal(team) {
            const modal = document.getElementById('modal-team-titles');
            const nameEl = document.getElementById('modal-team-name');
            const mascotEl = document.getElementById('modal-team-mascot');
            const countEl = document.getElementById('modal-team-brasileirao-count');
            const yearsEl = document.getElementById('modal-team-brasileirao-years');
            const otherEl = document.getElementById('modal-team-other-titles');
            const badgeContainer = document.getElementById('modal-team-badge');

            if (!modal || !team) return;

            const simTitles = team.simulatorTitles || 0;
            const totalTitles = team.brasileiraoCount + simTitles;

            if (nameEl) nameEl.textContent = team.name;
            if (mascotEl) mascotEl.textContent = `Mascote: ${team.mascot}`;
            if (countEl) {
                countEl.textContent = `${totalTitles} Título${totalTitles !== 1 ? 's' : ''} 🏆`;
            }
            if (yearsEl) {
                let yearsText = team.brasileiraoYears || "Nenhum título histórico";
                if (simTitles > 0) {
                    yearsText += ` | 🏆 Simulador Maraca: +${simTitles}x Campeão!`;
                }
                yearsEl.textContent = yearsText;
            }
            if (otherEl) otherEl.textContent = team.otherTitles || "Nenhum outro título registrado";

            if (badgeContainer) {
                const logoImg = teamImageCache[team.id];
                if (logoImg && logoImg.complete && logoImg.naturalWidth !== 0) {
                    badgeContainer.innerHTML = '';
                    const imgEl = document.createElement('img');
                    imgEl.src = logoImg.src;
                    imgEl.alt = team.name;
                    imgEl.className = 'w-full h-full object-contain drop-shadow';
                    badgeContainer.appendChild(imgEl);
                } else {
                    badgeContainer.innerHTML = `<span class="font-black text-3xl" style="color: ${team.primaryColor}">${team.icon}</span>`;
                }
            }

            modal.classList.remove('hidden');
        }

        // SISTEMA DE PRÉ-CARREGAMENTO E CACHE DOS ESCUDOS VETORIAIS 3D
        const teamImageCache = {};

        function preloadTeamLogos() {
            SERIE_A_RIVAIS.forEach(team => {
                if (team.logoUrl) {
                    const img = new Image();
                    img.onload = () => {
                        teamImageCache[team.id] = img;
                        if (typeof renderBoard === 'function') renderBoard();
                        if (typeof renderBgBoard === 'function') renderBgBoard();
                    };
                    img.src = team.logoUrl;
                }
            });
        }

        // CALENDÁRIO TODOS CONTRA TODOS (ROUND-ROBIN: 78 JOGOS NO TOTAL)
        let championshipSchedule = [];
        let currentMainMatch = null;
        let currentBgMatch = null;
        let matchResultsLog = [];
        let playerRedTeamIndex = 0;  // Time Peças Vermelhas (Padrão: Flamengo)
        let playerDarkTeamIndex = 1; // Time Peças Escuras (Padrão: Vasco)
        let currentRivalIndex = 1;
        let isSimulating = false;
        let isChampionshipOver = false;

        function populateTeamSelectors() {
            const selRed = document.getElementById('select-team-red');
            const selDark = document.getElementById('select-team-dark');
            if (!selRed || !selDark) return;

            selRed.innerHTML = SERIE_A_RIVAIS.map((t, idx) => 
                `<option value="${idx}" ${idx === playerRedTeamIndex ? 'selected' : ''}>${t.mascot} ${t.name}</option>`
            ).join('');

            selDark.innerHTML = SERIE_A_RIVAIS.map((t, idx) => 
                `<option value="${idx}" ${idx === playerDarkTeamIndex ? 'selected' : ''}>${t.mascot} ${t.name}</option>`
            ).join('');
        }

        // CALENDÁRIO MATEMATICAMENTE PERFEITO: CADA TIME JOGA EXATAMENTE 3 PARTIDAS
        function generateSchedule() {
            championshipSchedule = [];
            SERIE_A_RIVAIS.forEach(t => {
                t.pts = 0; t.pj = 0; t.v = 0; t.e = 0; t.d = 0; t.sp = 0;
            });

            const n = SERIE_A_RIVAIS.length;
            const teams = Array.from({ length: n }, (_, i) => i);

            // Algoritmo de Polígono para Gerar 3 Rodadas de Confrontos em Série de 3 Jogos
            for (let r = 0; r < 3; r++) {
                for (let i = 0; i < n / 2; i++) {
                    const t1 = teams[i];
                    const t2 = teams[n - 1 - i];
                    championshipSchedule.push({
                        team1: t1,
                        team2: t2,
                        played: false,
                        active: false,
                        round: r + 1,
                        currentGame: 1,
                        wins1: 0,
                        wins2: 0,
                        draws: 0
                    });
                }
                // Rotacionar posições do torneio mantendo o índice 0 fixo
                teams.splice(1, 0, teams.pop());
            }
        }

        // ESTADO DA PARTIDA PARALELA DA IA
        let bgBoard = [];
        let bgCurrentPlayer = PLAYER_WHITE;
        let bgTeam1Index = 1;
        let bgTeam2Index = 2;
        let bgMatchTimer = null;
        let bgCanvas, bgCtx;
        let bgMoveCount = 0;

        let board = [];
        let currentPlayer = PLAYER_WHITE;
        let selectedSquare = null;
        let validMoves = [];
        let mandatoryCapturesAvailable = false;
        
        let isVsAI = false;
        let aiDifficulty = 'medium';
        let isAiThinking = false;

        let moveHistory = [];
        let capturedByWhite = 0;
        let capturedByBlack = 0;

        let timerInterval = null;
        let secondsElapsed = 0;

        // Visual Effects Arrays
        let captureParticles = [];
        let shockwaves = [];
        let kingGlowEffects = [];
        let kingAuraPulse = 0;
        let floatingTexts = [];

        // Confetti & Dancer Animation State
        let confettiParticles = [];
        let dancerAnimationFrame = null;
        let dancePhase = 0;
        let isGameEnded = false;

        // --- CANVAS & SETUP ---
        const canvas = document.getElementById('checkerboard');
        const ctx = canvas ? canvas.getContext('2d') : null;
        let tileSize = 0;

        const dancerCanvas = document.getElementById('dancer-canvas');
        const dancerCtx = dancerCanvas ? dancerCanvas.getContext('2d') : null;

        function resizeCanvas() {
            if (!canvas) return;
            const container = canvas.parentElement;
            if (!container) return;
            const rect = container.getBoundingClientRect();
            const size = Math.floor(rect.width);
            
            if (size > 0) {
                canvas.width = size;
                canvas.height = size;
                tileSize = size / BOARD_SIZE;
                renderBoard();
            }
        }

        window.addEventListener('resize', resizeCanvas);

        // --- GAME INITIALIZATION ---
        function initGame() {
            if (championshipSchedule.length === 0 || isChampionshipOver) {
                resetLeagueTable();
            }

            // Manter o confronto em andamento até concluir os 3 jogos seguidos
            let mainMatch = currentMainMatch;
            if (!mainMatch || mainMatch.played || mainMatch.currentGame > 3) {
                if (currentMainMatch) currentMainMatch.active = false;
                mainMatch = championshipSchedule.find(m => !m.played && !m.active && (m.team1 === playerRedTeamIndex || m.team2 === playerRedTeamIndex));
                if (!mainMatch) {
                    mainMatch = championshipSchedule.find(m => !m.played && !m.active);
                }
            }

            if (mainMatch) {
                mainMatch.active = true;
                currentMainMatch = mainMatch;
                playerRedTeamIndex = mainMatch.team1;
                playerDarkTeamIndex = mainMatch.team2;
                currentRivalIndex = playerDarkTeamIndex;
            }

            populateTeamSelectors();

            board = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
            
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if ((r + c) % 2 === 1) {
                        if (r < 3) {
                            board[r][c] = PLAYER_BLACK;
                        } else if (r > 4) {
                            board[r][c] = PLAYER_WHITE;
                        }
                    }
                }
            }

            currentPlayer = PLAYER_WHITE;
            selectedSquare = null;
            validMoves = [];
            moveHistory = [];
            capturedByWhite = 0;
            capturedByBlack = 0;
            isAiThinking = false;
            isGameEnded = false;

            if (dancerAnimationFrame) {
                cancelAnimationFrame(dancerAnimationFrame);
                dancerAnimationFrame = null;
            }
            confettiParticles = [];

            resetTimer();
            startTimer();
            updateUI();
            updateLeagueTable();
            calculateAllMovesForCurrentPlayer();
            renderBoard();
            initBgMatch();

            const overlay = document.getElementById('banner-overlay');
            if (overlay) overlay.classList.add('opacity-0', 'pointer-events-none');

            if (isSimulating && !isGameEnded) {
                triggerSimulatedTurn();
            }
        }

        // --- INICIALIZAR E EXECUTAR JOGO DE IA PARALELO ---
        function initBgMatch() {
            bgCanvas = document.getElementById('bg-checkerboard');
            if (bgCanvas) bgCtx = bgCanvas.getContext('2d');

            if (currentBgMatch) {
                currentBgMatch.active = false;
            }

            const nextBgMatch = championshipSchedule.find(m => !m.played && !m.active);

            if (!nextBgMatch) {
                if (bgMatchTimer) clearInterval(bgMatchTimer);
                checkChampionshipFinished();
                return;
            }

            nextBgMatch.active = true;
            currentBgMatch = nextBgMatch;

            bgTeam1Index = currentBgMatch.team1;
            bgTeam2Index = currentBgMatch.team2;
            bgMoveCount = 0;

            const t1 = SERIE_A_RIVAIS[bgTeam1Index];
            const t2 = SERIE_A_RIVAIS[bgTeam2Index];

            const label1 = document.getElementById('bg-team-1');
            const label2 = document.getElementById('bg-team-2');
            if (label1) label1.textContent = `${t1.icon} ${t1.name}`;
            if (label2) label2.textContent = `${t2.name} ${t2.icon}`;

            bgBoard = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if ((r + c) % 2 === 1) {
                        if (r < 3) bgBoard[r][c] = PLAYER_BLACK;
                        else if (r > 4) bgBoard[r][c] = PLAYER_WHITE;
                    }
                }
            }
            bgCurrentPlayer = PLAYER_WHITE;

            if (bgMatchTimer) clearInterval(bgMatchTimer);
            bgMatchTimer = setInterval(stepBgMatch, 900);
            renderBgBoard();
        }

        function stepBgMatch() {
            if (!bgCanvas || !bgCtx || !currentBgMatch) return;

            bgMoveCount++;
            const bgMoves = getAllValidMovesForBoard(bgBoard, bgCurrentPlayer);

            if (bgMoves.length === 0 || bgMoveCount > 50) {
                let gameWinner = 0;

                // MODO SIMULADOR: Variar os empates nas 2 primeiras partidas (placares e capturas variadas)
                if (currentBgMatch.currentGame === 1 || currentBgMatch.currentGame === 2) {
                    gameWinner = 0; // Empate com variação de dinâmica
                } else {
                    // Escolha do Vencedor na 3ª Partida (com base no histórico de pontos ou sorteio)
                    const t1 = SERIE_A_RIVAIS[currentBgMatch.team1];
                    const t2 = SERIE_A_RIVAIS[currentBgMatch.team2];
                    if (t1.pts !== t2.pts) {
                        gameWinner = t1.pts >= t2.pts ? PLAYER_WHITE : PLAYER_BLACK;
                    } else {
                        gameWinner = Math.random() < 0.5 ? PLAYER_WHITE : PLAYER_BLACK;
                    }
                }

                if (gameWinner === PLAYER_WHITE) currentBgMatch.wins1 = (currentBgMatch.wins1 || 0) + 1;
                else if (gameWinner === PLAYER_BLACK) currentBgMatch.wins2 = (currentBgMatch.wins2 || 0) + 1;
                else currentBgMatch.draws = (currentBgMatch.draws || 0) + 1;

                currentBgMatch.currentGame = (currentBgMatch.currentGame || 1) + 1;
                bgMoveCount = 0;

                if (currentBgMatch.currentGame <= 3) {
                    // Reiniciar tabuleiro da partida paralela para o próximo jogo da série de 3
                    bgBoard = Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(0));
                    for (let r = 0; r < BOARD_SIZE; r++) {
                        for (let c = 0; c < BOARD_SIZE; c++) {
                            if ((r + c) % 2 === 1) {
                                if (r < 3) bgBoard[r][c] = PLAYER_BLACK;
                                else if (r > 4) bgBoard[r][c] = PLAYER_WHITE;
                            }
                        }
                    }
                    bgCurrentPlayer = PLAYER_WHITE;
                    renderBgBoard();
                    return;
                }

                // Série de 3 jogos concluída para a IA em tempo real
                const t1Idx = currentBgMatch.team1;
                const t2Idx = currentBgMatch.team2;
                const t1 = SERIE_A_RIVAIS[t1Idx];
                const t2 = SERIE_A_RIVAIS[t2Idx];

                let bgWinnerName = 'Empate';
                if (currentBgMatch.wins1 > currentBgMatch.wins2) {
                    SERIE_A_RIVAIS[t1Idx].pts += 3;
                    SERIE_A_RIVAIS[t1Idx].v += 1;
                    SERIE_A_RIVAIS[t2Idx].d += 1;
                    bgWinnerName = t1.name;
                } else if (currentBgMatch.wins2 > currentBgMatch.wins1) {
                    SERIE_A_RIVAIS[t2Idx].pts += 3;
                    SERIE_A_RIVAIS[t2Idx].v += 1;
                    SERIE_A_RIVAIS[t1Idx].d += 1;
                    bgWinnerName = t2.name;
                } else {
                    SERIE_A_RIVAIS[t1Idx].pts += 1;
                    SERIE_A_RIVAIS[t1Idx].e += 1;
                    SERIE_A_RIVAIS[t2Idx].pts += 1;
                    SERIE_A_RIVAIS[t2Idx].e += 1;
                }

                SERIE_A_RIVAIS[t1Idx].pj += 1;
                SERIE_A_RIVAIS[t2Idx].pj += 1;

                matchResultsLog.unshift({
                    team1: t1.name,
                    team1Icon: t1.icon,
                    team1Color: t1.primaryColor,
                    team2: t2.name,
                    team2Icon: t2.icon,
                    team2Color: t2.secondaryColor || '#ffffff',
                    score: `${currentBgMatch.wins1} x ${currentBgMatch.wins2}`,
                    winner: bgWinnerName
                });
                updateMatchResultsUI();

                currentBgMatch.played = true;
                currentBgMatch.active = false;
                currentBgMatch = null;

                updateLeagueTable();
                checkChampionshipFinished();

                initBgMatch();
                return;
            }

            // IA Profissional da Partida Simultânea (Profundidade 4 + Heurística Tática)
            const res = minimaxBoard(bgBoard, 4, -Infinity, Infinity, true, bgCurrentPlayer, bgCurrentPlayer);
            const chosen = res.move || bgMoves[Math.floor(Math.random() * bgMoves.length)];
            const piece = bgBoard[chosen.from.r][chosen.from.c];
            bgBoard[chosen.from.r][chosen.from.c] = 0;
            bgBoard[chosen.to.r][chosen.to.c] = piece;

            if (chosen.captured) {
                chosen.captured.forEach(cap => bgBoard[cap.r][cap.c] = 0);
            }

            if (bgCurrentPlayer === PLAYER_WHITE && chosen.to.r === 0 && piece === 1) bgBoard[chosen.to.r][chosen.to.c] = 3;
            if (bgCurrentPlayer === PLAYER_BLACK && chosen.to.r === BOARD_SIZE - 1 && piece === 2) bgBoard[chosen.to.r][chosen.to.c] = 4;

            bgCurrentPlayer = bgCurrentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;
            renderBgBoard();
        }

        function renderBgBoard() {
            if (!bgCanvas || !bgCtx || !bgBoard || bgBoard.length < BOARD_SIZE) return;
            const size = bgCanvas.width / BOARD_SIZE;

            for (let r = 0; r < BOARD_SIZE; r++) {
                if (!bgBoard[r]) continue;
                for (let c = 0; c < BOARD_SIZE; c++) {
                    const isDark = (r + c) % 2 === 1;
                    bgCtx.fillStyle = isDark ? '#140303' : '#8b0000';
                    bgCtx.fillRect(c * size, r * size, size, size);

                    const p = bgBoard[r][c];
                    if (p !== 0) {
                        const isW = getPieceOwner(p) === PLAYER_WHITE;
                        const team = isW ? SERIE_A_RIVAIS[bgTeam1Index] : SERIE_A_RIVAIS[bgTeam2Index];

                        bgCtx.fillStyle = team.primaryColor;
                        bgCtx.beginPath();
                        bgCtx.arc((c + 0.5) * size, (r + 0.5) * size, size * 0.38, 0, Math.PI * 2);
                        bgCtx.fill();

                        bgCtx.strokeStyle = '#ffffff';
                        bgCtx.lineWidth = 1;
                        bgCtx.stroke();

                        // Renderiza o escudo da imagem na partida paralela
                        const logoImg = teamImageCache[team.id];
                        if (logoImg && logoImg.complete && logoImg.naturalWidth !== 0) {
                            bgCtx.drawImage(logoImg, (c + 0.15) * size, (r + 0.15) * size, size * 0.7, size * 0.7);
                        }
                    }
                }
            }
        }

        // --- ATUALIZAR TABELA DO BRASILEIRÃO ---
        function updateLeagueTable() {
            const tbody = document.getElementById('league-table-body');
            if (!tbody) return;

            // Ordenação com Critérios Estritos de Desempate (Garantindo APENAS 1 CAMPEÃO ÚNICO)
            const sorted = [...SERIE_A_RIVAIS].sort((a, b) => {
                if (b.pts !== a.pts) return b.pts - a.pts;
                if (b.v !== a.v) return b.v - a.v;
                if (b.sp !== a.sp) return b.sp - a.sp;
                return b.brasileiraoCount - a.brasileiraoCount;
            });

            tbody.innerHTML = sorted.map((team, idx) => {
                // Apenas exibe a tag "CAMPEÃO" e destaque dourado se o campeonato foi FINALIZADO
                const isChampion = idx === 0 && isChampionshipOver;
                return `
                <tr class="hover:bg-slate-700/60 transition cursor-pointer ${isChampion ? 'bg-amber-500/10 border-l-4 border-amber-400' : ''}" onclick="showTeamTitlesModalByTeamId('${team.id}')" title="Clique para ver os títulos do ${team.name}">
                    <td class="py-1.5 font-bold ${isChampion ? 'text-amber-400 font-extrabold' : 'text-slate-400'}">${idx + 1}º ${isChampion ? '🏆' : ''}</td>
                    <td class="py-1.5 flex items-center gap-1.5 font-bold">
                        <span class="text-xs">${team.icon}</span> ${team.name}
                        ${isChampion ? '<span class="text-[9px] bg-amber-500/20 text-amber-300 font-black px-1.5 py-0.5 rounded border border-amber-500/30">CAMPEÃO</span>' : ''}
                    </td>
                    <td class="py-1.5 text-center font-extrabold text-amber-300">${team.pts}</td>
                    <td class="py-1.5 text-center text-slate-300">${team.pj}</td>
                    <td class="py-1.5 text-center text-emerald-400">${team.v}</td>
                    <td class="py-1.5 text-center ${team.sp >= 0 ? 'text-slate-300' : 'text-red-400'}">${team.sp > 0 ? '+' + team.sp : team.sp}</td>
                </tr>
                `;
            }).join('');
        }

        // SIMULADOR COMPLETO DO CAMPEONATO (Gera 1 Campeão Único de Forma Automática)
        function simulateFullChampionship() {
            if (isChampionshipOver) {
                resetLeagueTable();
            }

            championshipSchedule.forEach(match => {
                if (!match.played) {
                    const t1Idx = match.team1;
                    const t2Idx = match.team2;

                    let wins1 = 0;
                    let wins2 = 0;

                    // Simula os 3 jogos do confronto
                    for (let game = 1; game <= 3; game++) {
                        if (game === 1 || game === 2) {
                            if (Math.random() < 0.5) {
                                // Empate na partida
                            } else if (Math.random() < 0.5) {
                                wins1++;
                            } else {
                                wins2++;
                            }
                        } else {
                            // Jogo 3 decisivo para desempatar a série
                            if (wins1 > wins2) {
                                wins1++;
                            } else if (wins2 > wins1) {
                                wins2++;
                            } else {
                                if (Math.random() < 0.5) wins1++;
                                else wins2++;
                            }
                        }
                    }

                    let seriesWinner = null;
                    if (wins1 > wins2) {
                        SERIE_A_RIVAIS[t1Idx].pts += 3;
                        SERIE_A_RIVAIS[t1Idx].v += 1;
                        SERIE_A_RIVAIS[t2Idx].d += 1;
                        seriesWinner = SERIE_A_RIVAIS[t1Idx].name;
                    } else if (wins2 > wins1) {
                        SERIE_A_RIVAIS[t2Idx].pts += 3;
                        SERIE_A_RIVAIS[t2Idx].v += 1;
                        SERIE_A_RIVAIS[t1Idx].d += 1;
                        seriesWinner = SERIE_A_RIVAIS[t2Idx].name;
                    } else {
                        SERIE_A_RIVAIS[t1Idx].pts += 1;
                        SERIE_A_RIVAIS[t1Idx].e += 1;
                        SERIE_A_RIVAIS[t2Idx].pts += 1;
                        SERIE_A_RIVAIS[t2Idx].e += 1;
                    }

                    SERIE_A_RIVAIS[t1Idx].pj += 1;
                    SERIE_A_RIVAIS[t2Idx].pj += 1;
                    SERIE_A_RIVAIS[t1Idx].sp += (wins1 - wins2);
                    SERIE_A_RIVAIS[t2Idx].sp += (wins2 - wins1);

                    match.played = true;
                    match.active = false;
                    match.wins1 = wins1;
                    match.wins2 = wins2;

                    matchResultsLog.unshift({
                        team1: SERIE_A_RIVAIS[t1Idx].name,
                        team1Icon: SERIE_A_RIVAIS[t1Idx].icon,
                        team1Color: SERIE_A_RIVAIS[t1Idx].primaryColor,
                        team2: SERIE_A_RIVAIS[t2Idx].name,
                        team2Icon: SERIE_A_RIVAIS[t2Idx].icon,
                        team2Color: SERIE_A_RIVAIS[t2Idx].secondaryColor || '#ffffff',
                        score: `${wins1} x ${wins2}`,
                        winner: seriesWinner || 'Empate'
                    });
                }
            });

            updateMatchResultsUI();
            updateLeagueTable();
            checkChampionshipFinished();
        }

        function updateMatchResultsUI() {
            const listEl = document.getElementById('match-results-list');
            const countEl = document.getElementById('match-results-count');
            if (!listEl) return;

            if (countEl) countEl.textContent = `${matchResultsLog.length} confrontos`;

            if (matchResultsLog.length === 0) {
                listEl.innerHTML = `<div class="text-slate-500 text-center text-xs py-4">Nenhuma partida finalizada ainda</div>`;
                return;
            }

            listEl.innerHTML = matchResultsLog.map(r => `
                <div class="bg-slate-900/80 border border-slate-700/60 p-2 rounded-xl flex items-center justify-between shadow-sm">
                    <div class="flex items-center gap-1.5 w-5/12 overflow-hidden">
                        <span class="text-xs font-bold" style="color: ${r.team1Color}">${r.team1Icon}</span>
                        <span class="font-bold truncate ${r.winner === r.team1 ? 'text-amber-400' : 'text-slate-300'}">${r.team1}</span>
                    </div>
                    <div class="px-2 py-0.5 rounded bg-slate-950 font-black text-amber-300 text-xs border border-slate-800 text-center whitespace-nowrap shadow">
                        ${r.score}
                    </div>
                    <div class="flex items-center gap-1.5 w-5/12 justify-end overflow-hidden">
                        <span class="font-bold truncate ${r.winner === r.team2 ? 'text-amber-400' : 'text-slate-300'}">${r.team2}</span>
                        <span class="text-xs font-bold" style="color: ${r.team2Color}">${r.team2Icon}</span>
                    </div>
                </div>
            `).join('');
        }

        function resetLeagueTable() {
            SERIE_A_RIVAIS.forEach(t => {
                t.pts = 0; t.pj = 0; t.v = 0; t.e = 0; t.d = 0; t.sp = 0;
            });
            generateSchedule();
            matchResultsLog = [];
            isChampionshipOver = false;
            currentRivalIndex = 1;
            updateLeagueTable();
            updateMatchResultsUI();
        }

        // --- TIMER FUNCTIONS ---
        const MATCH_TIME_LIMIT = 1200; // 20 minutos (1200 segundos)

        function startTimer() {
            clearInterval(timerInterval);
            secondsElapsed = 0;
            timerInterval = setInterval(() => {
                secondsElapsed++;
                const remaining = Math.max(0, MATCH_TIME_LIMIT - secondsElapsed);
                const mins = Math.floor(remaining / 60).toString().padStart(2, '0');
                const secs = (remaining % 60).toString().padStart(2, '0');
                const timerEl = document.getElementById('game-timer');
                if (timerEl) timerEl.textContent = `${mins}:${secs}`;

                // Regra dos 20 Minutos: Fim de jogo por tempo esgotado
                if (secondsElapsed >= MATCH_TIME_LIMIT && !isGameEnded) {
                    clearInterval(timerInterval);
                    handleTimeLimitReached();
                }
            }, 1000);
        }

        function resetTimer() {
            clearInterval(timerInterval);
            secondsElapsed = 0;
            const timerEl = document.getElementById('game-timer');
            if (timerEl) timerEl.textContent = '20:00';
        }

        function handleTimeLimitReached() {
            if (isGameEnded) return;

            let winner = 0;
            if (capturedByWhite > capturedByBlack) {
                winner = PLAYER_WHITE;
            } else if (capturedByBlack > capturedByWhite) {
                winner = PLAYER_BLACK;
            } else {
                // Em caso de empate nas capturas, verifica quem tem mais peças no tabuleiro
                let whitePieces = 0, blackPieces = 0;
                for (let r = 0; r < BOARD_SIZE; r++) {
                    for (let c = 0; c < BOARD_SIZE; c++) {
                        const owner = getPieceOwner(board[r][c]);
                        if (owner === PLAYER_WHITE) whitePieces++;
                        if (owner === PLAYER_BLACK) blackPieces++;
                    }
                }
                if (whitePieces > blackPieces) winner = PLAYER_WHITE;
                else if (blackPieces > whitePieces) winner = PLAYER_BLACK;
                else winner = 0; // Empate definitivo
            }
            endGame(winner, true);
        }

        // --- MOVE COMPUTATION & RULES ---
        function getPieceOwner(piece) {
            if (piece === 1 || piece === 3) return PLAYER_WHITE;
            if (piece === 2 || piece === 4) return PLAYER_BLACK;
            return 0;
        }

        function isKing(piece) {
            return piece === 3 || piece === 4;
        }

        function calculateAllMovesForCurrentPlayer() {
            validMoves = getAllValidMovesForBoard(board, currentPlayer);
            mandatoryCapturesAvailable = validMoves.some(m => m.captured && m.captured.length > 0);
        }

        function getAllValidMovesForBoard(currentBoard, player) {
            const allCaptures = [];
            const allSimpleMoves = [];

            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if (getPieceOwner(currentBoard[r][c]) === player) {
                        const captures = getCapturesForPiece(r, c, currentBoard);
                        if (captures.length > 0) {
                            allCaptures.push(...captures);
                        }
                    }
                }
            }

            if (allCaptures.length > 0) {
                let maxCaptured = 0;
                allCaptures.forEach(m => {
                    if (m.captured.length > maxCaptured) {
                        maxCaptured = m.captured.length;
                    }
                });
                return allCaptures.filter(m => m.captured.length === maxCaptured || m.isKingChoice);
            } else {
                for (let r = 0; r < BOARD_SIZE; r++) {
                    for (let c = 0; c < BOARD_SIZE; c++) {
                        if (getPieceOwner(currentBoard[r][c]) === player) {
                            const simple = getSimpleMovesForPiece(r, c, currentBoard);
                            allSimpleMoves.push(...simple);
                        }
                    }
                }
                return allSimpleMoves;
            }
        }

        function getSimpleMovesForPiece(r, c, currentBoard) {
            const moves = [];
            const piece = currentBoard[r][c];
            const owner = getPieceOwner(piece);
            const king = isKing(piece);

            const directions = king 
                ? [[-1, -1], [-1, 1], [1, -1], [1, 1]]
                : (owner === PLAYER_WHITE ? [[-1, -1], [-1, 1]] : [[1, -1], [1, 1]]);

            for (const [dr, dc] of directions) {
                if (king) {
                    let step = 1;
                    while (true) {
                        const nr = r + dr * step;
                        const nc = c + dc * step;
                        if (nr < 0 || nr >= BOARD_SIZE || nc < 0 || nc >= BOARD_SIZE) break;
                        if (currentBoard[nr][nc] !== 0) break;
                        
                        moves.push({ from: {r, c}, to: {r: nr, c: nc}, captured: [], intermediateSteps: [] });
                        step++;
                    }
                } else {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE && currentBoard[nr][nc] === 0) {
                        moves.push({ from: {r, c}, to: {r: nr, c: nc}, captured: [], intermediateSteps: [] });
                    }
                }
            }
            return moves;
        }

        function getCapturesForPiece(r, c, currentBoard, currentCaptured = [], pathHistory = []) {
            let moves = [];
            const piece = currentBoard[r][c];
            if (!piece) return moves;

            const owner = getPieceOwner(piece);
            const king = isKing(piece);
            const directions = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
            let foundSubJump = false;
            const currentPath = pathHistory.length === 0 ? [{r, c}] : pathHistory;

            for (const [dr, dc] of directions) {
                if (king) {
                    let step = 1;
                    let victimPos = null;

                    while (true) {
                        const nr = r + dr * step;
                        const nc = c + dc * step;
                        if (nr < 0 || nr >= BOARD_SIZE || nc < 0 || nc >= BOARD_SIZE) break;

                        const cell = currentBoard[nr][nc];
                        if (cell !== 0) {
                            if (getPieceOwner(cell) === owner) break;
                            if (getPieceOwner(cell) !== owner) {
                                if (victimPos !== null) break;
                                if (currentCaptured.some(cap => cap.r === nr && cap.c === nc)) break;
                                victimPos = { r: nr, c: nc };
                            }
                        } else if (victimPos !== null) {
                            if (!currentPath.some(p => p.r === nr && p.c === nc)) {
                                foundSubJump = true;
                                const nextBoard = cloneBoard(currentBoard);
                                nextBoard[r][c] = 0;
                                nextBoard[victimPos.r][victimPos.c] = 0;
                                nextBoard[nr][nc] = piece;
                                
                                const nextCaptured = [...currentCaptured, victimPos];
                                const nextPath = [...currentPath, {r: nr, c: nc}];
                                
                                moves.push({
                                    from: currentPath[0],
                                    to: {r: nr, c: nc},
                                    captured: nextCaptured,
                                    intermediateSteps: nextPath,
                                    isKingChoice: true
                                });

                                const subJumps = getCapturesForPiece(nr, nc, nextBoard, nextCaptured, nextPath);
                                if (subJumps.length > 0) {
                                    moves.push(...subJumps);
                                }
                            }
                        }
                        step++;
                    }
                } else {
                    const enemyR = r + dr;
                    const enemyC = c + dc;
                    const landingR = r + dr * 2;
                    const landingC = c + dc * 2;

                    if (landingR >= 0 && landingR < BOARD_SIZE && landingC >= 0 && landingC < BOARD_SIZE) {
                        const enemyPiece = currentBoard[enemyR][enemyC];
                        const landingCell = currentBoard[landingR][landingC];

                        if (enemyPiece !== 0 && getPieceOwner(enemyPiece) !== owner && landingCell === 0) {
                            const alreadyCaptured = currentCaptured.some(cap => cap.r === enemyR && cap.c === enemyC);
                            const alreadyVisitedLanding = currentPath.some(p => p.r === landingR && p.c === landingC);

                            if (!alreadyCaptured && !alreadyVisitedLanding) {
                                foundSubJump = true;
                                const nextBoard = cloneBoard(currentBoard);
                                nextBoard[r][c] = 0;
                                nextBoard[enemyR][enemyC] = 0;
                                nextBoard[landingR][landingC] = piece;

                                const nextCaptured = [...currentCaptured, {r: enemyR, c: enemyC}];
                                const nextPath = [...currentPath, {r: landingR, c: landingC}];
                                
                                const subJumps = getCapturesForPiece(landingR, landingC, nextBoard, nextCaptured, nextPath);

                                if (subJumps.length > 0) {
                                    moves.push(...subJumps);
                                } else {
                                    moves.push({
                                        from: currentPath[0],
                                        to: {r: landingR, c: landingC},
                                        captured: nextCaptured,
                                        intermediateSteps: nextPath
                                    });
                                }
                            }
                        }
                    }
                }
            }

            if (!foundSubJump && currentCaptured.length > 0 && !king) {
                moves.push({
                    from: currentPath[0],
                    to: {r, c},
                    captured: currentCaptured,
                    intermediateSteps: currentPath
                });
            }

            return moves;
        }

        function cloneBoard(b) {
            return b.map(row => [...row]);
        }

        // --- MINIMAX AI ENGINE WITH ALPHA-BETA PRUNING ---
        function makeAIMove() {
            if (!isVsAI || currentPlayer !== PLAYER_BLACK || isGameEnded) return;

            calculateAllMovesForCurrentPlayer();
            if (validMoves.length === 0) return;

            let depth = 3;
            if (aiDifficulty === 'easy') depth = 1;
            if (aiDifficulty === 'medium') depth = 3;
            if (aiDifficulty === 'hard') depth = 5;

            const result = minimaxBoard(board, depth, -Infinity, Infinity, true, PLAYER_BLACK, PLAYER_BLACK);
            const chosenMove = result.move || validMoves[Math.floor(Math.random() * validMoves.length)];

            if (chosenMove) {
                executeMove(chosenMove);
            }
            isAiThinking = false;
        }

        function triggerSimulatedTurn() {
            if (!isSimulating || isGameEnded) return;
            if (validMoves.length === 0) return;
            
            isAiThinking = true;
            setTimeout(() => {
                if (!isSimulating || isGameEnded) return;
                // IA Profissional no Modo Simulador (Profundidade 5 de Cálculo Mestre)
                const res = minimaxBoard(board, 5, -Infinity, Infinity, true, currentPlayer, currentPlayer);
                const move = res.move || validMoves[Math.floor(Math.random() * validMoves.length)];
                if (move) {
                    executeMove(move);
                }
                isAiThinking = false;
                if (isSimulating && !isGameEnded) {
                    triggerSimulatedTurn();
                }
            }, 500);
        }

        function minimaxBoard(b, depth, alpha, beta, isMaximizing, aiPlayer, playerTurn) {
            const valid = getAllValidMovesForBoard(b, playerTurn);

            if (depth === 0 || valid.length === 0) {
                return { score: evaluateBoard(b, aiPlayer), move: null };
            }

            let bestMove = null;

            if (isMaximizing) {
                let maxEval = -Infinity;
                for (const m of valid) {
                    const nextB = applyMoveToBoardCopy(b, m, playerTurn);
                    const nextTurn = playerTurn === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;
                    const evalResult = minimaxBoard(nextB, depth - 1, alpha, beta, false, aiPlayer, nextTurn);
                    if (evalResult.score > maxEval) {
                        maxEval = evalResult.score;
                        bestMove = m;
                    }
                    alpha = Math.max(alpha, maxEval);
                    if (beta <= alpha) break;
                }
                return { score: maxEval, move: bestMove };
            } else {
                let minEval = Infinity;
                for (const m of valid) {
                    const nextB = applyMoveToBoardCopy(b, m, playerTurn);
                    const nextTurn = playerTurn === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;
                    const evalResult = minimaxBoard(nextB, depth - 1, alpha, beta, true, aiPlayer, nextTurn);
                    if (evalResult.score < minEval) {
                        minEval = evalResult.score;
                        bestMove = m;
                    }
                    beta = Math.min(beta, minEval);
                    if (beta <= alpha) break;
                }
                return { score: minEval, move: bestMove };
            }
        }

        function applyMoveToBoardCopy(b, m, player) {
            const nb = cloneBoard(b);
            const piece = nb[m.from.r][m.from.c];
            nb[m.from.r][m.from.c] = 0;
            nb[m.to.r][m.to.c] = piece;

            if (m.captured && m.captured.length > 0) {
                m.captured.forEach(cap => nb[cap.r][cap.c] = 0);
            }

            if (player === PLAYER_WHITE && m.to.r === 0 && piece === 1) nb[m.to.r][m.to.c] = 3;
            if (player === PLAYER_BLACK && m.to.r === BOARD_SIZE - 1 && piece === 2) nb[m.to.r][m.to.c] = 4;
            return nb;
        }

        function evaluateBoard(b, aiPlayer) {
            let score = 0;

            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    const p = b[r][c];
                    if (p === 0) continue;
                    const owner = getPieceOwner(p);
                    const king = isKing(p);
                    const isWhite = owner === PLAYER_WHITE;

                    // Avaliação Posicional e Tática de Nível Mestre
                    let pieceVal = king ? 320 : 100;

                    // Avanço Estratégico Rumo à Dama (+12 por fileira avançada)
                    if (!king) {
                        const advanceRows = isWhite ? (7 - r) : r;
                        pieceVal += advanceRows * 12;
                    }

                    // Dominância e Controle do Centro do Tabuleiro (+15)
                    if (r >= 2 && r <= 5 && c >= 2 && c <= 5) {
                        pieceVal += 15;
                    }

                    // Proteção da Linha de Fundo / Barreira de Promoção (+25)
                    if (!king) {
                        if (isWhite && r === 7) pieceVal += 25;
                        if (!isWhite && r === 0) pieceVal += 25;
                    }

                    // Penalidade para peças presas nas laterais (-10)
                    if (c === 0 || c === 7) {
                        pieceVal -= 10;
                    }

                    if (owner === aiPlayer) {
                        score += pieceVal;
                    } else {
                        score -= pieceVal;
                    }
                }
            }
            return score;
        }

        // --- EXECUTE MOVE & GAME LOGIC ---
        function executeMove(move) {
            if (!move) return;

            // Record history state for Undo feature
            moveHistory.push({
                boardState: cloneBoard(board),
                player: currentPlayer,
                capturedW: capturedByWhite,
                capturedB: capturedByBlack
            });

            const piece = board[move.from.r][move.from.c];
            board[move.from.r][move.from.c] = 0;
            board[move.to.r][move.to.c] = piece;

            let capturedOccurred = false;

            if (move.captured && move.captured.length > 0) {
                capturedOccurred = true;
                move.captured.forEach(cap => {
                    const victimPiece = board[cap.r][cap.c];
                    const isVictimWhite = getPieceOwner(victimPiece) === PLAYER_WHITE;
                    const wasKing = isKing(victimPiece);

                    if (isVictimWhite) {
                        capturedByBlack++;
                    } else {
                        capturedByWhite++;
                    }

                    board[cap.r][cap.c] = 0;
                    triggerCaptureParticles(cap.r, cap.c, isVictimWhite, wasKing);
                });
                playSound('capture');
            }

            // King Promotion Check
            let promoted = false;
            if (currentPlayer === PLAYER_WHITE && move.to.r === 0 && piece === 1) {
                board[move.to.r][move.to.c] = 3; // White King
                promoted = true;
            } else if (currentPlayer === PLAYER_BLACK && move.to.r === BOARD_SIZE - 1 && piece === 2) {
                board[move.to.r][move.to.c] = 4; // Black King
                promoted = true;
            }

            if (promoted) {
                playSound('king');
            } else if (!capturedOccurred) {
                playSound('move');
            }

            // Switch Turn
            currentPlayer = currentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;
            selectedSquare = null;

            updateUI();
            calculateAllMovesForCurrentPlayer();
            renderBoard();

            // Check Win/Draw Condition
            if (validMoves.length === 0) {
                const winner = currentPlayer === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;
                endGame(winner);
                return;
            }

            // Trigger next turn for AI or Simulation mode if applicable
            if (!isGameEnded) {
                if (isSimulating) {
                    triggerSimulatedTurn();
                } else if (isVsAI && currentPlayer === PLAYER_BLACK && !isAiThinking) {
                    isAiThinking = true;
                    setTimeout(() => {
                        makeAIMove();
                    }, 450);
                }
            }
        }

        function drawFlamengoShield(ctx, x, y, size, king) {
            ctx.save();
            ctx.translate(x, y);
            const scale = size / 100;
            ctx.scale(scale, scale);

            // Outer Shield Contour
            ctx.beginPath();
            ctx.moveTo(-40, -45);
            ctx.lineTo(40, -45);
            ctx.lineTo(40, -10);
            ctx.bezierCurveTo(40, 25, 20, 45, 0, 52);
            ctx.bezierCurveTo(-20, 45, -40, 25, -40, -10);
            ctx.closePath();

            // Dark Background
            ctx.fillStyle = '#111111';
            ctx.fill();

            // Red Horizontal Stripes
            ctx.fillStyle = '#dc2626';
            ctx.fillRect(-38, -25, 76, 12);
            ctx.fillRect(-38, 0, 76, 12);
            ctx.fillRect(-28, 25, 56, 10);

            // Black Canton
            ctx.fillStyle = '#111111';
            ctx.fillRect(-40, -45, 40, 35);
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.strokeRect(-38, -43, 36, 31);

            // CRF Text Monogram
            ctx.fillStyle = '#ffffff';
            ctx.font = '900 18px Inter, sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('CRF', -20, -27);

            // Shield Outline
            ctx.strokeStyle = king ? '#fbbf24' : '#ffffff';
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.restore();
        }

        function drawFoxSilhouette(ctx, x, y, r, king, color) {
            ctx.save();
            ctx.translate(x, y);

            ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
            ctx.shadowBlur = 6;
            ctx.shadowOffsetY = 2;

            ctx.fillStyle = king ? '#fef08a' : color;

            // Silhueta da Cara da Raposa (Cruzeiro)
            ctx.beginPath();
            ctx.moveTo(0, r * 0.55);           // Ponta do focinho
            ctx.lineTo(-r * 0.65, -r * 0.05);  // Bochecha esquerda
            ctx.lineTo(-r * 0.55, -r * 0.3);   // Base orelha esquerda
            ctx.lineTo(-r * 0.45, -r * 0.78);  // Ponta orelha esquerda
            ctx.lineTo(-r * 0.15, -r * 0.32);  // Interior orelha esquerda
            ctx.lineTo(0, -r * 0.22);          // Topo centro da cabeça
            ctx.lineTo(r * 0.15, -r * 0.32);   // Interior orelha direita
            ctx.lineTo(r * 0.45, -r * 0.78);   // Ponta orelha direita
            ctx.lineTo(r * 0.55, -r * 0.3);    // Base orelha direita
            ctx.lineTo(r * 0.65, -r * 0.05);   // Bochecha direita
            ctx.closePath();
            ctx.fill();

            // Recorte dos olhos da Raposa
            ctx.fillStyle = '#003a70';
            
            // Olho esquerdo
            ctx.beginPath();
            ctx.moveTo(-r * 0.35, -r * 0.12);
            ctx.lineTo(-r * 0.15, -r * 0.05);
            ctx.lineTo(-r * 0.22, -r * 0.22);
            ctx.closePath();
            ctx.fill();

            // Olho direito
            ctx.beginPath();
            ctx.moveTo(r * 0.35, -r * 0.12);
            ctx.lineTo(r * 0.15, -r * 0.05);
            ctx.lineTo(r * 0.22, -r * 0.22);
            ctx.closePath();
            ctx.fill();

            // Focinho
            ctx.fillStyle = '#111111';
            ctx.beginPath();
            ctx.arc(0, r * 0.48, r * 0.09, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }

        let isAnimatingParticles = false;
        function animateParticles() {
            if (isAnimatingParticles) return;
            isAnimatingParticles = true;

            function loop() {
                let active = false;

                // Animate Shockwaves
                for (let i = shockwaves.length - 1; i >= 0; i--) {
                    const sw = shockwaves[i];
                    sw.radius += 2.5;
                    sw.alpha -= 0.04;
                    if (sw.alpha <= 0) {
                        shockwaves.splice(i, 1);
                    } else {
                        active = true;
                    }
                }

                // Animate Capture Particle Explosions
                for (let i = captureParticles.length - 1; i >= 0; i--) {
                    const p = captureParticles[i];
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.15;
                    p.alpha -= p.decay;
                    if (p.alpha <= 0) {
                        captureParticles.splice(i, 1);
                    } else {
                        active = true;
                    }
                }

                // Animate Floating Mascot Text
                for (let i = floatingTexts.length - 1; i >= 0; i--) {
                    const ft = floatingTexts[i];
                    ft.y += ft.vy;
                    ft.alpha -= 0.02;
                    if (ft.alpha <= 0) {
                        floatingTexts.splice(i, 1);
                    } else {
                        active = true;
                    }
                }

                renderBoard();

                if (active) {
                    requestAnimationFrame(loop);
                } else {
                    isAnimatingParticles = false;
                }
            }
            requestAnimationFrame(loop);
        }

        function checkChampionshipFinished() {
            const unplayedMatches = championshipSchedule.filter(m => !m.played);
            const progressEl = document.getElementById('league-progress');
            const total = championshipSchedule.length;
            const playedCount = total - unplayedMatches.length;
            const pct = Math.round((playedCount / total) * 100);

            if (progressEl) {
                progressEl.textContent = `${pct}% (${playedCount}/${total}j)`;
            }

            if (unplayedMatches.length === 0 && !isChampionshipOver) {
                isChampionshipOver = true;

                // Seleciona um CAMPEÃO ÚNICO aplicando critérios rigorosos de desempate
                const sorted = [...SERIE_A_RIVAIS].sort((a, b) => {
                    if (b.pts !== a.pts) return b.pts - a.pts;
                    if (b.v !== a.v) return b.v - a.v;
                    if (b.sp !== a.sp) return b.sp - a.sp;
                    return b.brasileiraoCount - a.brasileiraoCount;
                });

                const champion = sorted[0];
                champion.simulatorTitles = (champion.simulatorTitles || 0) + 1;

                setTimeout(() => {
                    showChampionshipBanner(champion);
                }, 800);
            }
        }

        function endGame(winner, isTimeOut = false) {
            isGameEnded = true;
            clearInterval(timerInterval);
            playSound('win');

            const overlay = document.getElementById('banner-overlay');
            const title = document.getElementById('banner-title');
            const desc = document.getElementById('banner-desc');
            const shieldBadge = document.getElementById('banner-shield-badge');
            const btnRestart = document.getElementById('btn-banner-restart');

            const teamRed = SERIE_A_RIVAIS[playerRedTeamIndex];
            const teamDark = SERIE_A_RIVAIS[playerDarkTeamIndex];

            if (!currentMainMatch) {
                currentMainMatch = { team1: playerRedTeamIndex, team2: playerDarkTeamIndex, currentGame: 1, wins1: 0, wins2: 0, draws: 0, played: false };
            }

            // REGRAS DO SIMULADOR (IA VS IA):
            // Partidas 1 e 2 -> Forçar EMPATE
            // Partida 3 -> A IA escolhe o vencedor do confronto!
            if (isSimulating) {
                if (currentMainMatch.currentGame === 1 || currentMainMatch.currentGame === 2) {
                    winner = 0; // Empate garantido nas 2 primeiras partidas do simulador
                } else if (currentMainMatch.currentGame === 3) {
                    if (winner === 0) {
                        // Se empatar na mesa no Jogo 3, escolhe o time com maior pontuação ou faz o desempate
                        if (teamRed.pts !== teamDark.pts) {
                            winner = teamRed.pts >= teamDark.pts ? PLAYER_WHITE : PLAYER_BLACK;
                        } else {
                            winner = Math.random() < 0.5 ? PLAYER_WHITE : PLAYER_BLACK;
                        }
                    }
                }
            }

            // Computar vitória do jogo atual na série
            if (winner === PLAYER_WHITE) {
                currentMainMatch.wins1++;
            } else if (winner === PLAYER_BLACK) {
                currentMainMatch.wins2++;
            } else {
                currentMainMatch.draws++;
            }

            const isSeriesComplete = currentMainMatch.currentGame >= 3;

            if (!isSeriesComplete) {
                // Término de 1 jogo da série de 3
                if (title) title.textContent = `FIM DO JOGO ${currentMainMatch.currentGame} DE 3!`;
                
                if (isSimulating && (currentMainMatch.currentGame === 1 || currentMainMatch.currentGame === 2)) {
                    // Variação dinâmica do placar de capturas nos empates por partida
                    const capCount = Math.max(capturedByWhite, capturedByBlack, Math.floor(Math.random() * 3) + currentMainMatch.currentGame);
                    if (desc) desc.textContent = `Jogo ${currentMainMatch.currentGame} (Simulador) terminou em EMPATE DISPUTADO (${capCount} x ${capCount} peças capturadas). O desempate decisivo será no Jogo 3!`;
                } else {
                    if (desc) desc.textContent = `Placar Atual da Série: ${teamRed.name} (${currentMainMatch.wins1}) x (${currentMainMatch.wins2}) ${teamDark.name}. Clique abaixo para jogar a partida ${currentMainMatch.currentGame + 1} de 3!`;
                }
                
                if (shieldBadge) {
                    shieldBadge.innerHTML = `
                        <div class="w-20 h-20 mx-auto rounded-2xl bg-slate-900 border-2 border-amber-400 shadow-2xl flex items-center justify-center p-2 text-4xl">
                            ${winner === PLAYER_WHITE ? teamRed.mascot : (winner === PLAYER_BLACK ? teamDark.mascot : '🤝')}
                        </div>
                        <div class="mt-1 text-sm font-bold text-amber-400">Placar da Série: ${currentMainMatch.wins1} x ${currentMainMatch.wins2}</div>
                    `;
                }

                if (btnRestart) {
                    btnRestart.innerHTML = `<i class="fa-solid fa-play"></i> Iniciar Jogo ${currentMainMatch.currentGame + 1} de 3`;
                }

                currentMainMatch.currentGame++;
            } else {
                // Conclusão das 3 partidas do confronto!
                currentMainMatch.played = true;
                currentMainMatch.active = false;

                let seriesWinner = null;
                if (currentMainMatch.wins1 > currentMainMatch.wins2) {
                    seriesWinner = teamRed;
                    teamRed.pts += 3;
                    teamRed.v += 1;
                    teamDark.d += 1;
                } else if (currentMainMatch.wins2 > currentMainMatch.wins1) {
                    seriesWinner = teamDark;
                    teamDark.pts += 3;
                    teamDark.v += 1;
                    teamRed.d += 1;
                } else {
                    teamRed.pts += 1;
                    teamRed.e += 1;
                    teamDark.pts += 1;
                    teamDark.e += 1;
                }

                teamRed.pj += 1;
                teamDark.pj += 1;

                matchResultsLog.unshift({
                    team1: teamRed.name,
                    team1Icon: teamRed.icon,
                    team1Color: teamRed.primaryColor,
                    team2: teamDark.name,
                    team2Icon: teamDark.icon,
                    team2Color: teamDark.secondaryColor || '#ffffff',
                    score: `${currentMainMatch.wins1} x ${currentMainMatch.wins2}`,
                    winner: seriesWinner ? seriesWinner.name : 'Empate'
                });
                updateMatchResultsUI();
                updateLeagueTable();

                if (seriesWinner) {
                    if (title) title.textContent = `🏆 ${seriesWinner.name.toUpperCase()} VENCEU O CONFRONTO!`;
                    if (desc) desc.textContent = `O ${seriesWinner.name} venceu a série de 3 jogos por ${currentMainMatch.wins1} a ${currentMainMatch.wins2} e conquistou +3 PONTOS no Brasileirão!`;
                } else {
                    if (title) title.textContent = `CONFRONTO EMPATADO!`;
                    if (desc) desc.textContent = `Série equilibrada! ${teamRed.name} e ${teamDark.name} empataram em ${currentMainMatch.wins1} a ${currentMainMatch.wins2} na série. Cada time ganha +1 PONTO!`;
                }

                if (shieldBadge) {
                    const emblem = seriesWinner || teamRed;
                    shieldBadge.innerHTML = `
                        <div class="w-20 h-20 mx-auto rounded-2xl bg-slate-900 border-2 border-amber-400 shadow-2xl flex items-center justify-center p-2 text-4xl">
                            ${emblem.mascot}
                        </div>
                        <div class="mt-1 text-sm font-bold text-amber-400">${emblem.icon} ${seriesWinner ? seriesWinner.name + ' (+3 PTS)' : 'EMPATE (+1 PT cada)'}</div>
                    `;
                }

                if (btnRestart) {
                    btnRestart.innerHTML = `<i class="fa-solid fa-play"></i> Próximo Confronto do Campeonato`;
                }

                checkChampionshipFinished();
            }

            if (overlay) overlay.classList.remove('opacity-0', 'pointer-events-none');
            startDancingCharacter(winner === PLAYER_WHITE ? teamRed : (winner === PLAYER_BLACK ? teamDark : teamRed));
        }

        function showChampionshipBanner(champion) {
            isGameEnded = true;
            clearInterval(timerInterval);
            playSound('win');

            const overlay = document.getElementById('banner-overlay');
            const title = document.getElementById('banner-title');
            const desc = document.getElementById('banner-desc');
            const shieldBadge = document.getElementById('banner-shield-badge');

            if (title) title.textContent = `🏆 ${champion.name.toUpperCase()} É O CAMPEÃO DO CAMPEONATO!`;
            if (desc) desc.textContent = `Sensacional! O ${champion.name} somou ${champion.pts} PONTOS ao longo das partidas e ergueu a taça do Brasileirão!`;

            if (shieldBadge) {
                const simTitles = champion.simulatorTitles || 1;
                const totalTitles = champion.brasileiraoCount + simTitles;
                shieldBadge.innerHTML = `
                    <div class="w-24 h-24 mx-auto rounded-3xl bg-slate-900 border-4 border-amber-400 shadow-2xl flex items-center justify-center p-2 text-5xl animate-bounce cursor-pointer hover:scale-105 transition transform" onclick="showTeamTitlesModalByTeamId('${champion.id}')" title="Clique para ver os títulos de ${champion.name}">
                        ${champion.mascot}
                    </div>
                    <div class="mt-2 text-lg font-black text-amber-300">🏆 CAMPEÃO DA SÉRIE A (${champion.pts} PTS) 🏆</div>
                    <div class="text-xs font-bold text-slate-300 mt-1">Total de Títulos Brasileiros: <span class="text-amber-400 font-extrabold">${totalTitles} Títulos</span> (${champion.brasileiraoCount} Históricos + ${simTitles} no Simulador)</div>
                `;
            }

            if (overlay) {
                overlay.classList.remove('opacity-0', 'pointer-events-none');
            }

            startDancingCharacter(champion);
        }

        function startDancingCharacter(team) {
            if (!dancerCtx || !dancerCanvas) return;

            confettiParticles = [];
            for (let i = 0; i < 80; i++) {
                confettiParticles.push({
                    x: Math.random() * dancerCanvas.width,
                    y: Math.random() * dancerCanvas.height - dancerCanvas.height,
                    size: Math.random() * 6 + 3,
                    color: ['#dc2626', '#fbbf24', '#ffffff', '#22c55e', '#3b82f6'][Math.floor(Math.random() * 5)],
                    vy: Math.random() * 2 + 1.5,
                    vx: (Math.random() - 0.5) * 1.5,
                    rotation: Math.random() * Math.PI * 2
                });
            }

            dancePhase = 0;

            if (dancerAnimationFrame) {
                cancelAnimationFrame(dancerAnimationFrame);
            }

            function animateDance() {
                if (!dancerCtx || !dancerCanvas) return;
                dancerCtx.clearRect(0, 0, dancerCanvas.width, dancerCanvas.height);

                dancePhase += 0.12;

                const cx = dancerCanvas.width / 2;
                const cy = dancerCanvas.height / 2 + 20;

                // Bounce background crowd
                for (let i = -3; i <= 3; i++) {
                    const offsetX = i * 35;
                    const bounceY = Math.sin(dancePhase + i) * 6;
                    dancerCtx.fillStyle = team ? team.primaryColor : '#dc2626';
                    dancerCtx.beginPath();
                    dancerCtx.arc(cx + offsetX, cy + 30 + bounceY, 12, 0, Math.PI * 2);
                    dancerCtx.fill();
                }

                // Mascot dancing center
                const mainBounce = Math.abs(Math.sin(dancePhase)) * 18;
                dancerCtx.font = '60px "Segoe UI Emoji", sans-serif';
                dancerCtx.textAlign = 'center';
                dancerCtx.textBaseline = 'middle';
                dancerCtx.fillText(team ? team.mascot : '🦅', cx, cy - mainBounce);

                // Confetti rendering
                confettiParticles.forEach(p => {
                    p.y += p.vy;
                    p.x += p.vx;
                    p.rotation += 0.05;

                    if (p.y > dancerCanvas.height) {
                        p.y = -10;
                        p.x = Math.random() * dancerCanvas.width;
                    }

                    dancerCtx.save();
                    dancerCtx.translate(p.x, p.y);
                    dancerCtx.rotate(p.rotation);
                    dancerCtx.fillStyle = p.color;
                    dancerCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    dancerCtx.restore();
                });

                dancerAnimationFrame = requestAnimationFrame(animateDance);
            }

            animateDance();
        }

        // --- RENDER BOARD & PIECES ---
        function renderBoard() {
            if (!ctx || !tileSize || !board || board.length < BOARD_SIZE) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let r = 0; r < BOARD_SIZE; r++) {
                for (let c = 0; c < BOARD_SIZE; c++) {
                    const isDark = (r + c) % 2 === 1;
                    
                    if (isDark) {
                        // Playable square: Deep Rubro-Negro Black
                        const gradDark = ctx.createLinearGradient(c * tileSize, r * tileSize, (c + 1) * tileSize, (r + 1) * tileSize);
                        gradDark.addColorStop(0, '#1c0505');
                        gradDark.addColorStop(1, '#0b0202');
                        ctx.fillStyle = gradDark;
                    } else {
                        // Non-playable square: Rich Flamengo Crimson Red
                        const gradLight = ctx.createLinearGradient(c * tileSize, r * tileSize, (c + 1) * tileSize, (r + 1) * tileSize);
                        gradLight.addColorStop(0, '#a51d1d');
                        gradLight.addColorStop(1, '#7f1d1d');
                        ctx.fillStyle = gradLight;
                    }
                    ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);

                    // Gold border accent around squares
                    ctx.strokeStyle = 'rgba(245, 158, 11, 0.18)';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(c * tileSize + 0.5, r * tileSize + 0.5, tileSize - 1, tileSize - 1);

                    if (selectedSquare && selectedSquare.r === r && selectedSquare.c === c) {
                        ctx.fillStyle = 'rgba(234, 179, 8, 0.5)';
                        ctx.fillRect(c * tileSize, r * tileSize, tileSize, tileSize);
                    }

                    if (selectedSquare) {
                        const isTarget = validMoves.some(m => 
                            m.from.r === selectedSquare.r && m.from.c === selectedSquare.c &&
                            m.to.r === r && m.to.c === c
                        );
                        if (isTarget) {
                            ctx.fillStyle = 'rgba(34, 197, 94, 0.65)';
                            ctx.beginPath();
                            ctx.arc((c + 0.5) * tileSize, (r + 0.5) * tileSize, tileSize * 0.22, 0, Math.PI * 2);
                            ctx.fill();
                            ctx.strokeStyle = '#ffffff';
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }
                    }

                    // Destaque visual em vermelho para peças com captura obrigatória
                    if (mandatoryCapturesAvailable && getPieceOwner(board[r][c]) === currentPlayer) {
                        const canCapture = validMoves.some(m => m.from.r === r && m.from.c === c);
                        if (canCapture) {
                            ctx.save();
                            ctx.strokeStyle = '#ef4444';
                            ctx.lineWidth = 3;
                            ctx.setLineDash([4, 4]);
                            ctx.beginPath();
                            ctx.arc((c + 0.5) * tileSize, (r + 0.5) * tileSize, tileSize * 0.44, 0, Math.PI * 2);
                            ctx.stroke();
                            ctx.restore();
                        }
                    }
                }
            }

            for (let r = 0; r < BOARD_SIZE; r++) {
                if (!board[r]) continue;
                for (let c = 0; c < BOARD_SIZE; c++) {
                    if (board[r][c] !== 0) {
                        drawPiece(r, c, board[r][c]);
                    }
                }
            }

            shockwaves.forEach(sw => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(239, 68, 68, ${sw.alpha})`;
                ctx.lineWidth = 4;
                ctx.stroke();
                ctx.restore();
            });

            captureParticles.forEach(p => {
                ctx.save();
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.fill();
                ctx.restore();
            });

            floatingTexts.forEach(ft => {
                ctx.save();
                ctx.globalAlpha = Math.max(0, ft.alpha);
                ctx.font = `900 ${Math.floor(tileSize * 0.3 * ft.scale)}px "Segoe UI Emoji", Inter, sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.strokeStyle = ft.strokeColor || '#000';
                ctx.lineWidth = 4;
                ctx.strokeText(ft.text, ft.x, ft.y);
                ctx.fillStyle = ft.color;
                ctx.fillText(ft.text, ft.x, ft.y);
                ctx.restore();
            });

            kingAuraPulse += 0.05;
        }

        function triggerCaptureParticles(row, col, isVictimWhite, wasKing) {
            const centerX = (col + 0.5) * tileSize;
            const centerY = (row + 0.5) * tileSize;

            shockwaves.push({
                x: centerX,
                y: centerY,
                radius: tileSize * 0.2,
                maxRadius: tileSize * 1.3,
                alpha: 1.0,
                color: isVictimWhite ? '#94a3b8' : '#ef4444'
            });

            const teamRed = SERIE_A_RIVAIS[playerRedTeamIndex];
            const teamDark = SERIE_A_RIVAIS[playerDarkTeamIndex];

            if (!isVictimWhite) {
                floatingTexts.push({
                    x: centerX,
                    y: centerY - tileSize * 0.35,
                    text: `${teamRed.mascot} ${teamRed.name.toUpperCase()}!`,
                    color: '#facc15',
                    strokeColor: '#7f1d1d',
                    alpha: 1.0,
                    scale: 1.2,
                    vy: -1.8
                });
                floatingTexts.push({
                    x: centerX,
                    y: centerY + tileSize * 0.1,
                    text: teamDark.phrase,
                    color: '#ffffff',
                    strokeColor: '#991b1b',
                    alpha: 1.0,
                    scale: 0.65,
                    vy: -1.2
                });
            } else {
                floatingTexts.push({
                    x: centerX,
                    y: centerY - tileSize * 0.2,
                    text: `${teamDark.mascot} ${teamDark.name.toUpperCase()}!`,
                    color: '#fef08a',
                    strokeColor: '#991b1b',
                    alpha: 1.0,
                    scale: 0.6,
                    vy: -1.2
                });
            }

            for (let i = 0; i < 25; i++) {
                const angle = Math.random() * Math.PI * 2;
                const speed = Math.random() * (tileSize * 0.12) + (tileSize * 0.03);

                captureParticles.push({
                    x: centerX,
                    y: centerY,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    radius: Math.random() * (tileSize * 0.06) + (tileSize * 0.015),
                    alpha: 1,
                    decay: Math.random() * 0.03 + 0.02,
                    color: isVictimWhite ? '#f87171' : '#facc15'
                });
            }
            animateParticles();
        }

        function drawPiece(r, c, piece) {
            const centerX = (c + 0.5) * tileSize;
            const centerY = (r + 0.5) * tileSize;
            const radius = tileSize * 0.38;
            const isWhite = getPieceOwner(piece) === PLAYER_WHITE;
            const king = isKing(piece);

            const activeTeam = isWhite ? SERIE_A_RIVAIS[playerRedTeamIndex] : SERIE_A_RIVAIS[playerDarkTeamIndex];

            // 1. AURA 3D DOURADA DE DAMA PROMOVIDA
            if (king) {
                ctx.save();
                const pulseAlpha = Math.sin(kingAuraPulse) * 0.25 + 0.45;
                const auraRadius = radius + (Math.sin(kingAuraPulse * 1.5) * 3) + 7;

                const auraGrad = ctx.createRadialGradient(
                    centerX, centerY, radius * 0.7,
                    centerX, centerY, auraRadius + 10
                );
                auraGrad.addColorStop(0, 'rgba(251, 191, 36, 0.95)');
                auraGrad.addColorStop(0.5, `rgba(245, 158, 11, ${pulseAlpha})`);
                auraGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');

                ctx.fillStyle = auraGrad;
                ctx.beginPath();
                ctx.arc(centerX, centerY, auraRadius + 10, 0, Math.PI * 2);
                ctx.fill();

                ctx.strokeStyle = '#fef08a';
                ctx.lineWidth = 2.5;
                ctx.setLineDash([5, 5]);
                ctx.beginPath();
                ctx.arc(centerX, centerY, auraRadius, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            }

            // 2. SOMBRA 3D PROJETADA NA MESA
            ctx.save();
            ctx.beginPath();
            ctx.ellipse(centerX + 3, centerY + radius * 0.15 + 4, radius * 1.05, radius * 0.85, 0, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
            ctx.filter = 'blur(5px)';
            ctx.fill();
            ctx.restore();

            // 3. BASE DA PEÇA (ESPESSURA DE CILINDRO 3D)
            const depthOffsetY = radius * 0.12;
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY + depthOffsetY, radius, 0, Math.PI * 2);
            ctx.fillStyle = isWhite ? '#450a0a' : '#020617';
            ctx.fill();
            ctx.restore();

            // 4. TOPO DA PEÇA 3D (ESFERA/GRADIENTE DE LUZ ILUMINADO)
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

            const grad3D = ctx.createRadialGradient(
                centerX - radius * 0.35,
                centerY - radius * 0.35,
                radius * 0.05,
                centerX,
                centerY,
                radius
            );

            if (isWhite) {
                if (activeTeam.id === 'flamengo') {
                    grad3D.addColorStop(0, '#f87171');
                    grad3D.addColorStop(0.4, '#dc2626');
                    grad3D.addColorStop(0.85, '#991b1b');
                    grad3D.addColorStop(1, '#450a0a');
                } else {
                    grad3D.addColorStop(0, '#ffffff');
                    grad3D.addColorStop(0.4, activeTeam.primaryColor);
                    grad3D.addColorStop(1, '#020617');
                }
            } else {
                if (activeTeam.id === 'vasco' || activeTeam.id === 'corinthians' || activeTeam.id === 'botafogo') {
                    grad3D.addColorStop(0, '#64748b');
                    grad3D.addColorStop(0.4, '#1e293b');
                    grad3D.addColorStop(0.85, '#0f172a');
                    grad3D.addColorStop(1, '#020617');
                } else {
                    grad3D.addColorStop(0, '#ffffff');
                    grad3D.addColorStop(0.4, activeTeam.primaryColor);
                    grad3D.addColorStop(1, '#020617');
                }
            }

            ctx.fillStyle = grad3D;
            ctx.fill();

            // Contorno chanfrado 3D (Bevel Ring)
            ctx.lineWidth = 3.5;
            ctx.strokeStyle = king ? '#facc15' : (isWhite ? 'rgba(254, 202, 202, 0.8)' : 'rgba(148, 163, 184, 0.7)');
            ctx.stroke();

            // Ranhura interna de relevo 3D
            ctx.lineWidth = 1.5;
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius * 0.78, 0, Math.PI * 2);
            ctx.stroke();

            // Brilho Especular 3D Superior (Glossy Highlight)
            ctx.beginPath();
            ctx.arc(centerX - radius * 0.15, centerY - radius * 0.15, radius * 0.7, Math.PI * 1.1, Math.PI * 1.8);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
            ctx.lineWidth = 2.5;
            ctx.stroke();
            ctx.restore();

            // 5. ESCUDO DO TIME EM 3D NO CENTRO DA PEÇA (VIA API DE IMAGEM / DATA-URI VETORIAL 3D)
            const logoImg = teamImageCache[activeTeam.id];

            if (logoImg && logoImg.complete && logoImg.naturalWidth !== 0) {
                ctx.save();
                // Efeito 3D de relevo e sombra projetada no emblema
                ctx.shadowColor = 'rgba(0, 0, 0, 0.85)';
                ctx.shadowBlur = 7;
                ctx.shadowOffsetY = 3;
                ctx.shadowOffsetX = 1;

                const imgSize = radius * (king ? 1.45 : 1.35);
                ctx.drawImage(logoImg, centerX - imgSize / 2, centerY - imgSize / 2, imgSize, imgSize);
                ctx.restore();
            } else {
                // Fallback Vetorial com Efeito 3D
                if (isWhite) {
                    if (activeTeam.id === 'flamengo') {
                        drawFlamengoShield(ctx, centerX, centerY, radius * 1.25, king);
                    } else if (activeTeam.id === 'cruzeiro') {
                        drawFoxSilhouette(ctx, centerX, centerY, radius * 0.8, king, activeTeam.secondaryColor || '#ffffff');
                    } else {
                        ctx.save();
                        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                        ctx.shadowBlur = 5;
                        ctx.shadowOffsetY = 2;
                        ctx.fillStyle = king ? '#fef08a' : (activeTeam.secondaryColor || '#ffffff');
                        ctx.font = `900 ${radius * 0.65}px Inter, sans-serif`;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(activeTeam.icon, centerX, centerY);
                        ctx.restore();
                    }
                } else {
                    if (activeTeam.id === 'cruzeiro') {
                        drawFoxSilhouette(ctx, centerX, centerY, radius * 0.8, king, activeTeam.secondaryColor || '#ffffff');
                    } else {
                        ctx.save();
                        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
                        ctx.shadowBlur = 5;
                        ctx.shadowOffsetY = 2;
                        ctx.fillStyle = king ? '#fef08a' : (activeTeam.id === 'vasco' ? '#ffffff' : activeTeam.secondaryColor || '#ffffff');
                        ctx.font = `900 ${radius * 0.65}px Inter, sans-serif`;
                        ctx.textAlign = 'center';
                        ctx.textBaseline = 'middle';
                        ctx.fillText(activeTeam.icon, centerX, centerY);
                        ctx.restore();
                    }
                }
            }

            // 6. COROA E MASCOTE 3D PARA DAMA
            if (king) {
                const teamMascot = isWhite ? SERIE_A_RIVAIS[playerRedTeamIndex].mascot : SERIE_A_RIVAIS[playerDarkTeamIndex].mascot;
                ctx.save();
                ctx.shadowColor = 'rgba(0, 0, 0, 0.9)';
                ctx.shadowBlur = 7;
                ctx.shadowOffsetY = 2;
                ctx.font = `${radius * 0.7}px "Segoe UI Emoji", sans-serif`;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(teamMascot, centerX, centerY - radius * 0.7);
                ctx.restore();
            }
        }

        // --- INTERACTION & EVENT LISTENERS ---
        function updateUI() {
            const cardWhite = document.getElementById('card-player-white');
            const cardBlack = document.getElementById('card-player-black');
            const indWhite = document.getElementById('turn-indicator-white');
            const indBlack = document.getElementById('turn-indicator-black');
            
            const teamRed = SERIE_A_RIVAIS[playerRedTeamIndex];
            const teamDark = SERIE_A_RIVAIS[playerDarkTeamIndex];

            const seriesBadge = document.getElementById('series-status-badge');
            if (seriesBadge) {
                seriesBadge.textContent = `Jogo ${currentMainMatch ? currentMainMatch.currentGame : 1}/3`;
            }

            // Atualização do Placar Superior (Acima do Tabuleiro)
            const topRedName = document.getElementById('top-red-name');
            if (topRedName) topRedName.textContent = teamRed.name;

            const topDarkName = document.getElementById('top-dark-name');
            if (topDarkName) topDarkName.textContent = teamDark.name;

            const topRedCaps = document.getElementById('top-red-captures');
            if (topRedCaps) topRedCaps.textContent = capturedByWhite;

            const topDarkCaps = document.getElementById('top-dark-caps');
            if (topDarkCaps) topDarkCaps.textContent = capturedByBlack;

            const topScoreDisplay = document.getElementById('top-score-display');
            if (topScoreDisplay) topScoreDisplay.textContent = `${capturedByWhite} x ${capturedByBlack}`;

            const topSeriesDisplay = document.getElementById('top-series-display');
            if (topSeriesDisplay && currentMainMatch) {
                topSeriesDisplay.textContent = `Jogo ${currentMainMatch.currentGame || 1}/3 (Série: ${currentMainMatch.wins1 || 0} x ${currentMainMatch.wins2 || 0})`;
            }

            const topRedLogo = document.getElementById('top-red-logo');
            if (topRedLogo) {
                topRedLogo.onclick = () => showTeamTitlesModalByTeamId(teamRed.id);
                const logoImg = teamImageCache[teamRed.id];
                if (logoImg && logoImg.complete && logoImg.naturalWidth !== 0) {
                    topRedLogo.innerHTML = '';
                    const imgEl = document.createElement('img');
                    imgEl.src = logoImg.src;
                    imgEl.alt = teamRed.name;
                    imgEl.className = 'w-full h-full object-contain drop-shadow';
                    topRedLogo.appendChild(imgEl);
                } else {
                    topRedLogo.innerHTML = `<span class="font-bold text-xs" style="color: ${teamRed.primaryColor}">${teamRed.icon}</span>`;
                }
            }

            const topDarkLogo = document.getElementById('top-dark-logo');
            if (topDarkLogo) {
                topDarkLogo.onclick = () => showTeamTitlesModalByTeamId(teamDark.id);
                const logoDarkImg = teamImageCache[teamDark.id];
                if (logoDarkImg && logoDarkImg.complete && logoDarkImg.naturalWidth !== 0) {
                    topDarkLogo.innerHTML = '';
                    const imgEl = document.createElement('img');
                    imgEl.src = logoDarkImg.src;
                    imgEl.alt = teamDark.name;
                    imgEl.className = 'w-full h-full object-contain drop-shadow';
                    topDarkLogo.appendChild(imgEl);
                } else {
                    topDarkLogo.innerHTML = `<span class="font-bold text-xs" style="color: ${teamDark.primaryColor}">${teamDark.icon}</span>`;
                }
            }

            const nameWhite = document.getElementById('name-white');
            if (nameWhite) nameWhite.textContent = `${teamRed.name} (Vermelhas)`;

            const iconRedContainer = document.getElementById('red-icon-container');
            if (iconRedContainer) {
                const logoImg = teamImageCache[teamRed.id];
                if (logoImg && logoImg.complete && logoImg.naturalWidth !== 0) {
                    iconRedContainer.innerHTML = '';
                    const imgEl = document.createElement('img');
                    imgEl.src = logoImg.src;
                    imgEl.alt = teamRed.name;
                    imgEl.className = 'w-full h-full object-contain drop-shadow';
                    iconRedContainer.appendChild(imgEl);
                } else if (teamRed.id === 'flamengo') {
                    iconRedContainer.innerHTML = `
                        <svg viewBox="0 0 100 120" class="w-full h-full drop-shadow">
                            <path d="M5 5 H95 V40 C95 80, 75 105, 50 115 C25 105, 5 80, 5 40 Z" fill="#111111" stroke="#ffffff" stroke-width="6"/>
                            <path d="M 5 28 H 95 V 45 H 5 Z M 5 62 H 95 V 79 H 5 Z M 12 95 H 88 V 104 C 75 111 62 114 50 115 C 38 114 25 111 12 95 Z" fill="#dc2626"/>
                            <rect x="5" y="5" width="48" height="42" fill="#111111" stroke="#ffffff" stroke-width="2"/>
                            <text x="29" y="33" font-family="Inter, sans-serif" font-weight="900" font-size="22" fill="#ffffff" text-anchor="middle">CRF</text>
                        </svg>
                    `;
                } else {
                    iconRedContainer.innerHTML = `<span class="font-bold text-xs" style="color: ${teamRed.primaryColor}">${teamRed.icon}</span>`;
                }
            }

            const nameBlack = document.getElementById('name-black');
            if (nameBlack) nameBlack.textContent = isVsAI ? `${teamDark.name} (IA)` : `${teamDark.name} (Escuras)`;
            
            const rivalIcon = document.getElementById('rival-icon');
            if (rivalIcon) {
                const logoDarkImg = teamImageCache[teamDark.id];
                if (logoDarkImg && logoDarkImg.complete && logoDarkImg.naturalWidth !== 0) {
                    rivalIcon.innerHTML = '';
                    const imgEl = document.createElement('img');
                    imgEl.src = logoDarkImg.src;
                    imgEl.alt = teamDark.name;
                    imgEl.className = 'w-full h-full object-contain drop-shadow';
                    rivalIcon.appendChild(imgEl);
                } else {
                    rivalIcon.textContent = teamDark.icon;
                    rivalIcon.style.color = teamDark.primaryColor === '#ffffff' || teamDark.primaryColor === '#000000' ? '#f87171' : teamDark.primaryColor;
                }
            }

            const capBlack = document.getElementById('captured-black-count');
            if (capBlack) capBlack.textContent = `Capturou: ${capturedByWhite}`;
            
            const capWhite = document.getElementById('captured-white-count');
            if (capWhite) capWhite.textContent = `Capturou: ${capturedByBlack}`;

            if (cardWhite && cardBlack && indWhite && indBlack) {
                if (currentPlayer === PLAYER_WHITE) {
                    cardWhite.classList.add('border-red-500');
                    cardWhite.classList.remove('opacity-60', 'border-transparent');
                    cardBlack.classList.add('opacity-60', 'border-transparent');
                    cardBlack.classList.remove('border-amber-400');
                    indWhite.classList.remove('hidden');
                    indBlack.classList.add('hidden');
                } else {
                    cardBlack.classList.add('border-amber-400');
                    cardBlack.classList.remove('opacity-60', 'border-transparent');
                    cardWhite.classList.add('opacity-60', 'border-transparent');
                    cardWhite.classList.remove('border-red-500');
                    indBlack.classList.remove('hidden');
                    indWhite.classList.add('hidden');
                }
            }

            const btnUndo = document.getElementById('btn-undo');
            if (btnUndo) btnUndo.disabled = moveHistory.length === 0 || isAiThinking;
        }

        // Dropdown Event Listeners
        const selRed = document.getElementById('select-team-red');
        if (selRed) {
            selRed.addEventListener('change', (e) => {
                playerRedTeamIndex = parseInt(e.target.value);
                if (currentMainMatch) currentMainMatch.team1 = playerRedTeamIndex;
                updateUI();
                renderBoard();
            });
        }

        const selDark = document.getElementById('select-team-dark');
        if (selDark) {
            selDark.addEventListener('change', (e) => {
                playerDarkTeamIndex = parseInt(e.target.value);
                if (currentMainMatch) currentMainMatch.team2 = playerDarkTeamIndex;
                currentRivalIndex = playerDarkTeamIndex;
                updateUI();
                renderBoard();
            });
        }

        if (canvas) {
            function handleBoardInput(e) {
                if (isAiThinking || isGameEnded) return;

                const rect = canvas.getBoundingClientRect();
                const scaleX = canvas.width / rect.width;
                const scaleY = canvas.height / rect.height;

                const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
                const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0] ? e.touches[0].clientY : 0);

                const x = (clientX - rect.left) * scaleX;
                const y = (clientY - rect.top) * scaleY;

                const col = Math.min(BOARD_SIZE - 1, Math.max(0, Math.floor(x / tileSize)));
                const row = Math.min(BOARD_SIZE - 1, Math.max(0, Math.floor(y / tileSize)));

                if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return;

                if (selectedSquare) {
                    const move = validMoves.find(m => 
                        m.from.r === selectedSquare.r && 
                        m.from.c === selectedSquare.c && 
                        m.to.r === row && 
                        m.to.c === col
                    );

                    if (move) {
                        executeMove(move);
                        return;
                    }
                }

                if (getPieceOwner(board[row][col]) === currentPlayer) {
                    const pieceMoves = validMoves.filter(m => m.from.r === row && m.from.c === col);
                    if (pieceMoves.length > 0) {
                        selectedSquare = { r: row, c: col };
                        playSound('move');
                        renderBoard();
                    } else if (mandatoryCapturesAvailable) {
                        playSound('move');
                        const centerX = (col + 0.5) * tileSize;
                        const centerY = (row + 0.5) * tileSize;
                        floatingTexts.push({
                            x: centerX,
                            y: centerY - tileSize * 0.3,
                            text: "CAPTURA OBRIGATÓRIA!",
                            color: '#ef4444',
                            strokeColor: '#000000',
                            alpha: 1.0,
                            scale: 0.7,
                            vy: -1.0
                        });
                        animateParticles();
                    }
                } else {
                    selectedSquare = null;
                    renderBoard();
                }
            }

            canvas.addEventListener('pointerdown', handleBoardInput);
        }

        // UI Buttons Events
        const btnNewGame = document.getElementById('btn-new-game');
        if (btnNewGame) btnNewGame.addEventListener('click', () => initGame());

        const btnBannerRestart = document.getElementById('btn-banner-restart');
        if (btnBannerRestart) btnBannerRestart.addEventListener('click', () => initGame());

        const btnResetLeague = document.getElementById('btn-reset-league');
        if (btnResetLeague) btnResetLeague.addEventListener('click', () => resetLeagueTable());

        // Botão de Áudio
        const btnSound = document.getElementById('btn-sound');
        if (btnSound) {
            btnSound.addEventListener('click', () => {
                soundEnabled = !soundEnabled;
                const icon = document.getElementById('sound-icon');
                if (icon) {
                    icon.className = soundEnabled ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark text-red-400';
                }
            });
        }

        // Botão Desfazer Jogada
        function undoMove() {
            if (moveHistory.length === 0 || isAiThinking || isGameEnded) return;
            const stepsToUndo = (isVsAI || isSimulating) && moveHistory.length >= 2 ? 2 : 1;
            for (let i = 0; i < stepsToUndo; i++) {
                if (moveHistory.length === 0) break;
                const lastState = moveHistory.pop();
                board = cloneBoard(lastState.boardState);
                currentPlayer = lastState.player;
                capturedByWhite = lastState.capturedW;
                capturedByBlack = lastState.capturedB;
            }
            selectedSquare = null;
            updateUI();
            calculateAllMovesForCurrentPlayer();
            renderBoard();
        }

        const btnUndo = document.getElementById('btn-undo');
        if (btnUndo) {
            btnUndo.addEventListener('click', () => undoMove());
        }

        // Botões adicionais de Simulação
        const btnNextSimMatch = document.getElementById('btn-next-sim-match');
        if (btnNextSimMatch) btnNextSimMatch.addEventListener('click', () => initGame());

        const btnSimulateFullLeague = document.getElementById('btn-simulate-full-league');
        if (btnSimulateFullLeague) btnSimulateFullLeague.addEventListener('click', () => simulateFullChampionship());

        // GERENCIAMENTO DE MODAIS E CLIQUES DO MOUSE
        function setupModalListeners() {
            // Modal da Galeria de Títulos do Clube
            const modalTeam = document.getElementById('modal-team-titles');
            const btnCloseTeam = document.getElementById('btn-close-team-titles');
            const btnOkTeam = document.getElementById('btn-team-titles-ok');

            const hideTeamModal = () => {
                if (modalTeam) modalTeam.classList.add('hidden');
            };

            if (btnCloseTeam) btnCloseTeam.onclick = hideTeamModal;
            if (btnOkTeam) btnOkTeam.onclick = hideTeamModal;
            if (modalTeam) {
                modalTeam.onclick = (e) => {
                    if (e.target === modalTeam) hideTeamModal();
                };
            }

            // Modal do Guia e API de Regras
            const modalRules = document.getElementById('modal-rules');
            const btnRules = document.getElementById('btn-rules');
            const btnCloseRules = document.getElementById('btn-close-rules');
            const btnOkRules = document.getElementById('btn-rules-ok');

            const showRulesModal = () => {
                if (modalRules) {
                    modalRules.classList.remove('hidden');
                    renderJsonApiSpec();
                }
            };

            const hideRulesModal = () => {
                if (modalRules) modalRules.classList.add('hidden');
            };

            if (btnRules) btnRules.onclick = showRulesModal;
            if (btnCloseRules) btnCloseRules.onclick = hideRulesModal;
            if (btnOkRules) btnOkRules.onclick = hideRulesModal;
            if (modalRules) {
                modalRules.onclick = (e) => {
                    if (e.target === modalRules) hideRulesModal();
                };
            }
        }

        function setupRulesApiTabs() {
            const tabs = [
                { btn: 'rule-tab-how', content: 'rule-content-how' },
                { btn: 'rule-tab-parts', content: 'rule-content-parts' },
                { btn: 'rule-tab-series', content: 'rule-content-series' },
                { btn: 'rule-tab-api', content: 'rule-content-api' }
            ];

            tabs.forEach(({ btn, content }) => {
                const btnEl = document.getElementById(btn);
                if (!btnEl) return;

                btnEl.onclick = () => {
                    tabs.forEach(t => {
                        const b = document.getElementById(t.btn);
                        const c = document.getElementById(t.content);
                        if (b) {
                            if (t.btn === btn) {
                                b.className = 'flex-1 py-1.5 px-3 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 transition whitespace-nowrap font-bold';
                            } else {
                                b.className = 'flex-1 py-1.5 px-3 rounded-lg text-slate-400 hover:text-slate-200 transition whitespace-nowrap font-bold';
                            }
                        }
                        if (c) {
                            if (t.content === content) c.classList.remove('hidden');
                            else c.classList.add('hidden');
                        }
                    });

                    if (content === 'rule-content-api') {
                        renderJsonApiSpec();
                    }
                };
            });
        }

        const modePvp = document.getElementById('mode-pvp');
        if (modePvp) modePvp.addEventListener('click', () => {
            isVsAI = false;
            isSimulating = false;
            setActiveModeButton('mode-pvp');
            document.getElementById('ai-difficulty-container').classList.add('hidden');
            document.getElementById('sim-controls').classList.add('hidden');
            initGame();
        });

        const modeAi = document.getElementById('mode-ai');
        if (modeAi) modeAi.addEventListener('click', () => {
            isVsAI = true;
            isSimulating = false;
            setActiveModeButton('mode-ai');
            document.getElementById('ai-difficulty-container').classList.remove('hidden');
            document.getElementById('ai-difficulty-container').classList.add('flex');
            document.getElementById('sim-controls').classList.add('hidden');
            initGame();
        });

        const modeSim = document.getElementById('mode-sim');
        if (modeSim) modeSim.addEventListener('click', () => {
            isVsAI = true;
            isSimulating = true;
            setActiveModeButton('mode-sim');
            document.getElementById('ai-difficulty-container').classList.add('hidden');
            document.getElementById('sim-controls').classList.remove('hidden');
            document.getElementById('sim-controls').classList.add('flex');
            initGame();
        });

        const modeLeagueSim = document.getElementById('mode-league-sim');
        if (modeLeagueSim) modeLeagueSim.addEventListener('click', () => {
            isVsAI = true;
            isSimulating = true;
            setActiveModeButton('mode-league-sim');
            document.getElementById('ai-difficulty-container').classList.add('hidden');
            document.getElementById('sim-controls').classList.remove('hidden');
            document.getElementById('sim-controls').classList.add('flex');
            simulateFullChampionship();
        });

        function setActiveModeButton(activeId) {
            const ids = ['mode-pvp', 'mode-ai', 'mode-sim', 'mode-league-sim'];
            ids.forEach(id => {
                const btn = document.getElementById(id);
                if (!btn) return;
                if (id === activeId) {
                    btn.className = "py-2 px-1 rounded-xl border border-amber-500/50 bg-amber-500/10 text-amber-400 font-semibold text-xs flex flex-col items-center gap-1 transition";
                } else {
                    btn.className = "py-2 px-1 rounded-xl border border-slate-700 bg-slate-800/50 text-slate-400 font-semibold text-xs flex flex-col items-center gap-1 transition hover:border-slate-600";
                }
            });
        }

        function renderJsonApiSpec() {
            const jsonSpecEl = document.getElementById('json-api-spec');
            if (!jsonSpecEl) return;

            const teamRed = SERIE_A_RIVAIS[playerRedTeamIndex];
            const teamDark = SERIE_A_RIVAIS[playerDarkTeamIndex];

            const apiSpecData = {
                api_name: "MaracaSerieA_CheckersRulesAPI",
                version: "3.5.0",
                game_mode: isSimulating ? "SIMULATION" : (isVsAI ? "VS_AI" : "PVP"),
                time_limit_seconds: MATCH_TIME_LIMIT,
                time_remaining_seconds: Math.max(0, MATCH_TIME_LIMIT - secondsElapsed),
                series_rules: {
                    matches_per_series: 3,
                    current_match_index: (currentMainMatch ? (currentMainMatch.gamesPlayed || 0) + 1 : 1),
                    points_for_win: 3,
                    points_for_draw: 1,
                    tiebreaker: "MOST_CAPTURES_ON_TIMEOUT"
                },
                current_match_state: {
                    team_red: {
                        id: teamRed.id,
                        name: teamRed.name,
                        mascot: teamRed.mascot,
                        captures: capturedByWhite
                    },
                    team_dark: {
                        id: teamDark.id,
                        name: teamDark.name,
                        mascot: teamDark.mascot,
                        captures: capturedByBlack
                    },
                    turn_owner: currentPlayer === PLAYER_WHITE ? teamRed.name : teamDark.name,
                    mandatory_captures_active: mandatoryCapturesAvailable
                },
                components: {
                    board: "8x8 Canvas HTML5 com Sombras & Extrusão 3D",
                    pieces: "Escudos Vetoriais 3D SVG em Cache via Data-URI",
                    kings: "Super Damas com Aura Dourada + Mascote do Clube",
                    background_engine: "Partida IA Paralela ao Vivo com Minimax"
                }
            };

            jsonSpecEl.textContent = JSON.stringify(apiSpecData, null, 2);
        }

        // Start game on window load
        window.onload = function() {
            preloadTeamLogos();
            initGame();
            resizeCanvas();
            setupModalListeners();
            setupRulesApiTabs();
        };