// import './App.css';
import ClickToDraw from './ClickToDraw';

    let total = 52;
    const newCard = () =>{
        total = total - 1;
        console.log("total is: ", total);
        return total;
    };



function App() {
  return (
    <div className="App">
      <button onClick={newCard}>Draw card</button>
      <ClickToDraw  total={total}/>
    </div>
  );
}

export default App;
