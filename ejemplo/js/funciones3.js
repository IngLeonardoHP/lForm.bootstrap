$("#simple").click(function(){
          var btn=$(this);
          btn.cargando("Mensaje");
          setTimeout(function(){
              btn.restaurar();
          },2000);
        });
        $("#desactivo").click(function(){
          var btn=$(this);
          btn.cargando("Mensaje",true);
          setTimeout(function(){
              btn.restaurar();
          },2000);
        });
        $("#animado").click(function(){
          var btn=$(this);
          btn.cargando("Registrando",false,true);
          setTimeout(function(){
              btn.restaurar();
          },2000);
        });
        $("#completo").click(function(){
          var btn=$(this);
          btn.cargando("Registrando",true,true);
          setTimeout(function(){
              btn.restaurar();
          },2000);
        });
        $("#generador").click(function(){
          alert($.password(12,true));
        });