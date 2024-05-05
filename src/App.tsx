import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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
  function embaralharArray(array: number[]) {
    return array.sort(() => Math.random() - 0.5);
  }
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
          let blocoDisponivel = retornar_Indice(numeros).filter(indNum => !indicesSeremIgnorados.includes(indNum));
          //obter um indice aleatório para setar o numero duplicado em bloco


          let numerosDispo = blocoDisponivel.map(n => {
            const setNum = linha[n];
            let indicesSeremIgnIndAleatorio = obetNumeros_Utilizados_Linhas_Anteriores(arraysAnteriores, setNum).filter(i => i === indexNum);

            if (indicesSeremIgnIndAleatorio.length === 0) {
              return n;
            }
          });
          let indiceAleatorioBloco = numerosDispo[Math.floor(Math.random() * numerosDispo.length)];

          if (indiceAleatorioBloco !== undefined) {
            const numeroAserSubstituido = linha[indexNum];
            const numeroAserutilizado = linha[indiceAleatorioBloco];

            linha[indiceAleatorioBloco] = numeroAserSubstituido;
            linha[indexNum] = numeroAserutilizado;
          }

        }
      })
    }
  })
  console.log(principal)

  // Iteração sobre as linhas da matriz principal
  /*principal.forEach((linha, index, array) => {
      const proximaLinha: number[] = array[index + 1];
   
      // Verifica se não é a primeira linha, a quarta ou a sétima
      if (index != 0 && index != 3 && index != 6 && proximaLinha != undefined) {
          // Iteração sobre os números na linha atual
          linha.forEach((numero, indexNumero) => {
              // Obtém o índice do número na próxima linha
              let indiceNumeroProximaLinha = proximaLinha.indexOf(numero);
              // Copia os arrays anteriores
              arraysAnteriores = principal.slice(0, index);
   
              // Obtém os números utilizados nas linhas anteriores
              indicesSeremIgnorados = obterNumeros_Utilizados_Linhas_Anteriores(arraysAnteriores, numero);
   
              // Verifica a duplicidade de blocos
              verificar_Duplicidade_Bloco(indicesSeremIgnorados, index, indiceNumeroProximaLinha, indexNumero);
   
          })
      }
  })*/

  //Só é execultado caso o indice da linha atual não for igual a 3  ou a 6 ou 0
  /*function verificar_Duplicidade_Bloco(array: number[], indiceLinhaAtual: number, indiceNumeroProxLinha: number, indiceNumeroAtual: number) {
   
      // Retorna o bloco de cada número utilizado anteriormente
      const blocosNumeroIndiceAnteriores: (number[] | undefined)[] = array.map((numero) => {
          return matrizIndices().find(bloco => bloco.includes(numero));
      })
   
      // Encontra o bloco que contém o número atual
      const blocoNumeroAtual = matrizIndices().find(bloco => bloco.includes(indiceNumeroAtual));
   
      let blocoDisponivel: number[] | undefined = [];
      // Imprime na console os blocos relevantes para fins de depuração
      const matrizEmString: string[] = blocosNumeroIndiceAnteriores.map(bloco => JSON.stringify(bloco));
      // Verifica se há duplicidade de blocos
      if (matrizEmString.includes(JSON.stringify(blocoNumeroAtual))) {
   
          // Verifica a posição da linha no bloco
          const posicaoLinhaNoBloco = verificar_Posicao_LinhaBloco(indiceLinhaAtual);
          // Verifica qual bloco está disponível para substituição
          return obtencao_linhas_bloco(posicaoLinhaNoBloco, indiceNumeroProxLinha, blocosNumeroIndiceAnteriores);
      }
   
   
  }*/

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
    let blocoDisponivel: number[] | undefined = [];
    if (posicaoLinha === 2) {
      //retorna as linhas 1 e 3]
      blocoDisponivel = matrizIndices().find(
        bloco => JSON.stringify(bloco) != JSON.stringify(obterBlocoLinhas(matrizIndices(), indiceProxLinha, NmrIndiceAnteriores).blocoAntLinha));
    } else {
      //retorna as linhas 1 e 2
      blocoDisponivel = matrizIndices().find(
        bloco => JSON.stringify(bloco) != JSON.stringify(obterBlocoLinhas(matrizIndices(), indiceProxLinha, NmrIndiceAnteriores).blocoAntLinha)
          &&
          JSON.stringify(bloco) != JSON.stringify(obterBlocoLinhas(matrizIndices(), indiceProxLinha, NmrIndiceAnteriores).blocoMeioLinha));
    }

    return blocoDisponivel;
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
