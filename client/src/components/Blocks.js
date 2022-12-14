import React, { Component } from 'react';
import Block from "./Block";
import { Link } from "react-router-dom";

class Blocks extends Component {
    state = { blocks: [], paginatedId: 1, blocksLength: 0 }

    componentDidMount() {
        fetch(`${document.location.origin}/api/blocks/length`)
            .then(res => res.json())
            .then(json => this.setState({ blocksLength: json }))
        this.fetchPaginatedBlocks(this.state.paginatedId)();
    }
    fetchPaginatedBlocks = paginatedId => () => {
        fetch(`${document.location.origin}/api/blocks/${paginatedId}`)
            .then(res => res.json())
            .then(json => this.setState({ blocks: json }))
    }
    render() {
        return (
            <div>
                <div><Link to="/">Home</Link></div>
                <br />
                <h3>Blocks</h3>
                <div>
                    {
                        [...Array(Math.ceil(this.state.blocksLength / 5)).keys()].map(key => {
                            const paginatedId = key + 1;

                            return (
                                <span key={key} onClick={this.fetchPaginatedBlocks(paginatedId)}>
                                    <button>{paginatedId}</button>{' '}
                                </span>
                            )
                        })
                    }
                </div>
                {this.state.blocks.map(block => {
                    return (
                        <Block key={block.hash} block={block} />
                    );
                })}
            </div>
        )
    }
}
export default Blocks;