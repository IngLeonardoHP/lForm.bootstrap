# lForm.bootstrap

Convierte un `form` en un `ajax` con una linea de código. Ese linea incluye, validaciones de los input`s (Es posible ignorar input si asi se desea) y envió de imágenes. Tambien retorna un callback con los datos 

[Ejemplo](http://lform.webcindario.com/index.php)

**Plugins **para el manejo de ajax en form de html5 para Bootstrap 3.x, ofrece **conversión de formularios html5 a ajax** (incluye el envió de imágenes) validación de campos input, textarea y select. También un generador de password alfanumérico con la opción de incluir caracteres especiales.

lForm.bootstrap maneja el estado del botón durante el envió de datos con opciones múltiples para la visualización del usuario.

Se mejora la velocidad con la que el desarrollador codifica al momento de hacer validaciones.

## Key words JS

`$.validateInput(string)` Retorna 0 o 1. Esta funcion recibe un contenedor donde se encuentran los input`s a evaluar, si alguno esta vacio, lo señaliza y retorna 0, en caso contrario retorna 1.

`$.password(int,boolean)` Retorna un string. Generar claves, ejemplo "Lsj25a9y!.@ada", el primer parametro es la longitud de la cadena y el segundo es opcional y hace referencia a si se quieren o no caracteres especiales.

`$.clearInput(string)` 	Limpiar campos input del contenedor. Recibe el contenedor de los input's que seran limpiados.

`$(button).loading(string,boolean,boolean)` Inicializa el btn cargando. Recibe 3 parametros, el primero es el texto que aparece en el button mientras este cargando, el segundo si se desea desactivar el button durante la carga y el ultimo si se deseea animar el button.

`$(button).restore()` Restaura el btn a sus valores iniciales.

`$.lFormAjaxMagic(string,function[,boolean,boolean])` Recibe el id de un formulario y la funcion callback, esta funcion recibe json Opcional: dos valores boolean, el primero activa la barra de progreso y el segundo vacía los campos (true por defecto). 

Convierte un formulario normal de HTML5 en un ajax (Incluye envio de imágenes).

Nota importante: Debe tenerse cuidado con no olvidar agregar en el formulario el "METHOD" y "ACTION", como tambien el "name" en cada input y por ultimo la clase `lForm-submit` en el button que hara de submit, y `lForm-clear` al button que limpia los campos

## Opciones HTML5

Ignorar un campo
`data-disregard="true"` 

Longitud maxima y minima

Maxima
`data-lengthMax="int"`

Minima
`data-lengthMin="int"`

Validar solo numero enteros, reales y caractéres, agregando una clase en el input

Solo numeros
`.onlyNumber`

Solo numeros reales
`.onlyDecimal`

Solo caractéres
`.onlyCharacter`