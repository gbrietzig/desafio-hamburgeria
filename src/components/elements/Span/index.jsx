import { Component } from 'react';
import Text from '../Text';

class Span extends Component {

    render() {
        const { className, ...props } = this.props;
        return (
            <span {...props} className={`span ${className}`} >
                <Text text={this.props.children} />
            </span>
        );
    }
}

export default Span;