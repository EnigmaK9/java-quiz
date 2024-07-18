const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');

const errorSound = new Audio('sounds/error.mp3');
const successSound = new Audio('sounds/success.mp3');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;
let respuestasUsuario = [];
let preguntasSeleccionadas = [];

const preguntas = [
    // Pregunta 1
    {
        pregunta: "En la metafísica del software, ¿qué representa el concepto de 'abstracción'?",
        respuestas: [
            "La eliminación de la realidad tangible para alcanzar la pureza del pensamiento algorítmico",
            "El proceso de encapsular los detalles intrínsecos en un velo de interfaces",
            "La manifestación de las ideas platónicas en el código fuente",
            "Una distorsión ontológica de los datos primitivos"
        ],
        correcta: "El proceso de encapsular los detalles intrínsecos en un velo de interfaces"
    },
    // Pregunta 2
    {
        pregunta: "En términos epistemológicos, ¿cómo se define la 'herencia' en un paradigma de programación orientado a objetos?",
        respuestas: [
            "La transferencia de atributos y métodos a través del continuo espacio-temporal de clases",
            "Una imitación mimesis de la relación arquetípica entre el padre y el hijo",
            "La perpetuación de los arquetipos de clases a través de generaciones de instancias",
            "Una manifestación de la teoría de los universales en el diseño de software"
        ],
        correcta: "La transferencia de atributos y métodos a través del continuo espacio-temporal de clases"
    },
    // Pregunta 3
    {
        pregunta: "¿Cuál es la relación dialéctica entre 'polimorfismo' y 'sustitución de Liskov' en el pensamiento algorítmico?",
        respuestas: [
            "Una síntesis hegeliana de formas y funciones que permite la flexibilidad ontológica",
            "Una tensión entre la abstracción y la implementación que sublima la diversidad de tipos",
            "Un paralogismo que une las formas abstractas en una única estructura conceptual",
            "Una convergencia fenomenológica de instancias y subtipos en un contexto común"
        ],
        correcta: "Una síntesis hegeliana de formas y funciones que permite la flexibilidad ontológica"
    },
    // Pregunta 4
    {
        pregunta: "Desde una perspectiva fenomenológica, ¿cómo se puede interpretar la 'inyección de dependencias'?",
        respuestas: [
            "Una relación de intencionalidad entre los objetos y sus contextos de uso",
            "Una externalización de las responsabilidades ontológicas de una clase",
            "Una deconstrucción de las dependencias explícitas en favor de una estructura implícita",
            "Una dialéctica entre la autonomía del objeto y su integración sistémica"
        ],
        correcta: "Una externalización de las responsabilidades ontológicas de una clase"
    },
    // Pregunta 5
    {
        pregunta: "En la ética del desarrollo de software, ¿qué implica el principio de 'responsabilidad única'?",
        respuestas: [
            "La imitación de la virtud aristotélica en la especialización funcional",
            "La fragmentación del ser en unidades de propósito único",
            "La búsqueda kantiana de la universalidad en la simplicidad del código",
            "Una adherencia estoica a la pureza de las funciones unitarias"
        ],
        correcta: "La fragmentación del ser en unidades de propósito único"
    },
    // Pregunta 6
    {
        pregunta: "¿Cómo se puede entender el 'acoplamiento' desde una perspectiva estructuralista?",
        respuestas: [
            "Una relación sincrónica de dependencia entre módulos de software",
            "La interconexión simbólica de componentes en una red de significados",
            "Una manifestación de las estructuras profundas en la superficie del código",
            "La influencia mutua de las entidades en un marco de referencia compartido"
        ],
        correcta: "Una relación sincrónica de dependencia entre módulos de software"
    },
    // Pregunta 7
    {
        pregunta: "En términos de hermenéutica del código, ¿qué representa el 'refactorización'?",
        respuestas: [
            "Una reinterpretación del texto del código en busca de una mayor claridad",
            "La reescritura del software como un acto de interpretación y adaptación",
            "Una revisión crítica de las estructuras existentes para mejorar su legibilidad",
            "Un proceso de reconstrucción semántica de las funciones y procedimientos"
        ],
        correcta: "Una reinterpretación del texto del código en busca de una mayor claridad"
    },
    // Pregunta 8
    {
        pregunta: "Desde la perspectiva del realismo modal, ¿cómo se puede entender la 'virtualización' en el contexto del software?",
        respuestas: [
            "La creación de mundos posibles en los cuales los sistemas operan como entidades autónomas",
            "Una expansión del espacio ontológico para incluir representaciones abstractas",
            "La simulación de entornos computacionales en la búsqueda de la máxima eficiencia",
            "Una manifestación de las múltiples realidades coexistentes en el espacio virtual"
        ],
        correcta: "La creación de mundos posibles en los cuales los sistemas operan como entidades autónomas"
    },
    // Pregunta 9
    {
        pregunta: "En la filosofía del lenguaje de programación, ¿qué representa el concepto de 'tipado estático'?",
        respuestas: [
            "La imposición de una estructura rígida sobre la fluidez del pensamiento computacional",
            "Una garantía epistemológica de la coherencia y consistencia de los datos",
            "Un compromiso ontológico con la naturaleza inmutable de los tipos de datos",
            "Una restricción metafísica que asegura la verdad del código en tiempo de compilación"
        ],
        correcta: "Una garantía epistemológica de la coherencia y consistencia de los datos"
    },
    // Pregunta 10
    {
        pregunta: "Desde una perspectiva existencialista, ¿cómo se puede interpretar el 'desacoplamiento' en el diseño de software?",
        respuestas: [
            "La búsqueda de la autenticidad del objeto en su independencia funcional",
            "Una negación de la esencia en favor de la existencia aislada del componente",
            "Un acto de liberación del objeto de las ataduras de sus dependencias",
            "Una afirmación de la libertad ontológica de cada módulo en el sistema"
        ],
        correcta: "Un acto de liberación del objeto de las ataduras de sus dependencias"
    }
];

// Selecciona 10 preguntas al azar de la lista de preguntas
function seleccionarPreguntas() {
    const preguntasShuffled = preguntas.sort(() => 0.5 - Math.random());
    preguntasSeleccionadas = preguntasShuffled.slice(0, 10);
}

const preguntasRealizadas = new Set();

function cargarPregunta() {
    // Verificar si se han realizado todas las preguntas seleccionadas
    if (preguntasRealizadas.size >= preguntasSeleccionadas.length) {
        _result.innerHTML = "<p>¡Se han realizado todas las preguntas disponibles!</p>";
        _playAgainBtn.classList.remove('d-none');
        _checkBtn.classList.add('d-none');
        return;
    }

    // Seleccionar una nueva pregunta al azar que no haya sido realizada
    let preguntaActual;
    do {
        preguntaActual = preguntasSeleccionadas[Math.floor(Math.random() * preguntasSeleccionadas.length)];
    } while (preguntasRealizadas.has(preguntaActual.pregunta));

    // Agregar la pregunta seleccionada al conjunto de preguntas realizadas
    preguntasRealizadas.add(preguntaActual.pregunta);

    // Mostrar la pregunta y las opciones de respuesta
    _question.innerHTML = preguntaActual.pregunta;
    const opcionesReordenadas = reordenarOpciones(preguntaActual.respuestas);
    _options.innerHTML = opcionesReordenadas.map((respuesta, index) => `<li data-index="${index + 1}">${index + 1}. <span>${respuesta}</span></li>`).join('');
    correctAnswer = preguntaActual.correcta;

    // Permitir la selección de opciones
    seleccionarOpcion();
}

function reordenarOpciones(opciones) {
    const opcionesCopia = [...opciones];
    for (let i = opcionesCopia.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [opcionesCopia[i], opcionesCopia[j]] = [opcionesCopia[j], opcionesCopia[i]];
    }
    return opcionesCopia;
}

function listenersEventos() {
    _checkBtn.addEventListener('click', comprobarRespuesta);
    _playAgainBtn.addEventListener('click', reiniciarJuego);
    document.addEventListener('keydown', manejarTeclado);
}

document.addEventListener('DOMContentLoaded', () => {
    inicializarJuego();
});

function inicializarJuego() {
    seleccionarPreguntas();
    cargarPregunta();
    listenersEventos();
    actualizarUI();
}

function actualizarUI() {
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

function seleccionarOpcion() {
    _options.querySelectorAll('li').forEach(opcion => {
        opcion.addEventListener('click', () => {
            const opcionActiva = _options.querySelector('.selected');
            if (opcionActiva) {
                opcionActiva.classList.remove('selected');
            }
            opcion.classList.add('selected');
        });
    });
}

function manejarTeclado(e) {
    if (e.key >= '1' && e.key <= '4') {
        const opcion = _options.querySelector(`li[data-index="${e.key}"]`);
        if (opcion) {
            const opcionActiva = _options.querySelector('.selected');
            if (opcionActiva) {
                opcionActiva.classList.remove('selected');
            }
            opcion.classList.add('selected');
        }
    } else if (e.key === 'Enter') {
        comprobarRespuesta();
    }
}

function comprobarRespuesta() {
    if (_checkBtn.disabled) return;
    _checkBtn.disabled = true;
    const opcionSeleccionada = _options.querySelector('.selected');
    if (opcionSeleccionada) {
        const respuestaSeleccionada = opcionSeleccionada.querySelector('span').textContent;
        respuestasUsuario.push({
            pregunta: _question.textContent,
            respuesta: respuestaSeleccionada,
            correcta: respuestaSeleccionada === correctAnswer,
            correctaText: correctAnswer
        });
        if (respuestaSeleccionada === correctAnswer) {
            correctScore++;
            successSound.play();
            _result.innerHTML = `<p><i class="fas fa-check"></i>¡Respuesta Correcta!</p>`;
        } else {
            errorSound.play();
            _result.innerHTML = `<p><i class="fas fa-times"></i>¡Respuesta Incorrecta!</p> <small><b>Respuesta Correcta: </b>${correctAnswer}</small>`;
            // Resaltar la opción correcta
            _options.querySelectorAll('li').forEach(opcion => {
                if (opcion.querySelector('span').textContent === correctAnswer) {
                    opcion.classList.add('correct');
                }
            });
        }
        actualizarConteo();
    } else {
        _result.innerHTML = `<p><i class="fas fa-question"></i>¡Por favor selecciona una opción!</p>`;
        _checkBtn.disabled = false;
    }
}

function actualizarConteo() {
    askedCount++;
    setConteo();
    if (askedCount === totalQuestion || preguntasRealizadas.size >= preguntasSeleccionadas.length) {
        setTimeout(() => {
            _result.innerHTML += `<p>Tu puntuación es ${correctScore} de ${totalQuestion}.</p>`;
            _playAgainBtn.classList.remove('d-none');
            _checkBtn.classList.add('d-none');
            descargarCSV();
        }, 3000);
    } else {
        setTimeout(() => {
            _checkBtn.disabled = false;
            cargarPregunta();
        }, 1000);
    }
}

function setConteo() {
    _totalQuestion.textContent = totalQuestion;
    _correctScore.textContent = correctScore;
}

function reiniciarJuego() {
    if (_result.textContent.includes("Tu puntuación es")) {
        correctScore = askedCount = 0;
        _playAgainBtn.classList.add('d-none');
        _checkBtn.classList.remove('d-none');
        _checkBtn.disabled = false;
        respuestasUsuario.length = 0;
        preguntasRealizadas.clear();
        seleccionarPreguntas();
        setConteo();
        cargarPregunta();
    }
}

function descargarCSV() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Pregunta,Respuesta Elegida,Respuesta Correcta\n";
    respuestasUsuario.forEach(({ pregunta, respuesta, correctaText }) => {
        const preguntaSanitizada = pregunta.replace(/,/g, ' ').replace(/(\r\n|\n|\r)/gm, " ");
        const respuestaSanitizada = respuesta.replace(/,/g, ' ').replace(/(\r\n|\n|\r)/gm, " ");
        const correctaSanitizada = correctaText.replace(/,/g, ' ').replace(/(\r\n|\n|\r)/gm, " ");
        csvContent += `${preguntaSanitizada},${respuestaSanitizada},${correctaSanitizada}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "resultados_quiz.csv");
    document.body.appendChild(link); // Required for FF
    link.click();
    document.body.removeChild(link);
}
