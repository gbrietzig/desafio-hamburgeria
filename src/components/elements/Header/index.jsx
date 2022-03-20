import { Component } from 'react';
import Div from '../Div'
import Text from '../Text';

class Header extends Component {

    render() {
        const {...props } = this.props;
        return (
            <header className="header">
                <Div className="header">
                    <h1 className="application title">
                        <Text text={props.children} />
                    </h1>
                </Div>
            </header>
        );
    }
}

export default Header;