import React, { Component } from 'react';
import Block from "./Block";
import { Link } from "react-router-dom";

class Blocks extends Component {
    state = { blocks: [] }

    componentDidMount() {
        fetch(`${document.location.origin}/api/blocks`)
            .then(res => res.json())
            .then(json => this.setState({ blocks: json }))
    }
    render() {
        return (
            <div>
                <div><Link to="/">Home</Link></div>
                <br />
                <h3>Blocks</h3>
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