$("#simple").click(function(){
          var btn=$(this);
          btn.loading("Mensaje");
          setTimeout(function(){
              btn.restore();
          },2000);
        });
        $("#desactivo").click(function(){
          var btn=$(this);
          btn.loading("Mensaje",true);
          setTimeout(function(){
              btn.restore();
          },2000);
        });
        $("#animado").click(function(){
          var btn=$(this);
          btn.loading("Registrando",false,true);
          setTimeout(function(){
              btn.restore();
          },2000);
        });
        $("#completo").click(function(){
          var btn=$(this);
          btn.loading("Registrando",true,true);
          setTimeout(function(){
              btn.restore();
          },2000);
        });
        $("#generador").click(function(){
          alert($.password(12,true));
        });