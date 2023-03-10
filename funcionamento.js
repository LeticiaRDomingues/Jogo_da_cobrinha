window.onload = function(){

    var stage = document.getElementById('stage');
    var context = stage.getContext("2d"); //Onde ficam desenhos e partes graficas
    document.addEventListener("keydown", keyPush);
    setInterval(game, 80);//Define o intervalo para uma funçao ser chamada com esse intervalo.
    //A cada 60 milissegundos a funçao será chamada novamente
    
    const vel = 1;//a velocidade define quantas casas a cobra vai andar cada vez que o jogo/funçao for atualizado/a lógica passar por dentro
    
    var vx = vy = 0; //velocidade x e y são iguais a 0
    
    var px = 10 //o ponto x sempre começam no ponto 10
    
    var py = 15; //o ponto y sempre começam no ponto 15
    
    var tamanho = 30; //Como é um quadrado, a largura e altura dos quadradinhos que compõem são iguais a 30
    
    var quant = 20; // a quantidade de quadradinhos é igual a 20
    
    var ax = ay = 15;//estabelece onde a maça que a cobrinha vai comer vai iniciar
    
    
    //Elementos no rastro da cobra
    var trail = [];//Começa vazio pois nao há elementos no rastro
    tail = 5; //o tamanho do rastro da cobrinha no começo.
    
    
    
    function game(){
    px += vx; //posicao onde fica a cabeça da cobra, no inicio ela recebe 0, ate o jogo começar
    py += vy; //mesma coisa do vx
    
    //se a cobra vai até a borda para a esquerda, ela precisa ir para o final, por isso, abrangemos diversas
    //opcoes do que pode acontecer com esses 4 ifs, dessa forma, a cobra pode se movimentar sem problemas
    if(px < 0){
    px = quant - 1;
    }
    if(px > quant - 1){
    px = 0;
    }
    if(py < 0){
    py = quant - 1;
    }
    if(py > quant - 1){
    py = 0;
    }
    
    //pintura do canvas
    context.fillStyle = "black"; //estilo de preenchimento do context
    context.fillRect(0,0, stage.width, stage.height);//pinta o stage da cor que definimos
    
    //pintura da maça
    context.fillStyle = "red";
    context.fillRect(ax*tamanho, ay*tamanho, tamanho, tamanho)//pintando os pixels de cada peça
    
    //pintura da cobrinha
    context.fillStyle = "gray";
    
    //verificar se a cobrinha bateu nela mesmo
    for(var i = 0; i < trail.length; i++){
    context.fillRect(trail[i].x*tamanho, trail[i].y*tamanho, tamanho-1, tamanho-1);
    
    //Se a posiçao do rabo da cobra, for igual a posiçao da cabeça, é game over, isso que esse if faz
    if(trail[i].x == px && trail[i].y == py)//verificou se as duas opçoes atendem ao mesmo tempo
    {
        vx = vy = 0;//game over, mas nao tem muito tratamento
        tail = 5;
    }   
    }
    
    trail.push({x:px, y:py }) //criando um objeto que tem um elemento x = posicao atual(não bateu) e y = posicao atual y
    while (trail.length > tail){//verifica se o tamanho do rastro é maior que o da cauda, se for, ele tira o primeiro elemento do array
    trail.shift();
    }
    
    if(ax == px && ay == py){//Aqui vamos aumentar o tamanho da cauda, quando a cobrinha comer a maça.
    tail++;
    //para reposicionar a maça de forma randomica
    ax = Math.floor(Math.random()*quant);
    ay = Math.floor(Math.random()*quant);
    }
    }
    
    function keyPush(event){
    
    switch (event.keyCode){
        case 37: // Left
        vx = -vel;
        vy = 0;
        break;
        case 38: //Up
        vx = 0;
        vy = -vel;
        break;
        case 39: //right
        vx = vel;
        vy = 0;
        break;
        case 40: //down
        vx = 0;
        vy = vel;
        break;
    
        default:
    
        break;
    }
    }
    }