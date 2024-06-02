import { table } from 'console';
import React from 'react';
import { Tabela, Celula, Linha } from './table-style'

interface propsArray {
    matriz: number[][]
}

export default function Table({ matriz }: propsArray) {

    return (
        <Tabela>
            {
                matriz?.map((linha, index) => (
                    <Linha key={index} >{linha.map((numero, indexNum,) => (
                        <Celula  key={indexNum}>{numero}</Celula>
                    ))}</Linha>
                ))
            }
        </Tabela>
    )
}

