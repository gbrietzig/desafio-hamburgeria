import { Component } from 'react';
import Header from '../../elements/Header';
import Main from '../../elements/Main';

class Index extends Component {
    render() {
        const {...props } = this.props;
        return (
            <>
                <Header>Monte Seu Sanduíche</Header>
                <Main page="/" {...props} />
            </>
        );
    }
}

export default Index;