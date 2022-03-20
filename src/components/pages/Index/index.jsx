import { Component } from 'react';
// import { Link } from 'react-router-dom';
import Header from '../../elements/Header';
import Main from '../../elements/Main';

class Perfil extends Component {
    render() {
        return (
            <>
                <Header>Monte Seu Sanduíche</Header>
                <Main page="index" />
            </>
        );
    }
}

export default Perfil;