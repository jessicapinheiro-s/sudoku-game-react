import styled from 'styled-components';


export const Tabela = styled.table`
    width: 90%;
    border-collapse: collapse;
    border: 1px solid #ddd;
    margin: 0px auto;
    border: 3px solid #8A8A8A;
    border-radius: 10px;
    
    @media (min-width: 500px) {
        width: 600px;
    }

`;

export const Linha = styled.tr`
    line-height: 30px; 
    &:hover{
        background-color: #BDEEFF;
    }
    &:nth-child(3) {
        border-bottom: 2px solid black;
      }
    &:nth-child(6) {
        border-bottom: 2px solid black;
      }
    
`;

export const Celula = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    width: 30px;

    &:hover{
        background-color: #BDEEFF;
    }
    &:nth-child(3) {
        border-right: 2px solid black;
      }
    &:nth-child(6) {
        border-right: 2px solid black;
      }
`;