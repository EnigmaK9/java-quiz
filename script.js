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
    // Pregunta 1
    {
        pregunta: "¿Qué componentes necesitas instalar para ejecutar un programa Java sin desarrollarlo?",
        respuestas: ["JRE", "JDK", "JVM", "Ninguna"],
        correcta: "JRE"
    },
    // Pregunta 2
    {
        pregunta: "¿Cuál es el algoritmo de ordenación que utiliza recursividad y subarreglos?",
        respuestas: ["QuickSort", "MergeSort", "HeapSort", "BubbleSort"],
        correcta: "QuickSort"
    },
    // Pregunta 3
    {
        pregunta: "La _____________ implica enfocarse en las características importantes y filtrar las no esenciales.",
        respuestas: ["Abstracción", "Encapsulación", "Herencia", "Polimorfismo"],
        correcta: "Abstracción"
    },
    // Pregunta 4
    {
        pregunta: "Calcula el resultado: int arboles = 20; int refrescos = 46; int resultado = refrescos / árboles;",
        respuestas: ["2", "2.3", "2.5", "3"],
        correcta: "2"
    },
    // Pregunta 5
    {
        pregunta: "Indica el método en Java para obtener la suma de 1000:\n public static void main(String[] args) { String doscientos = '200'; System.out.println(método + 800); }",
        respuestas: ["Integer.parseInt(doscientos);", "valueOf", "toString", "decode"],
        correcta: "Integer.parseInt(doscientos);"
    },
    // Pregunta 6
    {
        pregunta: "¿Cuál es el algoritmo que pasa elementos de una subLista desordenada a una subLista ordenada?",
        respuestas: ["Insertion Sort", "Selection Sort", "Merge Sort", "Heap Sort"],
        correcta: "Insertion Sort"
    },
    // Pregunta 7
    {
        pregunta: "¿Qué empresa lanzó Java como lenguaje de programación?",
        respuestas: ["Sun Microsystems", "Oracle", "Microsoft", "Google"],
        correcta: "Sun Microsystems"
    },
    // Pregunta 8
    {
        pregunta: "¿En qué año se lanzó Java?",
        respuestas: ["1995", "1992", "1998", "2000"],
        correcta: "1995"
    },
    // Pregunta 9
    {
        pregunta: "¿Qué componentes tiene la plataforma Java?",
        respuestas: ["JDK, JRE y JVM", "JDK y JRE", "JRE y JVM", "Solo JDK"],
        correcta: "JDK, JRE y JVM"
    },
    // Pregunta 10
    {
        pregunta: "¿Se puede instalar más de una versión de JDK en la misma computadora?",
        respuestas: ["Sí", "No", "Depende del sistema operativo", "Solo en versiones antiguas de Windows"],
        correcta: "Sí"
    },
    // Pregunta 11
    {
        pregunta: "¿Qué comando se necesita para verificar si se tiene Java instalado en una computadora?",
        respuestas: ["java -version", "javac -version", "java --check", "javac --check"],
        correcta: "java -version"
    },
    // Pregunta 12
    {
        pregunta: "¿Cuál es el algoritmo de ordenación que consiste en una iteración externa, una interna y compara elementos adyacentes para ser intercambiados de forma que queden de forma ascendente?",
        respuestas: ["Bubble Sort", "Quick Sort", "Selection Sort", "Merge Sort"],
        correcta: "Bubble Sort"
    },
    // Pregunta 13
    {
        pregunta: "¿Cuál sería el resultado de la siguiente operación?\n int comensales = 10;\n int platillos = 36;\n int resultado;\n resultado = platillos / comensales;",
        respuestas: ["3", "3.6", "4", "2.5"],
        correcta: "3"
    },
    // Pregunta 14
    {
        pregunta: "¿Cuáles son los tipos de operadores en Java?",
        respuestas: ["Aritméticos, Relacionales, Lógicos, Asignación, Unarios, Bit a Bit", "Aritméticos, Relacionales, Lógicos, Asignación, Comparación, Bit a Bit", "Aritméticos, Lógicos, Asignación, Comparación, Bit a Bit", "Aritméticos, Relacionales, Lógicos, Asignación, Unarios, Condicionales"],
        correcta: "Aritméticos, Relacionales, Lógicos, Asignación, Unarios, Bit a Bit"
    },
    // Pregunta 15
    {
        pregunta: "¿Cuál es el método que genera como valor de salida todas las letras mayúsculas de un texto almacenado en una variable?",
        respuestas: ["toUpperCase()", "toLowerCase()", "capitalize()", "toUpperCaseAll()"],
        correcta: "toUpperCase()"
    },
    // Pregunta 16
    {
        pregunta: "Si se tiene un ahorro y agregas 30 pesos en esta ocasión, ¿cómo asignarías la operación que lo incrementa?",
        respuestas: ["ahorro += 30", "ahorro =+ 30", "ahorro = ahorro + 30", "ahorro ++ 30"],
        correcta: "ahorro += 30"
    },
    // Pregunta 17
    {
        pregunta: "¿Cuál es la palabra que se usa para referirse al objeto actual en el flujo del código?",
        respuestas: ["this", "super", "self", "current"],
        correcta: "this"
    },
    // Pregunta 18
    {
        pregunta: "¿A qué se le llama encapsulamiento?",
        respuestas: ["Restricción del acceso directo a los componentes de un objeto", "La capacidad de heredar métodos y atributos", "La capacidad de un objeto de tomar muchas formas", "La creación de objetos a partir de una clase"],
        correcta: "Restricción del acceso directo a los componentes de un objeto"
    },
    // Pregunta 19
    {
        pregunta: "De la siguiente cola creada, ¿cuál es el resultado de implementar el método peek()?\n animales.offer('mamíferos');\n animales.offer('aves');\n animales.offer('reptiles');\n System.out.println(animales.peek());",
        respuestas: ["mamíferos", "aves", "reptiles", "Ninguno"],
        correcta: "mamíferos"
    },
    // Pregunta 20
    {
        pregunta: "De la siguiente pila creada, ¿cuál es el resultado de implementar el método peek()?\n animales.push('mamíferos');\n animales.push('aves');\n animales.push('reptiles');\n System.out.println(animales.peek());",
        respuestas: ["reptiles", "mamíferos", "aves", "Ninguno"],
        correcta: "reptiles"
    },
    // Pregunta 21
    {
        pregunta: "Explica brevemente cuál es la diferencia de los comandos `print()` y `println()`.",
        respuestas: ["`print()` imprime el texto sin saltar a la siguiente línea. `println()` imprime el texto y luego salta a la siguiente línea", "`print()` imprime el texto y salta a la siguiente línea. `println()` imprime el texto sin saltar a la siguiente línea", "`print()` imprime variables, `println()` imprime texto", "Ninguna de las anteriores"],
        correcta: "`print()` imprime el texto sin saltar a la siguiente línea. `println()` imprime el texto y luego salta a la siguiente línea"
    },
    // Pregunta 22
    {
        pregunta: "Indica cuál es la diferencia entre pilas (stack) y colas (queue).",
        respuestas: ["En una pila (stack), el último elemento en entrar es el primero en salir (LIFO). En una cola (queue), el primer elemento en entrar es el primero en salir (FIFO)", "En una pila (stack), el primer elemento en entrar es el primero en salir (FIFO). En una cola (queue), el último elemento en entrar es el primero en salir (LIFO)", "No hay diferencia", "Ninguna de las anteriores"],
        correcta: "En una pila (stack), el último elemento en entrar es el primero en salir (LIFO). En una cola (queue), el primer elemento en entrar es el primero en salir (FIFO)"
    },
    // Pregunta 23
    {
        pregunta: "¿Qué tipos de datos se necesitan para poder guardar números con decimales?",
        respuestas: ["float y double", "int y long", "byte y short", "char y boolean"],
        correcta: "float y double"
    },
    // Pregunta 24
    {
        pregunta: "Se presentan los posibles premios de un padre a su hijo en base a sus notas escolares. Indica el/los que le corresponde:\n int notaEstudiante = 95;\n if (notaEstudiante < 50 ) {\n System.out.println('Nada');\n } elseif (notaEstudiante > 95) {\n System.out.println('Laptop');\n } elseif (notaEstudiante <= 95) {\n System.out.println('Celular');\n } elseif (notaEstudiante == 95) {\n System.out.println('Drone');\n }",
        respuestas: ["Celular", "Laptop", "Nada", "Drone"],
        correcta: "Celular"
    },
    // Pregunta 25
    {
        pregunta: "¿Cuáles son las variables de texto?",
        respuestas: ["Variables de tipo `String`", "Variables de tipo `char`", "Variables de tipo `int`", "Variables de tipo `float`"],
        correcta: "Variables de tipo `String`"
    },
    // Pregunta 26
    {
        pregunta: "Se llama así cuando un método de subclase anula un método de superclase.",
        respuestas: ["Sobrescritura de método (`method overriding`)", "Sobrecarga de métodos (`method overloading`)", "Herencia", "Polimorfismo"],
        correcta: "Sobrescritura de método (`method overriding`)"
    },
    // Pregunta 27
    {
        pregunta: "¿Una subclase puede acceder a atributos y métodos de la superclase de la que hereda?",
        respuestas: ["Sí", "No", "Solo si son públicos", "Solo si son privados"],
        correcta: "Sí"
    },
    // Pregunta 28
    {
        pregunta: "¿Cuál es la palabra clave para realizar herencias en Java?",
        respuestas: ["extends", "inherits", "implements", "inheritsFrom"],
        correcta: "extends"
    },
    // Pregunta 29
    {
        pregunta: "¿Cuál es la herramienta usada para repetir un mismo bloque de código en Java?",
        respuestas: ["Los bucles (`for`, `while`, `do-while`)", "Las funciones", "Los métodos", "Las clases"],
        correcta: "Los bucles (`for`, `while`, `do-while`)"
    },
    // Pregunta 30
    {
        pregunta: "¿Cuál es el valor del primer índice en los arreglos unidimensionales?",
        respuestas: ["0", "1", "Depende del tipo de dato", "Depende del sistema operativo"],
        correcta: "0"
    },
    // Pregunta 31
    {
        pregunta: "Antes de crear un objeto se debe definir:",
        respuestas: ["La clase a la que pertenecerá el objeto", "El constructor", "Los métodos", "Los atributos"],
        correcta: "La clase a la que pertenecerá el objeto"
    },
    // Pregunta 32
    {
        pregunta: "¿Qué es un objeto?",
        respuestas: ["Un objeto es una instancia de una clase que encapsula datos y funcionalidades relacionadas", "Un tipo de dato", "Una variable", "Un método"],
        correcta: "Un objeto es una instancia de una clase que encapsula datos y funcionalidades relacionadas"
    },
    // Pregunta 33
    {
        pregunta: "¿Cuáles son los componentes de la plataforma Java?",
        respuestas: ["JDK (Java Development Kit), JRE (Java Runtime Environment), y JVM (Java Virtual Machine)", "JDK y JRE", "JRE y JVM", "Solo JDK"],
        correcta: "JDK (Java Development Kit), JRE (Java Runtime Environment), y JVM (Java Virtual Machine)"
    },
    // Pregunta 34
    {
        pregunta: "¿Qué componentes necesitas instalar si solamente deseas ejecutar un programa Java sin desarrollarlo?",
        respuestas: ["JRE", "JDK", "JVM", "Ninguna"],
        correcta: "JRE"
    },
    // Pregunta 35
    {
        pregunta: "¿Qué es una clase?",
        respuestas: ["Una clase es una plantilla o blueprint que define las variables y los métodos comunes a todos los objetos de un cierto tipo", "Un tipo de dato", "Un objeto", "Un método"],
        correcta: "Una clase es una plantilla o blueprint que define las variables y los métodos comunes a todos los objetos de un cierto tipo"
    },
    // Pregunta 36
    {
        pregunta: "Al proceso de crear objetos a partir de una clase se llama:",
        respuestas: ["Instanciación", "Inicialización", "Herencia", "Sobrescritura"],
        correcta: "Instanciación"
    },
    // Pregunta 37
    {
        pregunta: "¿Cuál es el resultado de la siguiente operación?\n int precioCelular = 12000;\n int precioDiscoDuro = 6500;\n System.out.println(precioCelular != precioDiscoDuro);",
        respuestas: ["true", "false", "12000", "6500"],
        correcta: "true"
    },
    // Pregunta 38
    {
        pregunta: "¿Cuáles son las funcionalidades que se agregan a objetos hijos de clases previamente creadas se logran a través de este mecanismo?",
        respuestas: ["Herencia", "Polimorfismo", "Encapsulamiento", "Abstracción"],
        correcta: "Herencia"
    },
    // Pregunta 39
    {
        pregunta: "¿Cuál es el proceso en el cual se identifican los atributos y métodos que va a tener una clase?",
        respuestas: ["Diseño de clases", "Implementación de clases", "Instanciación", "Encapsulamiento"],
        correcta: "Diseño de clases"
    },
    // Pregunta 40
    {
        pregunta: "¿Cuál es la forma de obtener todos los elementos de un arreglo bidimensional?",
        respuestas: ["Usar bucles anidados:\n for (int i = 0; i < array.length; i++) {\n for (int j = 0; j < array[i].length; j++) {\n System.out.println(array[i][j]);\n }\n }", "Usar un solo bucle", "No es posible", "Ninguna de las anteriores"],
        correcta: "Usar bucles anidados:\n for (int i = 0; i < array.length; i++) {\n for (int j = 0; j < array[i].length; j++) {\n System.out.println(array[i][j]);\n }\n }"
    },
    // Pregunta 41
    {
        pregunta: "¿Cuál es la manera correcta de inicializar un arreglo bidimensional de 4 filas y 6 columnas?",
        respuestas: ["int[][] array = new int[4][6];", "int[][] array = new int[6][4];", "int[] array = new int[4][6];", "int[] array = new int[6][4];"],
        correcta: "int[][] array = new int[4][6];"
    },
    // Pregunta 42
    {
        pregunta: "Si deseas llevar un registro de regalos que has dado a cada amigo que tienes, ¿cuál sería la mejor manera de hacerlo para después acceder a la información?",
        respuestas: ["Crear una matriz bidimensional con arreglos de mis amigos y sus regalos", "Utilizar un `ArrayList`", "Utilizar un `HashSet`", "Utilizar un `LinkedList`"],
        correcta: "Crear una matriz bidimensional con arreglos de mis amigos y sus regalos"
    },
    // Pregunta 43
    {
        pregunta: "¿Es posible instalar más de una versión de JDK en la misma computadora?",
        respuestas: ["Sí", "No", "Depende del sistema operativo", "Solo en versiones antiguas de Windows"],
        correcta: "Sí"
    },
    // Pregunta 44
    {
        pregunta: "¿Cuál es el algoritmo de ordenación que hace uso de recursividad y de generar subarreglos repetidamente, determinando un pivote y generando más sub-arreglos hasta que los elementos queden ordenados?",
        respuestas: ["QuickSort", "MergeSort", "HeapSort", "BubbleSort"],
        correcta: "QuickSort"
    },
    // Pregunta 45
    {
        pregunta: "¿Qué comando se ocupa para ejecutar tu archivo compilado a partir de programa.java?",
        respuestas: ["java programa", "javac programa", "java programa.java", "javac programa.java"],
        correcta: "java programa"
    },
    // Pregunta 46
    {
        pregunta: "¿Qué comando se ocupa para compilar tu archivo programa.java?",
        respuestas: ["javac programa.java", "java programa.java", "java programa", "javac programa"],
        correcta: "javac programa.java"
    },
    // Pregunta 47
    {
        pregunta: "¿Qué símbolo se usa para indicar el comienzo y final de un método?",
        respuestas: ["Llaves `{ }`", "Paréntesis `( )`", "Corchetes `[ ]`", "Dos puntos `:`"],
        correcta: "Llaves `{ }`"
    },
    // Pregunta 48
    {
        pregunta: "¿Cuál es la sintaxis para crear una variable en Java?",
        respuestas: ["tipo nombreVariable = valor;", "nombreVariable tipo = valor;", "valor = tipo nombreVariable;", "tipo valor = nombreVariable;"],
        correcta: "tipo nombreVariable = valor;"
    },
    // Pregunta 49
    {
        pregunta: "¿Se puede declarar una variable sin valor para asignarla posteriormente?",
        respuestas: ["Verdadero", "No, no se puede", "Depende del tipo de dato", "Depende del sistema operativo"],
        correcta: "Verdadero"
    },
    // Pregunta 50
    {
        pregunta: "¿Cuáles son las características de las siguientes variables?\n a) Variable local\n b) Variable de instancia\n c) Variable estática",
        respuestas: ["a) Es declarada dentro de un método y solo es accesible dentro de ese método.\n b) Es declarada dentro de una clase, pero fuera de cualquier método, y es accesible por todos los métodos de la clase.\n c) Es declarada con la palabra clave `static` y es compartida entre todas las instancias de la clase.", "a) Es declarada dentro de una clase y solo es accesible dentro de esa clase.\n b) Es declarada dentro de un método y es accesible por todos los métodos de la clase.\n c) Es declarada con la palabra clave `static` y es compartida entre todas las instancias de la clase.", "a) Es declarada dentro de una clase y solo es accesible dentro de esa clase.\n b) Es declarada dentro de un método y es accesible por todos los métodos de la clase.\n c) Es declarada con la palabra clave `static` y es compartida entre todas las instancias de la clase.", "Ninguna de las anteriores"],
        correcta: "a) Es declarada dentro de un método y solo es accesible dentro de ese método.\n b) Es declarada dentro de una clase, pero fuera de cualquier método, y es accesible por todos los métodos de la clase.\n c) Es declarada con la palabra clave `static` y es compartida entre todas las instancias de la clase."
    },
    // Pregunta 51
    {
        pregunta: "¿Cuáles son los grupos de tipos de datos en Java?",
        respuestas: ["Tipos primitivos (byte, short, int, long, float, double, char, boolean) y tipos de referencia (clases, interfaces, arrays)", "Tipos primitivos (byte, short, int, long, float, double, char, boolean) y tipos de objetos (clases, interfaces, arrays)", "Tipos de referencia (clases, interfaces, arrays) y tipos de objetos (byte, short, int, long, float, double, char, boolean)", "Tipos primitivos (byte, short, int, long, float, double, char, boolean) y tipos abstractos (clases, interfaces, arrays)"],
        correcta: "Tipos primitivos (byte, short, int, long, float, double, char, boolean) y tipos de referencia (clases, interfaces, arrays)"
    },
    // Pregunta 52
    {
        pregunta: "¿Qué imprime el siguiente código?\n for (int i = 3; i <= 6; i += 2) {\n System.out.println(i);\n }",
        respuestas: ["3\n5", "3\n4\n5\n6", "4\n5\n6", "Ninguno de los anteriores"],
        correcta: "3\n5"
    },
    // Pregunta 53
    {
        pregunta: "En la siguiente declaración de un método, ¿qué significa el tipo de dato “float” cuando se coloca en esa posición?\n public static float main(){\n // bloque de código\n }",
        respuestas: ["Significa que el método `main` devolverá un valor de tipo `float`", "Significa que el método `main` no devolverá ningún valor", "Significa que el método `main` devolverá un valor de tipo `int`", "Significa que el método `main` devolverá un valor de tipo `double`"],
        correcta: "Significa que el método `main` devolverá un valor de tipo `float`"
    },
    // Pregunta 54
    {
        pregunta: "¿Cuál es el tipo de dato para almacenar secuencia de caracteres?",
        respuestas: ["String", "char", "int", "boolean"],
        correcta: "String"
    },
    // Pregunta 55
    {
        pregunta: "¿A qué pueden acceder las subclases?",
        respuestas: ["Las subclases pueden acceder a atributos y métodos públicos y protegidos de la superclase.", "Las subclases pueden acceder a todos los atributos y métodos de la superclase.", "Las subclases solo pueden acceder a los métodos de la superclase.", "Las subclases solo pueden acceder a los atributos de la superclase."],
        correcta: "Las subclases pueden acceder a atributos y métodos públicos y protegidos de la superclase."
    },
    // Pregunta 56
    {
        pregunta: "¿Cuáles son la/las maneras de no caer en un bucle while infinito?",
        respuestas: ["Asegurarse de que la condición del bucle eventualmente se vuelva falsa y modificar variables dentro del bucle que afecten esa condición.", "Asegurarse de que la condición del bucle nunca se vuelva falsa.", "No usar bucles while.", "Usar solo bucles for."],
        correcta: "Asegurarse de que la condición del bucle eventualmente se vuelva falsa y modificar variables dentro del bucle que afecten esa condición."
    },
    // Pregunta 57
    {
        pregunta: "¿Con qué sintaxis se accede a los atributos y métodos de un objeto?",
        respuestas: ["objeto.atributo;\n objeto.metodo();", "objeto(atributo);\n objeto[metodo];", "atributo.objeto;\n metodo.objeto();", "objeto-atributo;\n objeto:metodo();"],
        correcta: "objeto.atributo;\n objeto.metodo();"
    },
    // Pregunta 58
    {
        pregunta: "¿Qué se debe definir antes de crear un objeto?",
        respuestas: ["La clase a la que pertenecerá el objeto.", "Los métodos del objeto.", "Los atributos del objeto.", "El constructor del objeto."],
        correcta: "La clase a la que pertenecerá el objeto."
    },
    // Pregunta 59
    {
        pregunta: "¿Cuál es la definición de un paradigma de programación?",
        respuestas: ["Un paradigma de programación es un enfoque o estilo de programación, basado en ciertos principios y conceptos, para resolver problemas de software.", "Un paradigma de programación es una secuencia de pasos para resolver un problema de software.", "Un paradigma de programación es un conjunto de reglas para escribir código en un lenguaje de programación.", "Un paradigma de programación es un conjunto de herramientas para el desarrollo de software."],
        correcta: "Un paradigma de programación es un enfoque o estilo de programación, basado en ciertos principios y conceptos, para resolver problemas de software."
    },
    // Pregunta 60
    {
        pregunta: "¿Una vez que vez asignado un valor a una posición de un arreglo ya no puede cambiarse?",
        respuestas: ["No, el valor de una posición en un arreglo se puede cambiar.", "Sí, el valor de una posición en un arreglo no se puede cambiar.", "Depende del tipo de dato del arreglo.", "Depende del sistema operativo."],
        correcta: "No, el valor de una posición en un arreglo se puede cambiar."
    },
    // Pregunta 61
    {
        pregunta: "¿Es posible declarar una variable sin valor para asignarla posteriormente?",
        respuestas: ["Sí, es posible:\n int variable;", "No, no es posible.", "Depende del tipo de dato.", "Depende del sistema operativo."],
        correcta: "Sí, es posible:\n int variable;"
    },
    // Pregunta 62
    {
        pregunta: "¿Cuál es el resultado de la siguiente operación?\n int dineroCliente = 170;\n int precioPan = 15;\n int precioRefresco = 18;\n if (dineroCliente > precioPan + precioRefresco) {\n System.out.print('Compra. ');\n }\n System.out.println('Sale de la tienda');",
        respuestas: ["Compra. Sale de la tienda", "Compra.", "Sale de la tienda", "Ninguna de las anteriores"],
        correcta: "Compra. Sale de la tienda"
    },
    // Pregunta 63
    {
        pregunta: "¿Cuál es un tipo de declaración de variable no válida en Java?",
        respuestas: ["int 4variable;", "int variable4;", "int variable;", "int _variable;"],
        correcta: "int 4variable;"
    },
    // Pregunta 64
    {
        pregunta: "¿Cuál es el método que genera como valor de salida todas las letras mayúsculas de un texto almacenado en una variable?",
        respuestas: ["toUpperCase()", "toLowerCase()", "capitalize()", "toUpperCaseAll()"],
        correcta: "toUpperCase()"
    },
    // Pregunta 65
    {
        pregunta: "¿Cuál es la clase del paquete java.util para leer datos de distintas fuentes (texto, entrada de teclado, archivos)?",
        respuestas: ["Scanner", "BufferedReader", "FileReader", "InputStream"],
        correcta: "Scanner"
    },
    // Pregunta 66
    {
        pregunta: "¿Una subclase puede acceder a atributos y métodos de la superclase de la que hereda?",
        respuestas: ["Sí", "No", "Solo si son públicos", "Solo si son privados"],
        correcta: "Sí"
    },
    // Pregunta 67
    {
        pregunta: "¿Cuál es el proceso por el cual se crean objetos a partir de una clase?",
        respuestas: ["Instanciar", "Inicialización", "Herencia", "Sobrescritura"],
        correcta: "Instanciar"
    },
    // Pregunta 68
    {
        pregunta: "¿Qué es el polimorfismo?",
        respuestas: ["Es la capacidad que tienen los objetos de una clase en ofrecer respuestas distintas e independiente en función de los parámetros utilizados durante su invocación. Alude al modo en que se pueden crear y utilizar dos o más métodos con el mismo nombre para ejecutar funciones diferentes.", "El polimorfismo es la capacidad de un objeto de heredar métodos y atributos de una superclase.", "El polimorfismo es la capacidad de un objeto de encapsular datos y métodos.", "El polimorfismo es la capacidad de un objeto de sobrescribir métodos de una superclase."],
        correcta: "Es la capacidad que tienen los objetos de una clase en ofrecer respuestas distintas e independiente en función de los parámetros utilizados durante su invocación. Alude al modo en que se pueden crear y utilizar dos o más métodos con el mismo nombre para ejecutar funciones diferentes."
    },
    // Pregunta 69
    {
        pregunta: "¿Qué es un atributo?",
        respuestas: ["Son las carácteristicas individuales que diferencian un objeto de otro y determinan su apariencia, estado u otras cualidades.", "Un atributo es un método que pertenece a una clase o a un objeto.", "Un atributo es una clase que pertenece a un paquete.", "Un atributo es una instancia de una clase."],
        correcta: "Son las carácteristicas individuales que diferencian un objeto de otro y determinan su apariencia, estado u otras cualidades."
    },
    // Pregunta 70
    {
        pregunta: "¿Cuál es el resultado del siguiente código en Java?\n String numero1 = '120';\n String numero2 = '205';\n System.out.println(numero1 + numero2);",
        respuestas: ["120205", "325", "120 205", "Ninguno de los anteriores"],
        correcta: "120205"
    },
    // Pregunta 71
    {
        pregunta: "¿Cuál es el bucle exclusivo para recorrer elementos en un arreglo?",
        respuestas: ["El bucle `for-each`", "El bucle `for`", "El bucle `while`", "El bucle `do-while`"],
        correcta: "El bucle `for-each`"
    },
    // Pregunta 72
    {
        pregunta: "¿Qué sucede cuando se le pasan parámetros de un tipo de dato distinto al declarado en el método como parámetro que puede recibir?",
        respuestas: ["Se produce un error de compilación.", "El programa se ejecuta sin problemas.", "El método ignora los parámetros.", "El método convierte los parámetros al tipo de dato correcto."],
        correcta: "Se produce un error de compilación."
    },
    // Pregunta 73
    {
        pregunta: "¿Cuál es el proceso por el cual se identifican los atributos y métodos que va a tener una clase?",
        respuestas: ["Diseño de clases", "Implementación de clases", "Instanciación", "Encapsulamiento"],
        correcta: "Diseño de clases"
    },
    // Pregunta 74
    {
        pregunta: "¿Qué nombre reciben las funcionalidades de los objetos en la Programación Orientada a Objetos?",
        respuestas: ["Métodos", "Atributos", "Clases", "Instancias"],
        correcta: "Métodos"
    },
    // Pregunta 75
    {
        pregunta: "¿Qué es una herencia?",
        respuestas: ["La herencia es un mecanismo en el que una clase deriva de otra clase para heredar sus campos y métodos.", "La herencia es un mecanismo en el que una clase sobrescribe los métodos de otra clase.", "La herencia es un mecanismo en el que una clase encapsula sus campos y métodos.", "La herencia es un mecanismo en el que una clase implementa una interfaz."],
        correcta: "La herencia es un mecanismo en el que una clase deriva de otra clase para heredar sus campos y métodos."
    },
    // Pregunta 76
    {
        pregunta: "Teniendo en un arreglo un conjunto de años indica la forma de imprimir el valor 200:\n int[] año = {198, 199, 200, 201, 202};\n System.out.println(año[2]);",
        respuestas: ["System.out.println(año[2]);", "System.out.println(año[3]);", "System.out.println(año[1]);", "System.out.println(año[4]);"],
        correcta: "System.out.println(año[2]);"
    },
    // Pregunta 77
    {
        pregunta: "¿A qué operador se le llama así a que el signo ‘+’ con dígitos suma y con caracteres concatena?",
        respuestas: ["Operador de concatenación", "Operador de suma", "Operador de adición", "Operador de combinación"],
        correcta: "Operador de concatenación"
    },
    // Pregunta 78
    {
        pregunta: "¿Cuál es la sentencia para la toma de decisiones dentro de un flujo en Java cuando hay más de dos posibles opciones?",
        respuestas: ["`switch`", "`if-else`", "`while`", "`do-while`"],
        correcta: "`switch`"
    },
    // Pregunta 79
    {
        pregunta: "Se le llama así a dos métodos que comparten mismo nombre pero realizan diferentes operaciones dependiendo de sus parámetros definidos.",
        respuestas: ["Sobrecarga de métodos (`method overloading`)", "Sobrescritura de métodos (`method overriding`)", "Herencia", "Polimorfismo"],
        correcta: "Sobrecarga de métodos (`method overloading`)"
    },
    // Pregunta 80
    {
        pregunta: "Indica la salida del siguiente código usando Arrays:\n int[] edades = {8, 9, 10, 11, 12};\n System.out.println(edades[5]);",
        respuestas: ["El código lanzará una excepción `ArrayIndexOutOfBoundsException` ya que el índice 5 está fuera del rango del arreglo.", "El código imprimirá `12`.", "El código imprimirá `0`.", "El código lanzará una excepción `NullPointerException`."],
        correcta: "El código lanzará una excepción `ArrayIndexOutOfBoundsException` ya que el índice 5 está fuera del rango del arreglo."
    },
    // Pregunta 81
    {
        pregunta: "Es el método de la librería java.io para llenar información en un archivo *.txt",
        respuestas: ["`FileWriter` y `BufferedWriter` pueden ser utilizados. Write", "`PrintWriter` y `FileOutputStream` pueden ser utilizados.", "`BufferedReader` y `FileInputStream` pueden ser utilizados.", "`Scanner` y `FileReader` pueden ser utilizados."],
        correcta: "`FileWriter` y `BufferedWriter` pueden ser utilizados. Write"
    },
    // Pregunta 82
    {
        pregunta: "Indica los tipos de operadores en Java.",
        respuestas: ["Operadores aritméticos, operadores relacionales, operadores lógicos, operadores de asignación, operadores unarios, y operadores bit a bit.", "Operadores aritméticos, operadores relacionales, operadores lógicos, operadores de asignación, operadores de comparación, y operadores bit a bit.", "Operadores aritméticos, operadores lógicos, operadores de asignación, operadores de comparación, y operadores bit a bit.", "Operadores aritméticos, operadores relacionales, operadores lógicos, operadores de asignación, operadores unarios, y operadores condicionales."],
        correcta: "Operadores aritméticos, operadores relacionales, operadores lógicos, operadores de asignación, operadores unarios, y operadores bit a bit."
    }
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
            descargarCSVAdministrador();
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

function descargarCSVAdministrador() {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "Usuario,Pregunta,Respuesta Elegida,Respuesta Correcta\n";
    const username = _usernameInput.value.trim();
    respuestasUsuario.forEach(({ pregunta, respuesta, correctaText }) => {
        const preguntaSanitizada = pregunta.replace(/,/g, ' ').replace(/(\r\n|\n|\r)/gm, " ");
        const respuestaSanitizada = respuesta.replace(/,/g, ' ').replace(/(\r\n|\n|\r)/gm, " ");
        const correctaSanitizada = correctaText.replace(/,/g, ' ').replace(/(\r\n|\n|\r)/gm, " ");
        csvContent += `${username},${preguntaSanitizada},${respuestaSanitizada},${correctaSanitizada}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "respuestas_administrador.csv");
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
    doc.text("Certificado de Java", 105, 40, null, null, "center");

    doc.setFontSize(16);
    doc.text(`Otorgado a: ${username}`, 105, 60, null, null, "center");
    doc.text(`Por haber completado el cuestionario de Java`, 105, 80, null, null, "center");
    doc.text(`Con una puntuación de: ${score}`, 105, 100, null, null, "center");

    doc.setFontSize(12);
    doc.text("Firmado por EnigmaK9", 105, 120, null, null, "center");

    doc.save(`certificado_${username}.pdf`);
}
