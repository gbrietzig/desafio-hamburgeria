import { Component } from 'react';
import Text from '../Text';

class Button extends Component {
    constructor() {
      super()
      this.handleClick = this.handleClick.bind(this)
    }
  
    handleClick() {
        this.props.click(this.props.parameter)
    }
    
    render() {
        const { className, ...props } = this.props;
        return (
            <button {...props} className={`button button-${className}`} onClick={this.handleClick}>
                <Text text={this.props.children} />
            </button>
        );
    }
}

export default Button;