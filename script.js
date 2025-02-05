(() => {
    // Variável privada para o histórico de cálculos
    const history = [];

    // Cache dos elementos DOM mais utilizados
    const displayEl = document.getElementById('resultado');
    const historyListEl = document.getElementById('history-list');
    const clickSoundEl = document.getElementById('click-sound');
    const themeSwitcherButtons = document.querySelectorAll('.theme-switcher button');

    // Função auxiliar para atualizar o display
    const updateDisplay = (value) => (displayEl.value = value);

    // Insere um caractere ou operador no display
    const insert = (num) => {
        playSound();
        updateDisplay(displayEl.value + num);
    };

    // Limpa completamente o display
    const clean = () => {
        playSound();
        updateDisplay("");
    };

    // Remove o último caractere do display
    const back = () => {
        playSound();
        updateDisplay(displayEl.value.slice(0, -1));
    };

    // Calcula o resultado da expressão e atualiza o histórico
    const calcular = () => {
        playSound();
        const expression = displayEl.value;
        if (expression) {
            try {
                // Atenção: o uso de eval() pode representar riscos de segurança.
                // Em produção, considere um parser matemático mais seguro.
                const result = eval(expression);
                addToHistory(expression, result);
                updateDisplay(result);
            } catch (error) {
                updateDisplay("Erro!");
                setTimeout(() => updateDisplay(""), 1500);
            }
        } else {
            updateDisplay("Nada...");
            setTimeout(() => updateDisplay(""), 1000);
        }
    };

    // Alterna a visibilidade do painel científico
    const toggleScientific = () => {
        playSound();
        const panel = document.getElementById('scientific-panel');
        panel.classList.toggle('hidden');
    };

    // Converte temperatura de Celsius para Fahrenheit
    const converterTemp = () => {
        playSound();
        const tempInputValue = document.getElementById('temp-input').value;
        const tempResultEl = document.getElementById('temp-result');
        if (!tempInputValue) {
            tempResultEl.innerText = "Insira um valor!";
            return;
        }
        const celsius = parseFloat(tempInputValue);
        const fahrenheit = (celsius * 9) / 5 + 32;
        tempResultEl.innerText = `${celsius}°C = ${fahrenheit.toFixed(2)}°F`;
    };

    // Adiciona uma operação ao histórico e atualiza a interface
    const addToHistory = (expression, result) => {
        history.push({ expression, result });
        renderHistory();
    };

    // Renderiza o histórico de cálculos na interface
    const renderHistory = () => {
        historyListEl.innerHTML = "";
        [...history]
            .reverse()
            .forEach(({ expression, result }) => {
                const li = document.createElement('li');
                li.innerText = `${expression} = ${result}`;
                historyListEl.appendChild(li);
            });
    };

    // Reproduz o som de clique para feedback
    const playSound = () => {
        if (clickSoundEl) {
            clickSoundEl.currentTime = 0;
            clickSoundEl.play();
        }
    };

    // Define o tema da interface
    const setTheme = (theme) => {
        const availableThemes = ['dark', 'light', 'neon', 'vintage'];
        document.body.classList.remove(...availableThemes.map((t) => `theme-${t}`));
        document.body.classList.add(`theme-${theme}`);
    };

    // Configura os eventos dos botões do switcher de temas
    themeSwitcherButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedTheme = button.getAttribute('data-theme');
            setTheme(selectedTheme);
            // Marca o botão ativo
            themeSwitcherButtons.forEach((btn) => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Inicializa o tema padrão
    setTheme('dark');

    // Cria um objeto com as funções que desejamos expor globalmente
    const Calculator = {
        insert,
        clean,
        back,
        calcular,
        toggleScientific,
        converterTemp,
        playSound,
    };

    // Expondo as funções globalmente para que os manipuladores inline continuem funcionando
    Object.assign(window, Calculator);


})();