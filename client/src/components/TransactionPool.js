import React, { Component } from 'react';
import Transaction from './Transaction';
import { Link } from 'react-router-dom';
import history from '../history';

const POLL_INTERVALL_MS = 10000;


class TransactionPool extends Component {
    state = { transactionPoolMap: {} };

    fetchTransactionPoolMap = () => {
        fetch(`${document.location.origin}/api/transaction-pool-map`)
            .then(response => response.json())
            .then(json => {
                this.setState({ transactionPoolMap: json })
            });
    }

    fetchMineTransactions = () => {
        fetch(`${document.location.origin}/api/mine-transactions`)
            .then(res => {
                if (res.status === 200) {
                    alert("Success");
                    history.push('/blocks');
                } else {
                    alert('The mine request was not complete');
                }
            })
    }

    componentDidMount() {
        this.fetchTransactionPoolMap();

        this.fetchPoolMapInterval = setInterval(() => this.fetchTransactionPoolMap(), POLL_INTERVALL_MS)
    }

    componentWillUnmount() {
        clearInterval(this.fetchPoolMapInterval);
    }

    render() {
        return (
            <div className='TransactionPool'>
                <div><Link to='/'>Home</Link></div>
                <h3>Transaction Pool</h3>
                {
                    Object.values(this.state.transactionPoolMap).map(transaction => {
                        return (
                            <div key={transaction.id}>
                                <hr />
                                <Transaction transaction={transaction} />
                            </div>
                        )
                    })
                }
                <hr />
                {
                    Object.values(this.state.transactionPoolMap).length > 0 ? (
                        <div>
                            <button onClick={this.fetchMineTransactions}>Mine the Transactions</button>
                        </div>
                    ) : (
                        <div>
                            <p>There are not any transactions to mine</p>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default TransactionPool;