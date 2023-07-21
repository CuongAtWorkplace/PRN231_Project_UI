import React, {Component} from "react";
import io from 'socket.io-client';

export class TestSocket extends Component {

    constructor(props) {
        super(props);
        this.state = {
            productName: '',
            quantityPerUnit: '',
            unitPrice: ''
        };
        this.socket = io('http://localhost:3000');
    }

    componentDidMount() {
        this.socket.on('product added', (a) => {
            console.log(`New product added: ${a}`);

        });
    }

    componentWillUnmount() {
        this.socket.disconnect();
    }

    HandleAddNew() {

        this.setState({
            productName: "HelloWorld",
        })
        this.socket.emit('add product', this.state.productName);

        console.log(this.state.productName);
    }

    render() {
        return(
            <div>
                <button type="button" onClick={() => this.HandleAddNew()}>Add</button>
            </div>
        )
    }
}