var Hapi = require('hapi');
var Vision = require('vision');
var Path = require('path');
var faker = require('faker');



var server = new Hapi.Server();

server.connection({
    host: 'localhost',
    port: Number(process.argv[2] || 3000)
});


server.register(Vision, function () {});

server.views({
    engines: {
        html: require('handlebars')
    },
    path: Path.join(__dirname, 'public')
});

server.route({
    method: 'GET',
    path: '/',
    handler: {
        view: 'index.html'
    }
});
var suma=0,opcion=1;var cont=0, variable=0, num=0;var base={'usuarios':[]};
server.route({
        method:'GET',
        path:'/users/{userName}',
        handler:function  (request,reply) {
            var name=encodeURIComponent(request.params.userName);
            for (var i = 0; i < base.usuarios.length; i++) {
              if (base.usuarios[i].nombre==name) {
                  opcion=0;
                  mensajes='usuario ya existe';
                  variable=i;
                  break;
              }else{
                opcion=1;

              }
              

            }

            
            /*para saber la cantidad de digitos del id nuevo*/
            if (opcion==1)
            {     var cont=0,cont1=0;
                          var numero=i+1;
                          numero=parseInt(numero);
                          var numero1=numero;
                          while(numero>=1){
                            
                          numero=numero/10;
                          cont++;
                          
                          }
                /*para generar el formato*/

                          if(cont==1){
                             cont='0000000'+numero1; 
                          }else if(cont==2){
                            cont='000000'+numero1;
                          }else if(cont==3){
                            cont='00000'+numero1;
                          }
                          else if(cont==4){
                            cont='0000'+numero1;
                          }
                          else if(cont==5){
                            cont='000'+numero1;
                          }
                          else if(cont==6){
                            cont='00'+numero1;
                          }else if(cont==7){
                            cont='0'+numero1;
                          }else if(cont==8){
                            cont=numero1;
                          }else{
                              num=1;
                              cont=numero1;
                          }
                /*para generar el json formato 00000001*/
                  base.usuarios[suma]={'nombre':name,'codigo':'steam_0:'+num+':'+cont};
                  mensajes='id generado';
                  numero=i;
                  suma++;

                  
                     
            }else if(opcion==0) {
              /*en caso de que ya exista el usuario*/
                  
                  numero=variable;
            }
            
              reply.view('users',{query:name,steamID:base.usuarios[numero].codigo,mensaje:mensajes});                 
          }
    });




server.start(() => {
    console.log('Servidor corriendo en:', server.info.uri);
});

