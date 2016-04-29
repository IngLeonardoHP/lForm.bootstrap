$("#registrar").click(function(){
  var btn=$(this);
  if($.validarInput(".panel-body")){
      btn.cargando("Registrando",true,true);
      setTimeout(function(){
          btn.restaurar();
      },2000);
  }
});
$("#generador").click(function(){
  $("#inputPassword").val($.password(12,true));
});
      