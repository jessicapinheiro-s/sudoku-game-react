// Definição da matriz principal que representa o tabuleiro do Sudoku
const principal: number[][] = [
    [6, 1, 3, 8, 9, 4, 7, 5, 2],
    [8, 2, 9, 7, 1, 4, 6, 3, 5],
    [5, 3, 2, 9, 8, 6, 4, 7, 1],
    [6, 7, 3, 1, 5, 9, 8, 4, 2],
    [4, 5, 6, 8, 1, 9, 7, 2, 3],
    [5, 2, 8, 6, 4, 9, 7, 3, 1],
    [9, 2, 8, 4, 1, 6, 5, 3, 7],
    [7, 2, 9, 1, 8, 6, 3, 5, 4],
    [3, 6, 9, 1, 5, 7, 8, 4, 2]
];



/*const principal: number[][] = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    [],
    []
];*/

// Declaração de variáveis
let itemSerSubstituido: number = 0;
let itemSerTrocado: number = 0;
let numeroAleatorio: number = 0;
const numeros: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let classificacaoJogo: string = 'facil';
let novaMatriz: number[][] = [];
/*
if (classificacaoJogo === 'facil') {
 
    principal.map(f => {
        numeros.map(g => {
            f.push(g);
        })
        embaralharArray(f)
    });
}
*/

// Função para embaralhar um array
/*function embaralharArray(array: number[]) {
  return array.sort(() => Math.random() - 0.5);
}*/

const matrizIndices = (): number[][] => {
    // Matriz de índices
    let matriz: number[][] = [];

    // Retorna os índices
    const indices: number[] = retornar_Indice(numeros);

    // Divide os índices em blocos
    matriz.push(indices.slice(0, 3));
    matriz.push(indices.slice(3, 6));
    matriz.push(indices.slice(6, 9));
    return matriz;
}
// Iteração sobre as linhas da matriz principal
principal.map((linha, index) => {
    // Verifica se não é a primeira linha
    let indicePrimeLinha: number = index - 2;
    let indiceProxLinha: number = index + 1;
    let indiceAntLinha: number = index + -1;
    if (index !== 0) {
        // Obtém a quantidade de arrays anteriores
        const qtdArrayAnteriores = index;
        // Copia os arrays anteriores
        const arraysAnteriores = principal.slice(0, qtdArrayAnteriores);

        // Iteração sobre os números na linha atual
        linha.map((numero, indexNum) => {
            // Obtém os números utilizados nas linhas anteriores
            let indicesSeremIgnorados: number[] = obetNumeros_Utilizados_Linhas_Anteriores(arraysAnteriores, numero);

            //let blocoAserUtilizadoDisponivel = verificar_Duplicidade_Bloco(indicesSeremIgnorados, index, indiceNumeroProximaLinha, indexNum);
            if (indicesSeremIgnorados.includes(indexNum)) {
                let nmrDispo = retornar_Indice(numeros).filter(indNum => !indicesSeremIgnorados.includes(indNum));
                //obter um indice aleatório para setar o numero duplicado em bloco

                //se o index for igual a 3 ou 6 o numero a ser trocado [e indicado aleatoriamente]
                if (index === 3 || index === 6) {
                    let numerosDispo: number[] = nmrDispo.map(n => {
                        const setNum = linha[n];

                        let indicesSeremIgnIndAleatorio = obetNumeros_Utilizados_Linhas_Anteriores(arraysAnteriores, setNum).filter(i => i === indexNum);

                        return indicesSeremIgnIndAleatorio.length === 0 ? n : undefined;

                    }).filter(item => item != undefined).map(item => item as number);

                    console.log('numeros sobrando dispo' + numerosDispo);

                    //evita que troque o numero por undefined, quando n tem nenhum numero disponivel para trocar mas isso n quer dizer que tirou o duplicado
                    if (numerosDispo.length != 0) {
                        let indiceAleatorioBloco = numerosDispo[Math.floor(Math.random() * numerosDispo.length)];
                        console.log('index ale numero sobraram' + indiceAleatorioBloco);


                        const numeroAserSubstituido = linha[indexNum];
                        const numeroAserutilizado = linha[indiceAleatorioBloco];

                        linha[indiceAleatorioBloco] = numeroAserSubstituido;
                        linha[indexNum] = numeroAserutilizado;
                    }
                } else {
                    let indNumerosUtBloco: number[] = [];
                    if (verificar_Posicao_LinhaBloco(index) === 2) {
                        indNumerosUtBloco.push(principal[indiceAntLinha]?.indexOf(numero));
                        indNumerosUtBloco.push(principal[indiceProxLinha]?.indexOf(numero));
                    } else {
                        indNumerosUtBloco.push(principal[indicePrimeLinha]?.indexOf(numero));
                        indNumerosUtBloco.push(principal[indiceProxLinha]?.indexOf(numero));
                    }
                }

            }
        })
    }
})

console.log(principal)


function verificarBloco(indicesUltilizados: number[], indicesDisponiveis: number[], indiceNum: number) {

    const blocosNumeroIndiceAnteriores: (number[] | undefined)[] = indicesUltilizados.map((numero) => {
        return matrizIndices().find(bloco => bloco.includes(numero));
    })

    const blocosNumeroIndiceDispo: (number[] | undefined)[] = indicesDisponiveis.map((numero) => {
        return matrizIndices().find(bloco => bloco.includes(numero));
    })

    const blocoNumeroAtual = matrizIndices().find(bloco => bloco.includes(indiceNum));
    const blocoNumeroAtualString = JSON.stringify(matrizIndices().find(bloco => bloco.includes(indiceNum)));

    console.log(blocosNumeroIndiceAnteriores);
    matrizIndices().find(bloco => bloco.some(numero => indicesUltilizados.includes(numero)));

    if (!blocosNumeroIndiceAnteriores.map(bloco => JSON.stringify(bloco)).includes(JSON.stringify(blocoNumeroAtual))) {
        return blocoNumeroAtual;
    } else {
        return matrizIndices().map(blocoIn => JSON.stringify(blocoIn)).filter(b => b !== blocoNumeroAtualString);
    }



}
console.log(matrizIndices().map(blocoIn => JSON.stringify(blocoIn)))



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

    //retirando duplicados do array
    const num = [...new Set(indicesSeremIgnorados)]
    return num;

}

function obterBlocoLinhas(matriz: number[][], indiceProxLinha: number | undefined, blocosNumeLinhasAnt: (number[] | undefined)[]) {
    // Obtém os blocos anteriores
    const blocoAnterior = blocosNumeLinhasAnt[blocosNumeLinhasAnt.length - 1];
    const blocoAnteriorSecond = blocosNumeLinhasAnt[blocosNumeLinhasAnt.length - 2];

    // Encontra o bloco da próxima linha
    if (indiceProxLinha != undefined) {
        const blocoNumeroProxLinha = matriz.find(bloco => bloco.includes(indiceProxLinha));
        const blocoObj = {
            'blocoProxLinha': blocoNumeroProxLinha,
            'blocoAntLinha': blocoAnterior,
            'blocoMeioLinha': blocoAnteriorSecond
        }
        return blocoObj
    } else {
        const blocoObj = {
            'blocoAntLinha': blocoAnterior,
            'blocoMeioLinha': blocoAnteriorSecond
        }
        return blocoObj
    }

}

function obtencao_linhas_bloco(posicaoLinha: number, indiceProxLinha: number, NmrIndiceAnteriores: (number[] | undefined)[]) {
    let nmrDispo: number[] | undefined = [];
    if (posicaoLinha === 2) {
        //retorna as linhas 1 e 3]
        nmrDispo = matrizIndices().find(
            bloco => JSON.stringify(bloco) != JSON.stringify(obterBlocoLinhas(matrizIndices(), indiceProxLinha, NmrIndiceAnteriores).blocoAntLinha));
    } else {
        //retorna as linhas 1 e 2
        nmrDispo = matrizIndices().find(
            bloco => JSON.stringify(bloco) != JSON.stringify(obterBlocoLinhas(matrizIndices(), indiceProxLinha, NmrIndiceAnteriores).blocoAntLinha)
                &&
                JSON.stringify(bloco) != JSON.stringify(obterBlocoLinhas(matrizIndices(), indiceProxLinha, NmrIndiceAnteriores).blocoMeioLinha));
    }

    return nmrDispo;
}
