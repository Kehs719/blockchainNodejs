import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from "../history"

class ConductTransaction extends Component {
    state = { recipient: '', amount: 0 };



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
                <h3>Conduct a Transaction</h3>
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