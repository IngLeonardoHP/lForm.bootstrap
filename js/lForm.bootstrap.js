/*!
 *  lForm.bootstrap Por Leonardo Hernández @ingleonardohp - http://codeaink.com
 version 2.0.4
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
    validateInput:function(contenedor){
        if(contenedor){
            var issues=0;
            $(contenedor+" input").each(function(){
                issues=$(this).function_val(issues);
            });
            $(contenedor+" textarea").each(function(){
                issues=$(this).function_val(issues);
            });
            $(contenedor+" select").each(function(){
                if(!$(this).data("disregard")){
                    if($(this).val()==0){
                        issues++;
                        $(this).addClass("lError");
                        $(this).after('<div class="alert alert-danger" role="alert">Campo requerido.</div>');
                        $(this).focus(function(){
                            $(this).removeClass("lError");
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
    },
    clearInput:function(contenedor){
        $(contenedor+" input").each(function(){
            $(this).val("");
            $(this).each(function(){
                $(this).siblings('.alert-danger').remove();
            });
        });
        $(contenedor+" textarea").each(function(){
            $(this).val("");
            $(this).each(function(){
                $(this).siblings('.alert-danger').remove();
            });
        });
        $(contenedor+" select option[value=0]").each(function(){
            $(this).attr("selected","selected");
            $(contenedor+" select").each(function(){
                $(this).siblings('.alert-danger').remove();
            });
        });
    },
    lFormAjaxMagic:function(contenedor,callback,progreso,vaciar){
        if(!vaciar){
            vaciar=true;
        }
        if(progreso){
            $(contenedor).append('<div class="procesando hidden">'+
                '<div class="col-lg-12">'+
                  '<div class="progress">'+
                    '<div class="progress-bar progress-bar-striped active" role="progressbar" aria-valuenow="45" aria-valuemin="0" aria-valuemax="100" style="width: 0%">'+
                      '<span class="sr-only"></span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
              '</div>');
            $(contenedor+" .procesando").css("padding",($(contenedor).height()/2)+10);
        }
        $(contenedor).submit(function(e){
            e.preventDefault();
            if($.validateInput(contenedor)){
                var url=$(this)[0].action;
                var type=$(this)[0].method;
                var formData=new FormData($(this)[0]);
                $(contenedor +" .lForm-submit").loading("Loading",true,true);
                $.ajax({
                  url: url,  
                  type: type,
                  data: formData,
                  cache: false,
                  contentType: false,
                  processData: false,
                  xhr: function(){
                    $(contenedor+" .procesando").removeClass("hidden");
                    var xhr = new window.XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function(evt){
                      if (evt.lengthComputable) {
                        var percentComplete = evt.loaded / evt.total;
                        $(contenedor+" .procesando .progress-bar").css("width",(percentComplete*100)+"%");
                      }
                    }, false);
                    return xhr;
                  },
                  success: function(datos){
                    $(contenedor+" .procesando").addClass("hidden");
                    $(contenedor+" .procesando .progress-bar").css("width","0%");
                    $(contenedor +" .lForm-submit").restore();
                    if(vaciar){
                        $.clearInput(contenedor);
                    }
                    callback(datos);
                  },
                  error:function(e){
                    console.log(e);
                    alert(e.status);
                  }
                });
            }
        })
        
        $(contenedor +" .lForm-clear").click(function(){
            $.clearInput(contenedor);
        });
    }
});

//loading de un btn
jQuery.fn.extend({
    //texto original del btn
    text_original:"",
    //texto temporal o de "loading..."
    text_temp:"",   
    //funcion para iniciar el loading del btn
    //el primer parametro representa el texto que tomara el btn, ejemplo "loading"
    //el segundo parametro representa si se desea desactivar el btn durante el loading
    //el tercer parametro reprensenta si se desea agregar una animacion al btn 
    loading:function(text,desactivar,animacion){
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
    //funcion para finalizar el loading, restaura los valores del btn
    restore:function(){
        $(this).prop("disabled",false);
        $(this).html(text_original);
    },
    //funcion complemetanria para validar los input y textarea
    function_val:function(issues){
        issues=issues;
        if(!$(this).data("disregard")){
            if($(this).val().length<$(this).data("lengthmin")){
                issues++;
                $(this).addClass("lError");
                $(this).after('<div class="alert alert-danger" role="alert">El minimo de caractéres requeridos son '+$(this).data("lengthmin")+'.</div>');
                $(this).focus(function(){
                    $(this).removeClass("lError");
                    $(this).siblings('.alert-danger').remove();
                });
            }
            if($(this).val().length==0){
                issues++;
                $(this).addClass("lError");
                $(this).after('<div class="alert alert-danger" role="alert">Campo requerido.</div>');
                $(this).focus(function(){
                    $(this).removeClass("lError");
                    $(this).siblings('.alert-danger').remove();
                });
            }
            if($(this).data("lengthmax")){
                if($(this).val().length>$(this).data("lengthmax")){
                    issues++;
                    $(this).addClass("lError");
                    $(this).after('<div class="alert alert-danger" role="alert">El maximo de caractéres requeridos son '+$(this).data("lengthmax")+'.</div>');
                    $(this).focus(function(){
                        $(this).removeClass("lError");
                        $(this).siblings('.alert-danger').remove();
                    });
                }
            }
        }
        return issues;
    },
    onlyValidateNumber:function(){
        $(this).keydown(function (e) {
            if((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode==8  || e.keyCode==116 || e.keyCode==9 || e.keyCode==13 || e.keyCode==17 || e.keyCode==16 || (e.keyCode>=96 && e.keyCode<=105)){
                return;
            }else{
                e.preventDefault();
            }
        });
    },
    onlyValidateDecimal:function(){
        $(this).keydown(function (e) {
            if((e.keyCode >= 48 && e.keyCode <= 57) || e.keyCode==8  || e.keyCode==116 || e.keyCode==110 || e.keyCode==9 || e.keyCode==13 || e.keyCode==190 || e.keyCode==46 || e.keyCode==17 || e.keyCode==16 || (e.keyCode>=96 && e.keyCode<=105)){
                return;
            }else{
                e.preventDefault();
            }
        });
    },
    onlyValidateCharacter:function(){
        $(this).keydown(function (e) {
            if((e.keyCode >= 65 && e.keyCode <= 122) || e.keyCode==8  || e.keyCode==116 || e.keyCode==9 || e.keyCode==13 || e.keyCode==241 || e.keyCode==192 || e.keyCode==17 || e.keyCode==16){
                return;
            }else{
                e.preventDefault();
            }
        });
    }
});

$(document).ready(function(){
    $(".onlyNumber").each(function(){
        $(this).onlyValidateNumber();
    })
    $(".onlyDecimal").each(function(){
        if($(this).data("separator")){
            $(this).onlyValidateDecimal($(this).data("separator"));
        }else{
            $(this).onlyValidateDecimal();
        }
    })
    $(".onlyCharacter").each(function(){
        $(this).onlyValidateCharacter();
    })
})