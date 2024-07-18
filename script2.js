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
        pregunta: "¿Cuál es el propósito del método 'finalize()' en Java?",
        respuestas: ["Se llama antes de que el recolector de basura destruya el objeto", "Se usa para terminar la ejecución de un programa", "Se utiliza para cerrar archivos", "Ninguna de las anteriores"],
        correcta: "Se llama antes de que el recolector de basura destruya el objeto"
    },
    // Pregunta 2
    {
        pregunta: "¿Qué sucede si el método 'main' está declarado como privado?",
        respuestas: ["El programa compilará pero no se ejecutará", "El programa no compilará", "El programa ejecutará normalmente", "Ninguna de las anteriores"],
        correcta: "El programa compilará pero no se ejecutará"
    },
    // Pregunta 3
    {
        pregunta: "¿Cuál es la diferencia entre '== operator' y 'equals()' en Java?",
        respuestas: ["'==' comprueba la referencia, 'equals()' comprueba la igualdad de contenido", "'==' comprueba la igualdad de contenido, 'equals()' comprueba la referencia", "Ambos comprueban la referencia", "Ambos comprueban la igualdad de contenido"],
        correcta: "'==' comprueba la referencia, 'equals()' comprueba la igualdad de contenido"
    },
    // Pregunta 4
    {
        pregunta: "¿Qué es el 'ClassLoader' en Java?",
        respuestas: ["Es una parte del JVM que carga las clases en memoria", "Es un método para inicializar clases", "Es una herramienta de desarrollo", "Ninguna de las anteriores"],
        correcta: "Es una parte del JVM que carga las clases en memoria"
    },
    // Pregunta 5
    {
        pregunta: "¿Qué es el polimorfismo en Java?",
        respuestas: ["La capacidad de un objeto de tomar muchas formas", "La capacidad de heredar métodos y atributos", "La encapsulación de datos", "Ninguna de las anteriores"],
        correcta: "La capacidad de un objeto de tomar muchas formas"
    },
    // Pregunta 6
    {
        pregunta: "¿Qué es un 'singleton' en Java?",
        respuestas: ["Una clase que solo permite una instancia de sí misma", "Una clase que no puede ser instanciada", "Una clase que puede tener múltiples instancias", "Ninguna de las anteriores"],
        correcta: "Una clase que solo permite una instancia de sí misma"
    },
    // Pregunta 7
    {
        pregunta: "¿Qué es un 'thread' en Java?",
        respuestas: ["Una unidad de ejecución dentro de un proceso", "Un método de clase", "Una variable global", "Ninguna de las anteriores"],
        correcta: "Una unidad de ejecución dentro de un proceso"
    },
    // Pregunta 8
    {
        pregunta: "¿Cuál es la diferencia entre 'ArrayList' y 'LinkedList' en Java?",
        respuestas: ["'ArrayList' usa un array dinámico, 'LinkedList' usa una lista doblemente enlazada", "'ArrayList' usa una lista doblemente enlazada, 'LinkedList' usa un array dinámico", "Ambos usan un array dinámico", "Ambos usan una lista doblemente enlazada"],
        correcta: "'ArrayList' usa un array dinámico, 'LinkedList' usa una lista doblemente enlazada"
    },
    // Pregunta 9
    {
        pregunta: "¿Qué es la serialización en Java?",
        respuestas: ["El proceso de convertir un objeto en un flujo de bytes", "El proceso de ordenar elementos en una lista", "El proceso de convertir una clase en un archivo", "Ninguna de las anteriores"],
        correcta: "El proceso de convertir un objeto en un flujo de bytes"
    },
    // Pregunta 10
    {
        pregunta: "¿Qué es un 'exception' en Java?",
        respuestas: ["Un problema que ocurre durante la ejecución del programa", "Un método para manejar errores", "Una señal para terminar el programa", "Ninguna de las anteriores"],
        correcta: "Un problema que ocurre durante la ejecución del programa"
    },
    // Pregunta 11
    {
        pregunta: "¿Cuál es la diferencia entre 'throw' y 'throws' en Java?",
        respuestas: ["'throw' se usa para lanzar una excepción, 'throws' se usa en la declaración de métodos", "'throws' se usa para lanzar una excepción, 'throw' se usa en la declaración de métodos", "Ambos se usan para lanzar excepciones", "Ambos se usan en la declaración de métodos"],
        correcta: "'throw' se usa para lanzar una excepción, 'throws' se usa en la declaración de métodos"
    },
    // Pregunta 12
    {
        pregunta: "¿Qué es un 'abstract class' en Java?",
        respuestas: ["Una clase que no se puede instanciar y puede tener métodos abstractos", "Una clase que puede ser instanciada", "Una clase sin métodos", "Ninguna de las anteriores"],
        correcta: "Una clase que no se puede instanciar y puede tener métodos abstractos"
    },
    // Pregunta 13
    {
        pregunta: "¿Qué es un 'interface' en Java?",
        respuestas: ["Un contrato que una clase puede implementar", "Una clase que puede ser instanciada", "Una variable global", "Ninguna de las anteriores"],
        correcta: "Un contrato que una clase puede implementar"
    },
    // Pregunta 14
    {
        pregunta: "¿Qué es el 'garbage collection' en Java?",
        respuestas: ["El proceso de liberar memoria no utilizada", "El proceso de asignar memoria", "El proceso de ordenar elementos en una lista", "Ninguna de las anteriores"],
        correcta: "El proceso de liberar memoria no utilizada"
    },
    // Pregunta 15
    {
        pregunta: "¿Qué es un 'constructor' en Java?",
        respuestas: ["Un método especial que se llama al crear un objeto", "Un método para destruir un objeto", "Una variable global", "Ninguna de las anteriores"],
        correcta: "Un método especial que se llama al crear un objeto"
    },
    // Pregunta 16
    {
        pregunta: "¿Qué es una 'inner class' en Java?",
        respuestas: ["Una clase definida dentro de otra clase", "Una clase que no puede ser instanciada", "Una clase que puede ser instanciada", "Ninguna de las anteriores"],
        correcta: "Una clase definida dentro de otra clase"
    },
    // Pregunta 17
    {
        pregunta: "¿Cuál es la diferencia entre 'overloading' y 'overriding' en Java?",
        respuestas: ["'Overloading' es definir métodos con el mismo nombre pero diferentes parámetros, 'overriding' es redefinir un método en una subclase", "'Overriding' es definir métodos con el mismo nombre pero diferentes parámetros, 'overloading' es redefinir un método en una subclase", "Ambos son lo mismo", "Ninguna de las anteriores"],
        correcta: "'Overloading' es definir métodos con el mismo nombre pero diferentes parámetros, 'overriding' es redefinir un método en una subclase"
    },
    // Pregunta 18
    {
        pregunta: "¿Qué es un 'package' en Java?",
        respuestas: ["Un contenedor para agrupar clases relacionadas", "Un método para ordenar elementos", "Una variable global", "Ninguna de las anteriores"],
        correcta: "Un contenedor para agrupar clases relacionadas"
    },
    // Pregunta 19
    {
        pregunta: "¿Cuál es el propósito de la palabra clave 'static' en Java?",
        respuestas: ["Indicar que un método o variable pertenece a la clase, no a instancias específicas", "Indicar que un método o variable pertenece a una instancia específica", "Indicar que una variable es constante", "Ninguna de las anteriores"],
        correcta: "Indicar que un método o variable pertenece a la clase, no a instancias específicas"
    },
    // Pregunta 20
    {
        pregunta: "¿Qué es la 'reflection' en Java?",
        respuestas: ["El proceso de inspeccionar y manipular clases, interfaces y objetos en tiempo de ejecución", "El proceso de ordenar elementos en una lista", "El proceso de liberar memoria", "Ninguna de las anteriores"],
        correcta: "El proceso de inspeccionar y manipular clases, interfaces y objetos en tiempo de ejecución"
    },
    // Pregunta 21
    {
        pregunta: "¿Qué es un 'volatile' en Java?",
        respuestas: ["Una palabra clave que indica que una variable puede ser modificada por diferentes threads", "Una palabra clave que indica que una variable es constante", "Un método para ordenar elementos", "Ninguna de las anteriores"],
        correcta: "Una palabra clave que indica que una variable puede ser modificada por diferentes threads"
    },
    // Pregunta 22
    {
        pregunta: "¿Qué es un 'daemon thread' en Java?",
        respuestas: ["Un thread que se ejecuta en segundo plano y no impide que el programa termine", "Un thread que impide que el programa termine", "Un método para destruir un thread", "Ninguna de las anteriores"],
        correcta: "Un thread que se ejecuta en segundo plano y no impide que el programa termine"
    },
    // Pregunta 23
    {
        pregunta: "¿Cuál es la diferencia entre 'path' y 'classpath' en Java?",
        respuestas: ["'path' es para ejecutar archivos binarios, 'classpath' es para buscar archivos .class y recursos", "'classpath' es para ejecutar archivos binarios, 'path' es para buscar archivos .class y recursos", "Ambos son lo mismo", "Ninguna de las anteriores"],
        correcta: "'path' es para ejecutar archivos binarios, 'classpath' es para buscar archivos .class y recursos"
    },
    // Pregunta 24
    {
        pregunta: "¿Qué es un 'wrapper class' en Java?",
        respuestas: ["Una clase que encapsula tipos de datos primitivos en objetos", "Una clase que encapsula una lista de objetos", "Una clase que encapsula una colección de datos", "Ninguna de las anteriores"],
        correcta: "Una clase que encapsula tipos de datos primitivos en objetos"
    },
    // Pregunta 25
    {
        pregunta: "¿Qué es un 'JIT compiler' en Java?",
        respuestas: ["Un compilador que traduce bytecode a código máquina en tiempo de ejecución", "Un compilador que traduce código fuente a bytecode", "Un compilador que traduce bytecode a código fuente", "Ninguna de las anteriores"],
        correcta: "Un compilador que traduce bytecode a código máquina en tiempo de ejecución"
    },
    // Pregunta 26
    {
        pregunta: "¿Qué es un 'autoboxing' en Java?",
        respuestas: ["El proceso de conversión automática de tipos primitivos a sus correspondientes clases envolventes", "El proceso de conversión automática de clases envolventes a tipos primitivos", "El proceso de conversión automática de tipos de datos", "Ninguna de las anteriores"],
        correcta: "El proceso de conversión automática de tipos primitivos a sus correspondientes clases envolventes"
    },
    // Pregunta 27
    {
        pregunta: "¿Cuál es la diferencia entre 'StringBuilder' y 'StringBuffer' en Java?",
        respuestas: ["'StringBuilder' no es seguro para hilos, 'StringBuffer' es seguro para hilos", "'StringBuilder' es seguro para hilos, 'StringBuffer' no es seguro para hilos", "Ambos son seguros para hilos", "Ambos no son seguros para hilos"],
        correcta: "'StringBuilder' no es seguro para hilos, 'StringBuffer' es seguro para hilos"
    },
    // Pregunta 28
    {
        pregunta: "¿Qué es un 'native method' en Java?",
        respuestas: ["Un método escrito en un lenguaje de programación diferente, como C o C++", "Un método escrito en Java", "Un método que no se puede sobrescribir", "Ninguna de las anteriores"],
        correcta: "Un método escrito en un lenguaje de programación diferente, como C o C++"
    },
    // Pregunta 29
    {
        pregunta: "¿Qué es un 'checked exception' en Java?",
        respuestas: ["Una excepción que debe ser declarada en la firma del método o capturada", "Una excepción que no necesita ser declarada en la firma del método", "Una excepción que no puede ser capturada", "Ninguna de las anteriores"],
        correcta: "Una excepción que debe ser declarada en la firma del método o capturada"
    },
    // Pregunta 30
    {
        pregunta: "¿Qué es un 'functional interface' en Java?",
        respuestas: ["Una interfaz que tiene exactamente un método abstracto", "Una interfaz que tiene múltiples métodos abstractos", "Una interfaz que no tiene métodos abstractos", "Ninguna de las anteriores"],
        correcta: "Una interfaz que tiene exactamente un método abstracto"
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
