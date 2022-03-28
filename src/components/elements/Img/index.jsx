import { Component } from 'react';
import Div from '../Div';

import logo from '../../../assets/img/sandwich.svg';

class Img extends Component {    
    render() {
        return (
            <Div className="image">
                <img className="img" src={logo} alt='imagem' />
            </Div>
        );
    }
}

export default Img;