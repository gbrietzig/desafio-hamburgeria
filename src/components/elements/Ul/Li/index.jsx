import { Component } from 'react';

class Li extends Component {

    render() {
        const { className, ...props } = this.props;
        return (
            <li {...props} className={`li li-${className}`} >
                {this.props.children}
            </li>
        );
    }
}

export default Li;