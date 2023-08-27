const wordE1 = document.getElementById('word');
const wrongLettersE1 = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll(".figure-part");

const words = ['perro', 'gato', 'elefante', 'cebra', 'rana', 'león', 'tigre', 'conejo', 'jirafa', 'hipopótamo', 'tortuga', 'oso', 'camello', 'mono', 'koala', 'panda', 'puercoespín', 'ardilla', 'castor', 'búho', 'águila', 'colibrí', 'buitre', 'murciélago', 'canguro', 'delfín', 'ballena', 'orca', 'foca', 'morsa', 'pingüino', 'lobo', 'zorro', 'mapache', 'puma', 'rinoceronte', 'halcón', 'cóndor', 'águila calva', 'tiburón', 'cocodrilo', 'serpiente', 'tucán', 'pelícano', 'ganso', 'cisne', 'pato', 'paloma', 'bisonte', 'jaguar', 'leopardo', 'ocelote', 'pantera', 'guepardo', 'hiena', 'suricata', 'pez espada', 'calamar', 'medusa', 'erizo de mar', 'estrella de mar', 'pulpo', 'caracol', 'lagarto', 'iguana', 'rana toro', 'trucha', 'salmon', 'barracuda', 'lucio', 'luciérnaga', 'ciempiés', 'mariposa', 'polilla', 'mariquita', 'libélula', 'abeja', 'hormiga', 'gusano', 'saltamontes', 'grillo', 'langosta', 'cangrejo', 'alacrán', 'tarántula', 'oruga', 'escarabajo', 'avispa', 'cucaracha', 'mosquito', 'pulga', 'garrapata', 'salamandra', 'anguila', 'hippocampo', 'cabra', 'vaca', 'cerdito', 'gallina', 'gallo', 'oveja', 'caballo', 'ratón', 'aguacate', 'papa', 'tomate', 'lechuga', 'fresa', 'naranja', 'piña', 'manzana', 'melón', 'sandía', 'plátano', 'uva', 'mango', 'cereza', 'ciruela', 'durazno', 'limón', 'nuez', 'pistacho', 'almendra', 'cacahuete', 'puerro', 'cebolla', 'ajo', 'brócoli', 'zanahoria', 'espinacas', 'repollo', 'coliflor', 'pimiento', 'maíz', 'guisantes', 'garbanzos', 'lentejas', 'frijoles', 'arroz', 'espagueti', 'hamburguesa', 'pizza', 'sándwich', 'taco', 'ensalada', 'sopa', 'huevo', 'queso', 'leche', 'mantequilla', 'yogur', 'crema', 'helado', , 'un', 'uno', 'pais', 'futbol', 'programacion', 'ingenieria', 'leon', 'felicidad', 'amor', 'mundo', 'noche', 'dia', 'Corresponsabilizacion', 'jeison', 'desoxirribonucleico', 'esternocleidomastoideo', 'amor', 'fantasma', 'esgrima', 'parásito', 'evolución', 'chimenea', 'hipopótamo', 'albahaca', 'reproducir', 'parásito', 'telescopio', 'cascarrabias', 'flamenco', 'sacrificio', 'algoritmo', 'enciclopedia', 'abominable', 'vegetación', 'luminiscencia', 'comunismo', 'castañuela', 'arcoíris', 'cinematográfico', 'maravillosa', 'hipopótamo', 'perpendicular', 'cataclismo', 'tergiversar', 'colaborativo', 'espectáculo', 'caricatura', 'estereotipo', 'perspectiva', 'desesperanza', 'tergiversar', 'magnífico', 'fotográfico', 'puntualidad', 'reivindicar', 'descomunal', 'estadístico', 'comunicación', 'transatlántico', 'microorganismo',];

let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

//Show hidden word
function displayWord() {
    wordE1.innerHTML = `
    ${selectedWord
            .split('')
            .map(
                letter => `
        <span class="letter">
        ${correctLetters.includes(letter) ? letter : ''}
        </span>
        `
            )
            .join('')}
    `;

    const innerWord = wordE1.innerText.replace(/\n/g, '');

    if (innerWord === selectedWord) {
        finalMessage.innerText = '🥳¡Felicidades! ¡Ganaste!😃';
        popup.style.display = 'flex';
    }
}

// Update the wrong letters
function updateWrongLetterE1() {
    //Display wrong letters
    wrongLettersE1.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    //Display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if (index < errors) {
            part.style.display = 'block'
        }
        else {
            part.style.display = 'none';
        }
    });

    //Check if lost
    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText =' 😱 Lamentablemente perdiste.😕';
        popup.style.display = 'flex';
    }
}

//Show notification
function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

//Keydown letter press
window.addEventListener('keydown', e => {
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLetterE1();
            } else {
                showNotification();
            }
        }
    }
});

//Restart game and play again
playAgainBtn.addEventListener('click', () => {
    //Empty arrays
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];

    displayWord();

    updateWrongLetterE1();

    popup.style.display = 'none';
});

displayWord();

