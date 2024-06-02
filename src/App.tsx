import React from 'react';
import logo from './logo.svg';
import './App.css';
import Table from './components/table';


function App() {
  const matrizNum: number[][] = [[1,2,3,4,5,6,7,8,9],[2,3,5,1,6,7,2,5,0],[1,2,3,4,5,6,7,8,9],[2,3,5,1,6,7,2,5,0],[1,2,3,4,5,6,7,8,9],[2,3,5,1,6,7,2,5,0],[1,2,3,4,5,6,7,8,9],[2,3,5,1,6,7,2,5,0],[2,3,5,1,6,7,2,5,0]];
  return (
    <div className="App">
     <Table matriz = {matrizNum}/>
    </div>
  );
}

export default App;
