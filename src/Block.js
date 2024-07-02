import { Alchemy, Network } from 'alchemy-sdk';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import App from './App'
import './App.css';

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

  function Transactions({ transactions, blockNumber }) {

    return (
        <Router>
            <Switch>
                <Route exact path="/block:blockNumber">
                    <div className='Tx-list'>
                        <div className='Block'>Block: {blockNumber}
                            <div className='Block-info'>Transactions: ({transactions.length})</div>
                                <nav>
                                    <ul className='Scrollable-list'>
                                        {transactions.map((tx, index) => (
                                        <li key={index}>
                                        TO: {tx.to.slice(0,8)}... FROM: {tx.from.slice(0,8)}... AMT: {tx.value > 0 ? Number(tx.value) : "Contract Created"}
                                        </li>
                                    ))}
                                    </ul>
                                </nav>
                            <Link className="Return" to="/">RETURN</Link>
                        </div>;
                    </div>
                </Route>
                <Route path="/"></Route>
            </Switch>
        </Router>
        
    )
        

  }

  export default Transactions; 