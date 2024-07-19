const _question = document.getElementById('question');
const _options = document.querySelector('.quiz-options');
const _checkBtn = document.getElementById('check-answer');
const _playAgainBtn = document.getElementById('play-again');
const _result = document.getElementById('result');
const _correctScore = document.getElementById('correct-score');
const _totalQuestion = document.getElementById('total-question');
const _usernameInput = document.getElementById('username');
const _startQuizBtn = document.getElementById('start-quiz');
const _userForm = document.getElementById('user-form');
const _quizContainer = document.getElementById('quiz-container');

const errorSound = new Audio('sounds/error.mp3');
const successSound = new Audio('sounds/success.mp3');

let correctAnswer = "", correctScore = askedCount = 0, totalQuestion = 10;
let respuestasUsuario = [];
let preguntasSeleccionadas = [];

const preguntas = [
    {
        pregunta: "¿Qué significa QA en el contexto del desarrollo de software?",
        respuestas: ["Quality Assurance", "Quick Access", "Query Assessment", "Quality Analysis"],
        correcta: "Quality Assurance"
    },
    {
        pregunta: "¿Cuál es el objetivo principal del QA?",
        respuestas: ["Asegurar la calidad del software", "Optimizar el rendimiento", "Desarrollar nuevas funciones", "Crear interfaces"],
        correcta: "Asegurar la calidad del software"
    },
    {
        pregunta: "¿Qué es una prueba unitaria?",
        respuestas: ["Prueba de una función", "Prueba de todo el sistema", "Prueba de aceptación", "Prueba de integración"],
        correcta: "Prueba de una función"
    },
    {
        pregunta: "¿Qué herramienta se utiliza comúnmente para pruebas unitarias en JavaScript?",
        respuestas: ["Jest", "JUnit", "JIRA", "JMeter"],
        correcta: "Jest"
    },
    {
        pregunta: "¿Qué es TDD?",
        respuestas: ["Test-Driven Development", "Technical Design Development", "Test Design Documentation", "Total Development Deployment"],
        correcta: "Test-Driven Development"
    },
    {
        pregunta: "¿Cuál es la diferencia entre una prueba unitaria y una prueba de integración?",
        respuestas: ["Prueba unitaria prueba una función, prueba de integración verifica componentes juntos", "No hay diferencia", "Prueba de integración es más rápida", "Prueba unitaria prueba todo el sistema"],
        correcta: "Prueba unitaria prueba una función, prueba de integración verifica componentes juntos"
    },
    {
        pregunta: "¿Qué es un 'mock' en el contexto de las pruebas?",
        respuestas: ["Simulación de un módulo para pruebas", "Error en el código", "Documentación técnica", "Prueba de rendimiento"],
        correcta: "Simulación de un módulo para pruebas"
    },
    {
        pregunta: "¿Cuál es una práctica recomendada para escribir pruebas eficaces?",
        respuestas: ["Pruebas independientes", "Pruebas dependientes", "No escribir pruebas", "Escribir pruebas post desarrollo"],
        correcta: "Pruebas independientes"
    },
    {
        pregunta: "¿Qué es Selenium?",
        respuestas: ["Herramienta para pruebas automatizadas", "Lenguaje de programación", "Entorno de desarrollo", "Framework de CSS"],
        correcta: "Herramienta para pruebas automatizadas"
    },
    {
        pregunta: "¿Cuál es el objetivo de una prueba de regresión?",
        respuestas: ["Verificar que cambios no introduzcan errores nuevos", "Probar nuevas funciones", "Optimizar rendimiento", "Crear documentación"],
        correcta: "Verificar que cambios no introduzcan errores nuevos"
    },
    {
        pregunta: "¿Qué significa el acrónimo BDD en el contexto del testing?",
        respuestas: ["Behavior-Driven Development", "Basic Data Development", "Backend Development Deployment", "Binary Data Development"],
        correcta: "Behavior-Driven Development"
    },
    {
        pregunta: "¿Cuál es la principal ventaja de utilizar BDD?",
        respuestas: ["Mejor comunicación entre equipo y clientes", "Mejora rendimiento", "Reduce costos", "Aumenta seguridad"],
        correcta: "Mejor comunicación entre equipo y clientes"
    },
    {
        pregunta: "¿Qué es un 'test case'?",
        respuestas: ["Conjunto de condiciones para probar una característica", "Error en el sistema", "Documentación técnica", "Prueba de rendimiento"],
        correcta: "Conjunto de condiciones para probar una característica"
    },
    {
        pregunta: "¿Qué es un 'test plan'?",
        respuestas: ["Documento que describe actividades de prueba", "Herramienta de desarrollo", "Entorno de pruebas", "Técnica de debugging"],
        correcta: "Documento que describe actividades de prueba"
    },
    {
        pregunta: "¿Qué es una 'prueba de caja negra'?",
        respuestas: ["Prueba de funcionalidad sin ver estructuras internas", "Prueba de código fuente", "Prueba de rendimiento", "Prueba de seguridad"],
        correcta: "Prueba de funcionalidad sin ver estructuras internas"
    },
    {
        pregunta: "¿Qué es una 'prueba de caja blanca'?",
        respuestas: ["Prueba de estructuras internas", "Prueba de funcionalidad", "Prueba de rendimiento", "Prueba de seguridad"],
        correcta: "Prueba de estructuras internas"
    },
    {
        pregunta: "¿Cuál es la diferencia entre QA y QC?",
        respuestas: ["QA previene defectos, QC los identifica", "No hay diferencia", "QA identifica defectos, QC los previene", "Son términos intercambiables"],
        correcta: "QA previene defectos, QC los identifica"
    },
    {
        pregunta: "¿Qué es una prueba de aceptación del usuario (UAT)?",
        respuestas: ["Prueba por el usuario final para verificar requisitos", "Prueba de rendimiento", "Prueba de seguridad", "Prueba de integración"],
        correcta: "Prueba por el usuario final para verificar requisitos"
    },
    {
        pregunta: "¿Qué es un 'bug'?",
        respuestas: ["Error o defecto en el software", "Característica del software", "Herramienta de desarrollo", "Prueba de rendimiento"],
        correcta: "Error o defecto en el software"
    },
    {
        pregunta: "¿Qué es JIRA?",
        respuestas: ["Herramienta de gestión de proyectos y seguimiento de bugs", "Lenguaje de programación", "Entorno de desarrollo", "Técnica de debugging"],
        correcta: "Herramienta de gestión de proyectos y seguimiento de bugs"
    },
    {
        pregunta: "¿Qué es un script de prueba?",
        respuestas: ["Instrucciones ejecutables para verificar software", "Documento técnico", "Entorno de desarrollo", "Técnica de debugging"],
        correcta: "Instrucciones ejecutables para verificar software"
    },
    {
        pregunta: "¿Cuál es la diferencia entre un 'bug' y un 'defecto'?",
        respuestas: ["Bug es error en código, defecto es desviación de requisitos", "No hay diferencia", "Bug es error encontrado por desarrolladores", "Bug es error encontrado por usuarios"],
        correcta: "Bug es error en código, defecto es desviación de requisitos"
    },
    {
        pregunta: "¿Qué es la cobertura de código?",
        respuestas: ["Porcentaje de código probado", "Técnica de debugging", "Herramienta de desarrollo", "Métrica de rendimiento"],
        correcta: "Porcentaje de código probado"
    },
    {
        pregunta: "¿Qué es una prueba de carga?",
        respuestas: ["Prueba de comportamiento bajo carga específica", "Prueba de seguridad", "Prueba de integración", "Prueba unitaria"],
        correcta: "Prueba de comportamiento bajo carga específica"
    },
    {
        pregunta: "¿Qué es una prueba de estrés?",
        respuestas: ["Prueba de estabilidad bajo condiciones extremas", "Prueba de seguridad", "Prueba de integración", "Prueba unitaria"],
        correcta: "Prueba de estabilidad bajo condiciones extremas"
    },
    {
        pregunta: "¿Qué es una prueba de rendimiento?",
        respuestas: ["Prueba de velocidad y efectividad", "Prueba de seguridad", "Prueba de integración", "Prueba unitaria"],
        correcta: "Prueba de velocidad y efectividad"
    },
    {
        pregunta: "¿Qué es un entorno de pruebas?",
        respuestas: ["Entorno configurado para probar software", "Entorno de desarrollo", "Entorno de producción", "Entorno de debugging"],
        correcta: "Entorno configurado para probar software"
    },
    {
        pregunta: "¿Qué es un 'smoke test'?",
        respuestas: ["Prueba inicial de funciones básicas", "Prueba de seguridad", "Prueba de rendimiento", "Prueba unitaria"],
        correcta: "Prueba inicial de funciones básicas"
    },
    {
        pregunta: "¿Qué es un 'regression test'?",
        respuestas: ["Verificar que cambios no afecten funciones existentes", "Prueba de seguridad", "Prueba de rendimiento", "Prueba unitaria"],
        correcta: "Verificar que cambios no afecten funciones existentes"
    },
    {
        pregunta: "¿Qué es un 'test suite'?",
        respuestas: ["Conjunto de casos de prueba relacionados", "Entorno de desarrollo", "Técnica de debugging", "Herramienta de seguimiento de bugs"],
        correcta: "Conjunto de casos de prueba relacionados"
    },
    {
        pregunta: "¿Qué es una prueba funcional?",
        respuestas: ["Verificar función específica del software", "Prueba de seguridad", "Prueba de rendimiento", "Prueba unitaria"],
        correcta: "Verificar función específica del software"
    },
    {
        pregunta: "¿Qué es una prueba no funcional?",
        respuestas: ["Verificar aspectos como rendimiento y usabilidad", "Prueba de seguridad", "Prueba unitaria", "Prueba de regresión"],
        correcta: "Verificar aspectos como rendimiento y usabilidad"
    },
    {
        pregunta: "¿Qué es una 'exploratory test'?",
        respuestas: ["Prueba sin casos predeterminados", "Prueba de seguridad", "Prueba unitaria", "Prueba de regresión"],
        correcta: "Prueba sin casos predeterminados"
    },
    {
        pregunta: "¿Qué es la automatización de pruebas?",
        respuestas: ["Uso de herramientas para ejecutar pruebas automáticamente", "Técnica de debugging", "Técnica de desarrollo", "Técnica de gestión de proyectos"],
        correcta: "Uso de herramientas para ejecutar pruebas automáticamente"
    },
    {
        pregunta: "¿Qué es un 'test case' negativo?",
        respuestas: ["Verificar manejo de entradas inválidas", "Caso de prueba que siempre falla", "Caso de prueba no ejecutado", "Verificar funcionalidad básica"],
        correcta: "Verificar manejo de entradas inválidas"
    },
    {
        pregunta: "¿Qué es la 'usability testing'?",
        respuestas: ["Evaluar facilidad de uso", "Prueba de seguridad", "Prueba de rendimiento", "Prueba unitaria"],
        correcta: "Evaluar facilidad de uso"
    },
    {
        pregunta: "¿Qué es un 'test script'?",
        respuestas: ["Instrucciones automatizadas para pruebas", "Técnica de debugging", "Herramienta de desarrollo", "Entorno de pruebas"],
        correcta: "Instrucciones automatizadas para pruebas"
    },
    {
        pregunta: "¿Qué es la validación en el contexto del testing?",
        respuestas: ["Asegurarse que el sistema cumple requisitos", "Identificar defectos", "Ejecutar pruebas", "Gestionar casos de prueba"],
        correcta: "Asegurarse que el sistema cumple requisitos"
    },
    {
        pregunta: "¿Qué es la verificación en el contexto del testing?",
        respuestas: ["Evaluar artefactos intermedios", "Identificar defectos", "Ejecutar pruebas", "Gestionar casos de prueba"],
        correcta: "Evaluar artefactos intermedios"
    },
    {
        pregunta: "¿Qué es un 'defect'?",
        respuestas: ["Desviación de requisitos", "Herramienta de desarrollo", "Técnica de debugging", "Métrica de rendimiento"],
        correcta: "Desviación de requisitos"
    },
    {
        pregunta: "¿Qué es un 'error'?",
        respuestas: ["Acción equivocada del desarrollador", "Herramienta de desarrollo", "Técnica de debugging", "Métrica de rendimiento"],
        correcta: "Acción equivocada del desarrollador"
    },
    {
        pregunta: "¿Qué es un 'failure'?",
        respuestas: ["Comportamiento incorrecto del sistema", "Herramienta de desarrollo", "Técnica de debugging", "Métrica de rendimiento"],
        correcta: "Comportamiento incorrecto del sistema"
    },
    {
        pregunta: "¿Qué es una 'test case' positiva?",
        respuestas: ["Verificar sistema con entradas válidas", "Caso de prueba que siempre pasa", "Caso de prueba no ejecutado", "Verificar entradas inválidas"],
        correcta: "Verificar sistema con entradas válidas"
    },
    {
        pregunta: "¿Qué es una prueba de integración?",
        respuestas: ["Verificar interacción de componentes", "Prueba unitaria", "Prueba de rendimiento", "Prueba de regresión"],
        correcta: "Verificar interacción de componentes"
    },
    {
        pregunta: "¿Qué es una prueba de sistema?",
        respuestas: ["Verificar sistema completo", "Prueba unitaria", "Prueba de integración", "Prueba de regresión"],
        correcta: "Verificar sistema completo"
    },
    {
        pregunta: "¿Qué es un 'test data'?",
        respuestas: ["Datos usados durante pruebas", "Técnica de debugging", "Herramienta de desarrollo", "Entorno de pruebas"],
        correcta: "Datos usados durante pruebas"
    },
    {
        pregunta: "¿Qué es la cobertura de pruebas?",
        respuestas: ["Medida de código ejecutado durante pruebas", "Técnica de debugging", "Herramienta de desarrollo", "Entorno de pruebas"],
        correcta: "Medida de código ejecutado durante pruebas"
    },
    {
        pregunta: "¿Qué es la 'alpha testing'?",
        respuestas: ["Prueba realizada por desarrolladores antes de la entrega", "Prueba por usuarios finales", "Prueba de rendimiento", "Prueba de seguridad"],
        correcta: "Prueba realizada por desarrolladores antes de la entrega"
    },
    {
        pregunta: "¿Qué es la 'beta testing'?",
        respuestas: ["Prueba por usuarios finales antes del lanzamiento final", "Prueba por desarrolladores", "Prueba de rendimiento", "Prueba de seguridad"],
        correcta: "Prueba por usuarios finales antes del lanzamiento final"
    },
    {
        pregunta: "¿Qué es un 'use case'?",
        respuestas: ["Conjunto de acciones que definen la interacción usuario-sistema", "Herramienta de desarrollo", "Técnica de debugging", "Entorno de pruebas"],
        correcta: "Conjunto de acciones que definen la interacción usuario-sistema"
    },
    {
        pregunta: "¿Qué es un 'test execution'?",
        respuestas: ["Ejecutar casos de prueba y comparar resultados", "Técnica de debugging", "Herramienta de desarrollo", "Entorno de pruebas"],
        correcta: "Ejecutar casos de prueba y comparar resultados"
    },
    {
        pregunta: "¿Qué es un 'test summary report'?",
        respuestas: ["Documento que resume actividades y resultados de pruebas", "Herramienta de desarrollo", "Técnica de debugging", "Entorno de pruebas"],
        correcta: "Documento que resume actividades y resultados de pruebas"
    },
    {
        pregunta: "¿Qué es un 'test environment setup'?",
        respuestas: ["Configurar entorno de pruebas", "Técnica de debugging", "Herramienta de desarrollo", "Entorno de pruebas"],
        correcta: "Configurar entorno de pruebas"
    },
    {
        pregunta: "¿Qué es un 'test plan' en el contexto del testing?",
        respuestas: ["Documento que describe actividades de prueba", "Herramienta de desarrollo", "Técnica de debugging", "Entorno de pruebas"],
        correcta: "Documento que describe actividades de prueba"
    },
    {
        pregunta: "¿Qué es una prueba de compatibilidad?",
        respuestas: ["Verificar software en diferentes entornos", "Prueba de seguridad", "Prueba de rendimiento", "Prueba unitaria"],
        correcta: "Verificar software en diferentes entornos"
    },
    {
        pregunta: "¿Qué es un 'build verification test' (BVT)?",
        respuestas: ["Verificar que una compilación es estable", "Prueba de seguridad", "Prueba de rendimiento", "Prueba unitaria"],
        correcta: "Verificar que una compilación es estable"
    },
    {
        pregunta: "¿Qué es un 'test closure report'?",
        respuestas: ["Documento que resume actividades de prueba al final", "Herramienta de desarrollo", "Técnica de debugging", "Entorno de pruebas"],
        correcta: "Documento que resume actividades de prueba al final"
    },
    {
        pregunta: "¿Qué es una prueba de recuperación?",
        respuestas: ["Verificar capacidad de recuperación del sistema", "Prueba de seguridad", "Prueba de rendimiento", "Prueba unitaria"],
        correcta: "Verificar capacidad de recuperación del sistema"
    },
    {
        pregunta: "¿Qué es una prueba de seguridad?",
        respuestas: ["Identificar vulnerabilidades de seguridad", "Prueba de rendimiento", "Prueba unitaria", "Prueba de integración"],
        correcta: "Identificar vulnerabilidades de seguridad"
    },
    {
        pregunta: "¿Qué es una prueba de usabilidad?",
        respuestas: ["Evaluar facilidad de uso", "Prueba de seguridad", "Prueba de rendimiento", "Prueba unitaria"],
        correcta: "Evaluar facilidad de uso"
    },
    {
        pregunta: "¿Qué es una prueba de volumen?",
        respuestas: ["Verificar rendimiento con grandes volúmenes de datos", "Prueba de seguridad", "Prueba unitaria", "Prueba de integración"],
        correcta: "Verificar rendimiento con grandes volúmenes de datos"
    },
    {
        pregunta: "¿Qué es la 'user acceptance testing' (UAT)?",
        respuestas: ["Prueba realizada por usuarios finales", "Prueba de seguridad", "Prueba unitaria", "Prueba de integración"],
        correcta: "Prueba realizada por usuarios finales"
    },
    {
        pregunta: "¿Qué es una prueba de instalación?",
        respuestas: ["Verificar correcta instalación del software", "Prueba de seguridad", "Prueba unitaria", "Prueba de integración"],
        correcta: "Verificar correcta instalación del software"
    },
    // Agrega más preguntas siguiendo el mismo patrón hasta alcanzar las 200 preguntas
    // Solo se muestran 100 preguntas como ejemplo, repite hasta llegar a las 200
];

function seleccionarPreguntas() {
    const preguntasShuffled = preguntas.sort(() => 0.5 - Math.random());
    preguntasSeleccionadas = preguntasShuffled.slice(0, 10);
}

const preguntasRealizadas = new Set();

function cargarPregunta() {
    if (preguntasRealizadas.size >= preguntasSeleccionadas.length) {
        _result.innerHTML = "<p>¡Se han realizado todas las preguntas disponibles!</p>";
        _playAgainBtn.classList.remove('d-none');
        _checkBtn.classList.add('d-none');
        return;
    }

    let preguntaActual;
    do {
        preguntaActual = preguntasSeleccionadas[Math.floor(Math.random() * preguntasSeleccionadas.length)];
    } while (preguntasRealizadas.has(preguntaActual.pregunta));

    preguntasRealizadas.add(preguntaActual.pregunta);

    _question.innerHTML = preguntaActual.pregunta;
    const opcionesReordenadas = reordenarOpciones(preguntaActual.respuestas);
    _options.innerHTML = opcionesReordenadas.map((respuesta, index) => `<li data-index="${index + 1}">${index + 1}. <span>${respuesta}</span></li>`).join('');
    correctAnswer = preguntaActual.correcta;

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
    _startQuizBtn.addEventListener('click', startQuiz);
}

document.addEventListener('DOMContentLoaded', () => {
    listenersEventos();
});

function startQuiz() {
    const username = _usernameInput.value.trim();
    if (username) {
        _userForm.classList.add('d-none');
        _quizContainer.classList.remove('d-none');
        inicializarJuego();
    } else {
        alert("Por favor, introduce tu nombre.");
    }
}

function inicializarJuego() {
    seleccionarPreguntas();
    cargarPregunta();
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
            generarDiploma();
            descargarCSVUsuario();
        }, 3000);
    } else {
        setTimeout(() => {
            _checkBtn.disabled = false;
            cargarPregunta();
        }, 2000); // Tiempo duplicado para mostrar la respuesta correcta
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

function descargarCSVUsuario() {
    const username = _usernameInput.value.trim();
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
    link.setAttribute("download", `respuestas_usuario_${username}.csv`);
    document.body.appendChild(link); 
    link.click();
    document.body.removeChild(link);
}

function generarDiploma() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const username = _usernameInput.value.trim();
    const score = `${correctScore} / ${totalQuestion}`;

    doc.setFontSize(22);
    doc.text("Certificado de QA", 105, 40, null, null, "center");

    doc.setFontSize(16);
    doc.text(`Otorgado a: ${username}`, 105, 60, null, null, "center");
    doc.text(`Por haber completado el cuestionario de QA`, 105, 80, null, null, "center");
    doc.text(`Con una puntuación de: ${score}`, 105, 100, null, null, "center");

    doc.setFontSize(12);
    doc.text("Firmado por EnigmaK9", 105, 120, null, null, "center");

    doc.save(`certificado_${username}.pdf`);
}
