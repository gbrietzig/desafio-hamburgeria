import { Component } from 'react';
import Header from '../../elements/Header';
import Main from '../../elements/Main';

class Perfil extends Component {
    render() {
        return (
            <>
                <Header>Monte Seu Sanduíche</Header>
                <Main page="checkout" />
            </>
        );
    }
}

export default Perfil;