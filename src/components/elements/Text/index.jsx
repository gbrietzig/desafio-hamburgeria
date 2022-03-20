import { Component } from 'react';

class Text extends Component {

    render() {
        const {...props} = this.props;
        return (
            <>
                {props.text ? props.text : "Falha na renderização, recarregue a página."}
            </>
        );
    }
}

export default Text;