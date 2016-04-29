/*!
 *  lForm.bootstrap Por Leonardo Hernández @ingleonardohp - http://codeaink.com
 version 1.0.0
 * -------------------------- */
$.extend({
    //Genera una cadena de caracteres alfanumero con opcion de caracteres especiales
    //el primer parametro representa la longitud de la cadena, variable entera (int)
    //el segundo parametro representa la opcion que habilita la inclusion de caracteres especiales, variable boolean (true, false)
    password: function (longitud, especiales) {
        var iteracion = 0;
        var password = "";
        var numeroAleatorio;
        if(especiales == undefined){
            var especiales = false;
        }
        while(iteracion < longitud){
            numeroAleatorio = (Math.floor((Math.random() * 100)) % 94) + 33;
            if(!especiales){
                if ((numeroAleatorio >=33) && (numeroAleatorio <=47)) { continue; }
                if ((numeroAleatorio >=58) && (numeroAleatorio <=64)) { continue; }
                if ((numeroAleatorio >=91) && (numeroAleatorio <=96)) { continue; }
                if ((numeroAleatorio >=123) && (numeroAleatorio <=126)) { continue; }
            }
            iteracion++;
            password += String.fromCharCode(numeroAleatorio);
        }
        return password;
    },
    //analisa los input dentro de un contenedor, retorna 0 si existen incidencias o campos vacios
    validarInput:function(contenedor){
        if(contenedor){
            var issues=0;
            $(contenedor+" input").each(function(){
                issues=$(this).function_val(issues);
            });
            $(contenedor+" textarea").each(function(){
                issues=$(this).function_val(issues);
            });
            $(contenedor+" select").each(function(){
                if(!$(this).data("ignorar")){
                    if($(this).val()==0){
                        issues++;
                        $(this).after('<div class="alert alert-danger" role="alert">Campo requerido.</div>');
                        $(this).focus(function(){
                            $(this).siblings('.alert-danger').remove();
                        });
                    }
                }
            });
            if(issues){
                return 0;
            }else{
                return 1;
            }
        }
    }
});

//cargando de un btn
jQuery.fn.extend({
    //texto original del btn
    text_original:"",
    //texto temporal o de "cargando..."
    text_temp:"",
    //funcion para iniciar el cargando del btn
    //el primer parametro representa el texto que tomara el btn, ejemplo "cargando"
    //el segundo parametro representa si se desea desactivar el btn durante el cargando
    //el tercer parametro reprensenta si se desea agregar una animacion al btn 
    cargando:function(text,desactivar,animacion){
        text_original=$(this).html();
        text_temp=text;
        $(this).html(text);
        if(desactivar){
            $(this).prop("disabled",true);
        }
        if(animacion){
            $(this).append(' <i class="lF-icons giros">&#xe806;</i>');
        }
    },
    //funcion para finalizar el cargando, restaura los valores del btn
    restaurar:function(){
        $(this).prop("disabled",false);
        $(this).html(text_original);
    },
    //funcion complemetanria para validar los input y textarea
    function_val:function(issues){
        issues=issues;
        if(!$(this).data("ignorar")){
            if($(this).val().length==0){
                issues++;
                $(this).after('<div class="alert alert-danger" role="alert">Campo requerido.</div>');
                $(this).focus(function(){
                    $(this).siblings('.alert-danger').remove();
                });
            }
        }
        return issues;
    }
});