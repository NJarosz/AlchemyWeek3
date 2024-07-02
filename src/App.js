import { Alchemy, Network } from 'alchemy-sdk';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Transactions from './Block';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);


function App() {
  const [blockNumber, setBlockNumber] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [miner, setMiner] = useState("");
  const [hash, setHash] = useState("...");
  const [gas, setGas] = useState("...");

  async function getBlockNumber() {
    setBlockNumber(await alchemy.core.getBlockNumber());
  }

  useEffect(() => {
    getBlockNumber();
  }, []);

  useEffect(() => {
    async function getBlockInfo() {
      if (blockNumber > 1) {
        let response = await alchemy.core.getBlockWithTransactions(blockNumber);
        setTransactions(response.transactions);
        setMiner(response.miner);
        setHash(response.hash);
        setGas(response.gasUsed._hex);
      }
    }
  
    getBlockInfo()
  }, [blockNumber]);
  

  function previousBlock() {
    if (blockNumber > 1) {
      setBlockNumber((prevBlockNumber) => prevBlockNumber - 1);
    } 
  }
  async function nextBlock() {
    const block = await alchemy.core.getBlockNumber()
    if (blockNumber !== block) {
      setBlockNumber((prevBlockNumber) => prevBlockNumber + 1);
    }
  }
  

  return (
  <Router>
    <Switch>
      <Route exact path="/">
        <div className="App">
          <div className="Block">
            <p>
              Block Number: 
              <Link className="Block-link" to={`/block${blockNumber}`}> {blockNumber} </Link>
            </p>
            <div><span className="Block-label">TX COUNT: </span><span className='Block-info'>{transactions?.length}</span></div>
            <div><span className="Block-label">MINER: </span><span className='Block-info'>{miner?.slice(0,9)}...</span></div>
            <div><span className="Block-label">BLOCK HASH: </span><span className="Block-info">{hash?.slice(0,6)}...{hash?.slice(-5)}</span></div>
            <div><span className="Block-label">GAS USED: </span><span className="Block-info">{Number(gas)}</span></div>
            <div>
              <button className='Block-button' onClick={previousBlock}>Prev Block</button>
              <button className='Block-button' onClick={getBlockNumber}>Refresh</button>
              <button className='Block-button' onClick={nextBlock}>Next Block</button>
            </div>
          </div>
        </div>;
        </Route>
        <Route path="/block:blockNumber">
          <Transactions
            transactions={transactions}
            blockNumber={blockNumber}
          />
      </Route>
    </Switch>
  </Router>
);
}


export default App;
