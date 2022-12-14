import React, { Component } from "react";
import { Link } from 'react-router-dom'
import logo from '../assets/Logo.svg';

class App extends Component {
    state = { walletInfo: {} };
    componentDidMount() {
        fetch(`${document.location.origin}/api/wallet-info`)
            .then(response => response.json())
            .then(json => this.setState({ walletInfo: json }));
    }
    render() {
        const { address, balance } = this.state.walletInfo;
        return (
            <div className="App" >
                <img className="logo" src={logo}></img>
                <div>
                    <h1>Welcome to the Blockchain</h1>
                </div>
                <br />
                <div><Link to="/blocks">Blocks</Link></div>
                <div><Link to="/conduct-transaction">Conduct a transaction</Link></div>
                <div><Link to="/transaction-pool">Transaction-pool</Link></div>
                <br />
                <div className="WalletInfo">
                    <div>Address: {address}</div>
                    <div>Balance: {balance}</div>
                </div>
            </div>
        )
    }
}

export default App;