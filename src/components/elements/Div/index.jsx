import { Component } from 'react';

class Div extends Component {

    render() {
        const { className, ...props } = this.props;
        return (
            <div {...props} className={`div div-${className}`} >
            </div>
        );
    }
}

export default Div;