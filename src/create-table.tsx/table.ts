const principal: number[][] = [
    [4, 1, 5, 8, 2, 3, 7, 6, 9],
    [1, 8, 2, 6, 3, 4, 5, 9, 7],
    [6, 7, 8, 4, 5, 3, 9, 2, 1],
    [5, 1, 7, 9, 2, 6, 4, 8, 3],
    [6, 7, 5, 1, 9, 2, 8, 3, 4],
    [4, 1, 2, 7, 8, 5, 9, 3, 6],
    [4, 1, 5, 8, 2, 3, 7, 6, 9],
    [1, 8, 2, 6, 3, 4, 5, 9, 7],
    [6, 7, 5, 4, 8, 3, 9, 2, 1]]


let itemSerSubstituido: number = 0;
let itemSerTrocado: number = 0;
let numeroAleatorio: number = 0;
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let classificacaoJogo = 'facil';
const novaMatriz: number[][] = [];
let indicesSeremIgnorados: number[] = [];

/*if (classificacaoJogo === 'facil') {

    principal.map(f => {
        numeros.map(g => {
            f.push(g);
        })

        embaralharArray(f)
        //console.log(f)
    });
}*/


function embaralharArray(array: number[]) {
    return array.sort(() => Math.random() - 0.5);
}

//console.log(principal);


principal.map((linha, index) => {

    if (index != 0) {
        const qtdArrayAnteriores = index;
        const arraysAnteriores = principal.slice(0, qtdArrayAnteriores);
        ;

        linha.map((numero, indexNum) => {
            let indicesSeremIgnorados: number[] = [];

            arraysAnteriores.map(array => {
                //obtendo todos os números dos arrays anteriores a partir do index do array atual (index do número duplicado)
                let indexSameNumber = array.indexOf(numero);
                indicesSeremIgnorados = [...indicesSeremIgnorados, indexSameNumber].filter(indice => indice != -1);
            })

            if (indicesSeremIgnorados.includes(indexNum)) {
                if (indexNum <= 2) {
                    const numerosDisponiveisArrayAtual = linha.slice(3, 9);
                    const indicesDisponiveisArrayAtual: number[] = [];

                    //obtendo o index dos itens disponiveis a partir do index atual até o ultimo
                    numerosDisponiveisArrayAtual.map((numero) => {
                        const indexNumeroarrayAtual = linha.indexOf(numero);
                        indicesDisponiveisArrayAtual.push(indexNumeroarrayAtual);
                    })
                    //filtrando por indices disponiveis
                    if (verificarBloco(indicesSeremIgnorados, index)) {
                        let inndicesNusadosNosArraysAnteriores = verificarBloco(indicesSeremIgnorados, index)?.filter(indice => !indicesSeremIgnorados.includes(indice));
                        let indiceAleatorio = inndicesNusadosNosArraysAnteriores[Math.floor(Math.random() * inndicesNusadosNosArraysAnteriores.length)];

                        //numero (conteudo)
                        itemSerSubstituido = linha[indiceAleatorio];
                        itemSerTrocado = linha[indexNum];
                        //alterando array atual
                        //alterando número da iteração atual
                        linha[indexNum] = itemSerSubstituido;
                        //alterando número aleatório
                        linha[indiceAleatorio] = itemSerTrocado;
                    }

                    /* console.log(
                         {
 
                             'array da iteração': linha,
                             //'index item repetido': indexNum,
                             'valor do item a ser trocado': itemSerTrocado,
                             'valor do item a ser substituido': itemSerSubstituido,
                             'indices utilizados': indicesSeremIgnorados,
                             'indices disponiveis': verificarBloco(indicesSeremIgnorados)
                         }
                     );*/



                } else if (indexNum > 2 && indexNum <= 5) {
                    const numerosDisponiveisArrayAtual = [...linha.slice(5, 8), ...linha.slice(0, 2)];
                    const indicesDisponiveisArrayAtual: number[] = [];


                } else if (indexNum > 5) {
                    const numerosDisponiveisArrayAtual = linha.slice(0, 5);
                    const indicesDisponiveisArrayAtual: number[] = [];

                }

            }
        })
    }


})


function verificarBloco(array: number[], indice: number) {
    let matriz: number[][] = [];

    const indices: number[] = retornarIndice(numeros);

    matriz.push(indices.slice(0, 3))
    matriz.push(indices.slice(3, 6))
    matriz.push(indices.slice(6, 9))


    if (indice === 3 || indice === 6) {
        //setar bloco aleatóriamente
        const indiceAleatorio: number = array[Math.floor(Math.random() * array.length)];
        return indiceAleatorio;
    } else if (array.length >= 3 && indice != 6 && indice != 3) {
        const doisNumerosUtilizados = array.slice((array.length - 2), array.length);
        return doisNumerosUtilizados;
    } else {
        return matriz.find(bloco => !bloco.some(numero => array.includes(numero)));
    }

}
//Só é execultado caso o indice da linha atual não for igual a 3  ou a 6 ou 0
function verificarDuplicidadeBloco(array: number[], numeroAtual: number, indiceLinhaAtual: number, indiceNumeroProxLinha: number, indiceNumeroAtual: number) {
    //matriz de indices
    let matriz: number[][] = [];

    const indices: number[] = retornarIndice(numeros);

    matriz.push(indices.slice(0, 3))
    matriz.push(indices.slice(3, 6))
    matriz.push(indices.slice(6, 9))

    //retornando o bloco de cada numero q está sendo utilizado
    const blocosNumeroIndiceAnteriores = array.map((numero) => {
        return matriz.find(bloco => bloco.includes(numero));
    })
    //bloco que contenha o indice do numero atual
    const blocoNumeroAtual = matriz.find(bloco => bloco.includes(indiceNumeroAtual));
    //caso o indice da linha no bloco seja igual a 2 
    const blocoNumeroProxLinha = matriz.find(bloco => bloco.includes(indiceNumeroProxLinha));
    const blocoAnterior = blocosNumeroIndiceAnteriores[blocosNumeroIndiceAnteriores.length - 1];
    const blocoAnteriorSecond = blocosNumeroIndiceAnteriores[blocosNumeroIndiceAnteriores.length - 2];

    console.log(blocoAnterior, blocoNumeroProxLinha, blocoNumeroAtual);


    if (blocosNumeroIndiceAnteriores.includes(blocoNumeroAtual)) {
        let blocoDisponivel: number[] = [];
        const posicaoLinhaNoBloco = verificarPosicaoLinhaBloco(indiceLinhaAtual);
        if (posicaoLinhaNoBloco === 2) {
            blocoDisponivel = matriz.find(bloco => bloco != blocoAnterior && bloco != blocoNumeroProxLinha) ?? [];
        } else {
            blocoDisponivel = matriz.find(bloco => bloco != blocoAnterior && bloco != blocoAnteriorSecond) ?? [];
        }
    }
    console.log(matriz.find(bloco => bloco != blocoAnterior && bloco != blocoNumeroProxLinha));

}

verificarDuplicidadeBloco([2, 6, 4, 0], 5, 3, 5, 0)
//necessário mandar o array com os indices ultilizados incluindo 3, 6 ou 0 linha

function retornarIndice(array: number[]) {

    let indexNumeroarrayAtual: number[] = [];

    array.forEach((numero) => {
        indexNumeroarrayAtual.push(array.indexOf(numero));
    })
    return indexNumeroarrayAtual;
}

function verificarPosicaoLinhaBloco(indiceLinha: number) {
    if (indiceLinha === 1 || indiceLinha === 4 || indiceLinha === 7) {
        return 2;
    } else {
        return 3;
    }
}