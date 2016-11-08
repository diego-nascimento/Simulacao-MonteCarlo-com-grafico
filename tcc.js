Valores = []; //array que recebe os valores gerados
Histograma = [];
simulado = false; //variavel que controla se uma simulaçao ja foi feita se uma simulaçao ja foi 
var Menor;
var Maior;

function GerarValores(Quantidade, Menor, Maior, Provavel, Valores){ //funçao que contra a geraçao dos novos valores
	for(i = 0; i < Quantidade; i++){ //fazendo o controle da quantidade de valores aleatorios que estao sendo gerados
		Valores.push(GerandoValor()); //gerando cada valor aleatorio
	}
	DistribuicaoTriangular(Valores, Maior, Menor, Provavel);
}
function DistribuicaoTriangular(Valores, Maximo, Minimo, Provavel){
	var limiar;   				    				// é o limiar, sendo calculado por (melhor - minimo) / (maximo - minimo)
	var i = 0;										// contador para o laço
	var difMelhorMinimo = Provavel - Minimo;			// calcula a diferença entre a melhor e a menor estimativa  B - A
    var difMaximoMinimo = Maximo - Minimo;			// calcula a diferença entre a máxima e a menor estimativa  C - A
    var difMaximoMelhor = Maximo - Provavel;			// calcula a diferença entre a máxima e a melhor estimativa	C - B
	limiar = difMelhorMinimo / difMaximoMinimo; 	// cálculo do limiar (B - A) / (C - A)
	var distribuicao = [];
	for( i = 0; i < Valores.length; i++ ){	    	
		if( Valores[i] >= limiar ){					
			// se o número aleatório é maior que o limiar
			// C - Raiz ( (1 - x) (C - B) (C - A) )
			Valores[i] =  Maximo -  Math.sqrt( ( 1 - Valores[i] ) * difMaximoMelhor  * difMaximoMinimo ); 
		}else{										
			// o número aleatório é menor que o limiar
			// A + Raiz ( x (B - A) (C - A) )	
			Valores[i] =  Minimo + Math.sqrt( Valores[i] * difMelhorMinimo * difMaximoMinimo); 	 
		}
		
	}
}
function GerandoValor(){ //funçao que gera o valor aleatorio
	return Math.random();
	
}


function ValorMaximo(Valores){//funçao que descobre o maior valor entre os valores gerados
	var maior = Valores[0]; //a comparaçao começa a parte do primeiro
	for(i = 0;i<Valores.length;i++){ //percorre todos os valores
		if(Valores[i]>maior){ //compara o valor a ser comparado eh maior que o maior ja descoberto
			maior = Valores[i]; //se for menor, substitui-se para o novo maior valor
		}
	}
	return maior; //retorna o mair valor aleatorio gerado
	
}

function ValorMinimo(Valores){ //funçao que descobre o menor valor entre os valores gerados
	var menor = Valores[0]; //a comparaçao começa a parte do primeiro
	for(i = 0;i<Valores.length;i++){ //percorre todos os valores
		if(Valores[i] < menor){ //compara o valor a ser comparado eh menor que o menor ja descoberto
			menor = Valores[i]; //se for menor, substitui-se para o novo menor valor
		}
	}
	return menor; //retorna o menor valor aleatorio gerado
}

function CalculaFrequencia(anterior, atual,  Valores){ // funçao que calcula a frequencia de um bloco
	var contador = 0; //variavel que conta quantos elementos existe na faixa de valor do bloco
	for(j = 0; j < Valores.length;j++){ //percorrendo o array
		if(Valores[j]> anterior && Valores[j] <= atual){ // Onde eh comparada o valor, o valor tem q ser maior que o do bloco anterior podendo chegar ate o valor do bloco atual
			contador++; //se o valor esta dentro da faixa correta, eh contabilizado
		}
	}
	
	return contador; //retornando a resposta
	
}

function CalculandoAmplitude(MaiorValor, MenorValor, numeroClasses){
	var AmplitudeClasses = (MaiorValor - MenorValor)/numeroClasses; //Descobrindo amplitude de cada classe dada pela forma. Tamanho do conjunto(maiorValor - MenorValor)/numero de classes
	return  AmplitudeClasses; //arredondando para cima
	
}
function CalculandoNumeroClasses(Quantidade){ //funçao onde eh calculada o numero de classes do histograma
	 var quantidadedeclasses  = Math.sqrt(Quantidade); //A quantidade de classes escolhida atravez da raiz quadrada da quantidade de valores aleatorios gerados
	 return Math.ceil(quantidadedeclasses); //o numero classes pode dar um valor decimal, entao por isso eh arredondado para cima
}

function CalculandoMedia(Valores){ //funçao calcular media
	var somador = 0;
	for(i = 0;i <Valores.length;i++){
		somador+=Valores[i];
	}
	return somador/Valores.length;
}

function CalculandoMediana(valores) { //funçao para calcular a mediana

    valores.sort( function(a,b) {return a - b;} );

    var metade = Math.floor(valores.length/2);

    if(valores.length % 2)
        return values[metade];
    else
        return (valores[metade-1] + valores[metade]) / 2.0;
}

function PreenchendoHistograma(Histograma, Valores, MenorValor, numeroClasses, AmplitudeClasses, Menor, Quantidade, Maior){
	var SomaFrequencias = 0; //variavel para ir somando as frequencias para a frequencia acumulada
	var Classe = {
		Bloco: Menor, //o primeiro valor eh feito separado para haver um ponto inicial para as outras
		Frequencia: 0, //frequencia eh calculada no segundo for
		FrequenciaAcumulada: 0 //frequencia eh calculada no segundo for
	}; 
	Histograma.push(Classe); //inserindo uma variavel classe no array
	for(i = 0;i<numeroClasses;i++){
		Classe = new Object(); //gerando novo objeto para inserir no histograma porque usando o mesmo altera o elemento que esta no histograma por causa da referencia 
		Classe.Bloco = Histograma[i].Bloco + AmplitudeClasses; //Bloco recebendo proximo valor pela soma do bloco anterior + amplitude
		Classe.Frequencia = 0; //frequencia eh calculada no segundo for
		FrequenciaAcumulada: 0 //frequencia eh calculada no segundo for
		Histograma.push(Classe); //inserindo uma variavel classe no array
	}
	Classe = new Object(); //Inserindo o ultimo bloco que corresponde ao valor maximo setado poelo usario
		Classe.Bloco = Maior; //Recebendo valor maximo setado pelo usuario
		Classe.Frequencia = 0; //frequencia eh calculada no segundo for
		Histograma.push(Classe);
	
	for(i = 1;i < Histograma.length;i++){ //percorrendo todo o array para calcular as frequencias absoluta e acumulada
		Histograma[i].Frequencia = CalculaFrequencia(Histograma[i-1].Bloco, Histograma[i].Bloco, Valores);  // calculando frequencia absoluta entre o bloco atual e o bloco anterior
		SomaFrequencias += Histograma[i].Frequencia; //mantendo o controle da frequencia acumulada
		Histograma[i].FrequenciaAcumulada = (SomaFrequencias/Quantidade)*100; //Calculando a frequencia acumulada para aquele bloco e inserindo no array
		
	}
	
	
}

function ValidandoEntradas(){
	Menor = document.getElementById("menor").value; //captura da pagina html, o menor valor informado pelo usuario
	Maior = document.getElementById("maior").value; //captura da pagina html, o maior valor informado pelo usuario
	var Provavel = document.getElementById("provavel").value; //captura da pagina html, o valor mais provavel informado pelo usuario
	var Quantidade = document.getElementById("Quantidade").value; //captura da pagina html,q quantidade de simulaçoes a serem realizadas informado pelo usuario
	if(Quantidade <1000){ //decidi que o minimo de valores a ser gerados tem que ser 100. Entoa, se o valor indidcado pelo usuario for menor que 100, 
		Quantidade = 1000; //eh setado altomaticamente o valor 100 
		alert("A quantidade minima de simulacoes eh 1000, sera gerada a simulacao com a quantidade setada para 1000!");
		Quantidade = document.getElementById("Quantidade").value = 1000; //altera o value do campo quantidade no html para 1000
	}
	Menor = parseInt(Menor); //convertendo o valor capturado da pagina de string para inteiro
	Maior = parseInt(Maior); //convertendo o valor capturado da pagina de string para inteiro
	Provavel = parseInt(Provavel); //convertendo o valor capturado da pagina de string para inteiro
	Quantidade = parseInt(Quantidade); //convertendo o valor capturado da pagina de string para inteiro
	if(Menor < Maior && Menor <= Provavel){
		if(Maior > Menor && Maior >= Provavel){
			Simulacao(Menor, Maior, Provavel, Quantidade);
		}else{
			alert("Dados Inseridos de Maneira Incorreta");
		}
	}else{
		alert("Dados Inseridos de Maneira Incorreta");
	}
}

function Simulacao(Menor, Maior, Provavel, Quantidade){
	Histograma = []; //array do tipo classe pq histograma eh uma array com dados do tipo classe
	Valores = [];
	GerarValores(Quantidade, Menor, Maior, Provavel, Valores); //FunÃ§ao que faz a chamada e controle para geraÃ§ao dos valores aleatorios
	var MaiorValor = ValorMaximo(Valores); //recebe o maior valor da lista de valores gerados
	var MenorValor = ValorMinimo(Valores); //recebe o menor valor da lista de valores gerados
	var numeroClasses = CalculandoNumeroClasses(Quantidade);
	
	var AmplitudeClasses = CalculandoAmplitude(MaiorValor, MenorValor, numeroClasses);
	
	PreenchendoHistograma(Histograma, Valores, MenorValor, numeroClasses, AmplitudeClasses, Menor, Quantidade, Maior);
	
	drawChart(Histograma, Maior, Menor);
	simulado = true;
	
	
}

function entre(Maior, Menor, MenorProbalidade, MaiorProbalidade){
	if(MenorProbalidade>=Menor && MenorProbalidade<=Maior && MaiorProbalidade>=Menor && MaiorProbalidade<=Maior){
		return true;
	}else{
		return false;
	}
}

function ValidandoEntradasProbalidade(){
	var MenorProbalidade = document.getElementById("menorProbalidade").value; //captura da pagina html, o menor valor informado pelo usuario
	var MaiorProbalidade = document.getElementById("maiorProbabilidade").value; //captura da pagina html, o maior valor informado pelo usuario
	MenorProbalidade = parseInt(MenorProbalidade); //convertendo o valor capturado da pagina de string para inteiro
	MaiorProbalidade = parseInt(MaiorProbalidade); //convertendo o valor capturado da pagina de string para inteiro
	if(simulado == true){
		if(MenorProbalidade <= MaiorProbalidade){
			if(entre(Maior, Menor, MenorProbalidade, MaiorProbalidade)){ //testar se os valores que vai ser calculada a probalidade estao entre o maior e o menor da simulaçao
				CalculandoProbalidadeEntre(MenorProbalidade, MaiorProbalidade);
			}else{
				alert("Inferior e Superior devem estar entre o Maior e Menor valor da simulacao");
			}
		}else{
			alert("Maior valor deve ser maior que o Menor");
		}
	}else{
		alert("Nenhuma simula&ccedil;&atildeo foi realizada ainda");
	}
}
function CalculaFrequenciaProbalidade(Menor, Maior){ // funçao que calcula a frequencia de um bloco
	var contador = 0; //variavel que conta quantos elementos existe na faixa de valor do bloco
	
	for(j = 0; j < Valores.length;j++){ //percorrendo o array
		if(Valores[j]>= Menor && Valores[j] <= Maior){ // Onde eh comparada o valor, o valor tem q ser maior que o do bloco anterior podendo chegar ate o valor do bloco atual
			contador++; //se o valor esta dentro da faixa correta, eh contabilizado
		}
	}
	
	return contador; //retornando a resposta
}

function CalculandoProbalidadeEntre(Menor, Maior){
	var div = document.getElementById("Resultado");
	var contagem;
	var probalidade;
	contagem = CalculaFrequenciaProbalidade(Menor, Maior);
	probalidade = Math.round((contagem/Valores.length)*100);
	div.innerHTML = "Probalidade de valor entre " + Menor +" e "+ Maior + ": " + probalidade  + "%";
}

google.charts.load("current", {packages:['corechart']});

    function drawChart(Histograma, Maior, Menor) {
        
		var data2 = [["Bloco", "Frequencia Absoluta", "Frequencia Acumulada"]];
             for (i = 1; i < Histograma.length; i++) {
                    data2[i] = [Histograma[i].Bloco, Histograma[i].Frequencia, Histograma[i].FrequenciaAcumulada];  
             }
		
		var data = google.visualization.arrayToDataTable(data2);
	
		
      var view = new google.visualization.DataView(data);
     var Resolucao = {
		Horizontal: window.innerWidth -420,
		Vertical: window.innerHeight * 0.90
	}; 
	 
      var options = {
        title: "Simulacao Monte Carlo",
		 vAxes:[
				{title: 'Frequencia Absoluta' , maxValue: 10}, // Left axis
				{title: 'Frequencia Acumulada' , maxValue: 100} // Right axis
		],
		hAxis: {title: Menor +" |------| "+ Maior  },
        width: Resolucao.Horizontal * 0.97,
		height: Resolucao.Vertical *0.97, 
        series: {0:{type: "bars", targetAxisIndex: 0 },
				1: { type: "line", targetAxisIndex: 1}
		}
			
			
		
	};
      var chart = new google.visualization.ComboChart(document.getElementById("simulacao"));
      chart.draw(view, options);
  }

function SomenteNumero(e){ //Funçao para que nos campos apenas tenham numerais
	var tecla=(window.event)?event.keyCode:e.which; 
	if((tecla>47 && tecla<58)) 
		return true;
	else{
	if (tecla==8 || tecla==0) 
		return true;
	else  
		return false;
 }
}

function adjust_textarea(h) {
    h.style.height = "20px";
    h.style.height = (h.scrollHeight)+"px";
}
 

 
window.onresize = function(){ //funçao que redesenha o grafico na pagina sempre que a mesma sofre um evento de resize(mudança de tamanho)
	if(simulado == true){
		drawChart(Histograma, Maior, Menor);
	}
	
}


