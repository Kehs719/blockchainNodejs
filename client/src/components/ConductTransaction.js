import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from "../history"

class ConductTransaction extends Component {
    state = { recipient: '', amount: 0, knownAddresses: [] };

    componentDidMount() {
        fetch(`${document.location.origin}/api/known-addresses`)
            .then(res => res.json())
            .then(json => this.setState({ knownAddresses: json }));
    }

    updateRecipient = event => {
        this.setState({ recipient: event.target.value });
    }

    updateAmount = event => {
        this.setState({ amount: Number(event.target.value) });
    }

    conductTransaction = () => {
        const { recipient, amount } = this.state;

        fetch(`${document.location.origin}/api/transact`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ recipient, amount })
        }).then(response => response.json())
            .then(json => {
                alert(json.message || json.type);
                history.push('/transaction-pool');
            });
    }

    render() {
        return (
            <div className='ConductTransaction'>
                <Link to='/'>Home</Link>
                <h2>Conduct a Transaction</h2>
                <br />
                <h3>Known addresses</h3>
                {
                    this.state.knownAddresses.map(address => {
                        return (
                            <div key={address}>
                                <p>{address}</p>
                                <br />
                            </div>
                        )
                    })
                }
                <br />
                <div className='formGroup'>
                    <input
                        input='text'
                        placeholder='recipient'
                        value={this.state.recipient}
                        onChange={this.updateRecipient}
                    />
                </div>
                <div className='formGroup'>
                    <input
                        input='number'
                        min="0"
                        placeholder='amount'
                        value={this.state.amount}
                        onChange={this.updateAmount}
                    />
                </div>
                <div>
                    <button className="submit-btn" onClick={this.conductTransaction}>Submit</button>
                </div>
            </div>
        )
    }
};

export default ConductTransaction;