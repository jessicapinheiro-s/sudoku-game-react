// Definição da matriz principal que representa o tabuleiro do Sudoku
const principal: number[][] = [
    [4, 1, 5, 8, 2, 3, 7, 6, 9],
    [1, 8, 2, 6, 3, 4, 5, 9, 7],
    [6, 7, 8, 4, 5, 3, 9, 2, 1],
    [5, 1, 7, 9, 2, 6, 4, 8, 3],
    [6, 7, 5, 1, 9, 2, 8, 3, 4],
    [4, 1, 2, 7, 8, 5, 9, 3, 6],
    [4, 1, 5, 8, 2, 3, 7, 6, 9],
    [1, 8, 2, 6, 3, 4, 5, 9, 7],
    [6, 7, 5, 4, 8, 3, 9, 2, 1]
];

// Declaração de variáveis
let itemSerSubstituido: number = 0;
let itemSerTrocado: number = 0;
let numeroAleatorio: number = 0;
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let classificacaoJogo = 'facil';
let novaMatriz: number[][] = [];
let indicesSeremIgnorados: number[] = [];
let arraysAnteriores: number[][] = [];

// Função para embaralhar um array
function embaralharArray(array: number[]) {
    return array.sort(() => Math.random() - 0.5);
}

// Iteração sobre as linhas da matriz principal
principal.map((linha, index) => {

    // Verifica se não é a primeira linha
    if (index != 0) {
        // Obtém a quantidade de arrays anteriores
        const qtdArrayAnteriores = index;
        // Copia os arrays anteriores
        arraysAnteriores = principal.slice(0, qtdArrayAnteriores);


        // Iteração sobre os números na linha atual
        linha.map((numero, indexNum) => {
            // Obtém os números utilizados nas linhas anteriores
            indicesSeremIgnorados = obetNumeros_Utilizados_Linhas_Anteriores(arraysAnteriores, numero);
            // Verifica o bloco a ser utilizado
            const blocoAserUtilizado = verificarBloco(indicesSeremIgnorados, index, indexNum);
            console.log(blocoAserUtilizado)
            // Verifica se o número atual foi utilizado anteriormente
            if (indicesSeremIgnorados.includes(indexNum)) {
                if (indexNum <= 2) {
                    // Lógica para trocar números na mesma linha
                    // Esta parte parece estar incompleta, pois não há ações definidas para indexNum > 2 e indexNum <= 5 e indexNum > 5
                    // Implementação pendente

                } else if (indexNum > 2 && indexNum <= 5) {
                    // Lógica para indexNum > 2 e indexNum <= 5
                    // Implementação pendente

                } else if (indexNum > 5) {
                    // Lógica para indexNum > 5
                    // Implementação pendente

                }

            }
        })
    }


})

// Iteração sobre as linhas da matriz principal
principal.forEach((linha, index, array) => {
    const proximaLinha = array[index + 1];

    // Verifica se não é a primeira linha, a quarta ou a sétima
    if (index != 0 && index != 3 && index != 6) {
        // Iteração sobre os números na linha atual
        linha.forEach((numero, indexNumero) => {
            // Obtém o índice do número na próxima linha
            let indiceNumeroProximaLinha = proximaLinha.indexOf(numero);
            // Copia os arrays anteriores
            arraysAnteriores = principal.slice(0, index);

            // Obtém os números utilizados nas linhas anteriores
            indicesSeremIgnorados = obetNumeros_Utilizados_Linhas_Anteriores(arraysAnteriores, numero)

            // Verifica a duplicidade de blocos
            //verificar_Duplicidade_Bloco(indicesSeremIgnorados, index, indiceNumeroProximaLinha, indexNumero)
        })
    }
})

// Função para verificar o bloco a ser utilizado
function verificarBloco(array: number[], indice: number, indiceNumero: number) {
    // Matriz de índices
    let matriz: number[][] = [];

    // Retorna os índices
    const indices: number[] = retornar_Indice(numeros);

    // Divide os índices em blocos
    matriz.push(indices.slice(0, 3))
    matriz.push(indices.slice(3, 6))
    matriz.push(indices.slice(6, 9))

    const blocoNumeroAtual = matriz.find(bloco => bloco.includes(indiceNumero));
    const blocosDisponiveis = matriz.filter(bloco => bloco != blocoNumeroAtual);

    // Verifica o bloco a ser utilizado
    if (indice === 3 || indice === 6) {
        // Define um bloco aleatoriamente
        const indiceAleatorio: number[] = blocosDisponiveis[Math.floor(Math.random() * blocosDisponiveis.length)];
        console.log('indice Aleatório' + indiceAleatorio);
        return indiceAleatorio;
    } else if (array.length >= 3 && indice != 6 && indice != 3) {
        // Retorna dois números utilizados
        // aqui o bloco disponivel tem que ser retornado de acordo com oq está disponivel dentro do bloco 
        if(verificar_Posicao_LinhaBloco(indice) === 2){

        }else{
            
        }
        const doisNumerosUtilizados = array.slice((array.length - 2), array.length);
        console.log('dois ultimos numeros utilizados' + doisNumerosUtilizados);
        return doisNumerosUtilizados;
    } else {
        // Retorna um bloco que não contenha nenhum número utilizado anteriormente
        console.log('bloco sem nenhum numero utilizado' + matriz.find(bloco => !bloco.some(numero => array.includes(numero))));
        return matriz.find(bloco => !bloco.some(numero => array.includes(numero)));
    }

}
//Só é execultado caso o indice da linha atual não for igual a 3  ou a 6 ou 0
function verificar_Duplicidade_Bloco(array: number[], indiceLinhaAtual: number, indiceNumeroProxLinha: number, indiceNumeroAtual: number) {
    // Matriz de índices que representa o tabuleiro do Sudoku
    let matriz: number[][] = [];

    // Retorna os índices do array de números disponíveis
    const indices: number[] = retornar_Indice(numeros);

    // Divide os índices em blocos de 3x3
    matriz.push(indices.slice(0, 3))
    matriz.push(indices.slice(3, 6))
    matriz.push(indices.slice(6, 9))

    // Retorna o bloco de cada número utilizado anteriormente
    const blocosNumeroIndiceAnteriores = array.map((numero) => {
        return matriz.find(bloco => bloco.includes(numero));
    })

    // Encontra o bloco que contém o número atual
    const blocoNumeroAtual = matriz.find(bloco => bloco.includes(indiceNumeroAtual));

    // Encontra o bloco da próxima linha
    const blocoNumeroProxLinha = matriz.find(bloco => bloco.includes(indiceNumeroProxLinha));

    // Obtém os blocos anteriores
    const blocoAnterior = blocosNumeroIndiceAnteriores[blocosNumeroIndiceAnteriores.length - 1];
    const blocoAnteriorSecond = blocosNumeroIndiceAnteriores[blocosNumeroIndiceAnteriores.length - 2];
    let blocoDisponivel: number[] = [];
    // Imprime na console os blocos relevantes para fins de depuração
    //console.log(blocoAnterior, blocoNumeroProxLinha, blocoNumeroAtual);

    // Verifica se há duplicidade de blocos
    if (blocosNumeroIndiceAnteriores.includes(blocoNumeroAtual)) {
        // Verifica a posição da linha no bloco
        const posicaoLinhaNoBloco = verificar_Posicao_LinhaBloco(indiceLinhaAtual);

        // Verifica qual bloco está disponível para substituição
        if (posicaoLinhaNoBloco === 2) {
            //retorna as linhas 1 e 3
            blocoDisponivel = matriz.find(bloco => bloco != blocoAnterior && bloco != blocoNumeroProxLinha) ?? [];
        } else {
            //retorna as linhas 1 e 2
            blocoDisponivel = matriz.find(bloco => bloco != blocoAnterior && bloco != blocoAnteriorSecond) ?? [];
        }
    }
    // Imprime na console o bloco disponível para fins de depuração
    //console.log(matriz.find(bloco => bloco != blocoAnterior && bloco != blocoNumeroProxLinha));
    return blocoDisponivel;
}

//necessário mandar o array com os indices ultilizados incluindo 3, 6 ou 0 linha

function retornar_Indice(array: number[]) {

    let indexNumeroarrayAtual: number[] = [];

    array.forEach((numero) => {
        indexNumeroarrayAtual.push(array.indexOf(numero));
    })
    return indexNumeroarrayAtual;
}

function verificar_Posicao_LinhaBloco(indiceLinha: number) {
    if (indiceLinha === 1 || indiceLinha === 4 || indiceLinha === 7) {
        return 2;
    } else {
        return 3;
    }
}

function obetNumeros_Utilizados_Linhas_Anteriores(arraysAnt: number[][], numeroAtual: number) {
    let indicesSeremIgnorados = arraysAnt.map(array => array.indexOf(numeroAtual)).filter(indice => indice != -1);
    return indicesSeremIgnorados;
}

