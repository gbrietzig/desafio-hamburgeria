import { Component } from 'react';
import Header from '../../elements/Header';
import Main from '../../elements/Main';

class Perfil extends Component {
    render() {
        const {...props } = this.props;
        return (
            <>
                <Header>Monte Seu Sanduíche</Header>
                <Main page="/checkout"  {...props}/>
            </>
        );
    }
}

export default Perfil;