$("#registrar").click(function(){
  var btn=$(this);
  if($.validateInput(".panel-body")){
      btn.loading("Registrando",true,true);
      setTimeout(function(){
          btn.restore();
          $.clearInput(".panel-body");
      },2000);
  }
});