$("#registrar").click(function(){
  var btn=$(this);
  if($.validateInput(".panel-body")){
      btn.loading("Registrando",true,true);
      setTimeout(function(){
          btn.restore();
      },2000);
  }
});
$("#generador").click(function(){
  $("#inputPassword").val($.password(12,true));
});
      