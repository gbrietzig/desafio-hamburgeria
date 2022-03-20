import { Component } from 'react';
import Div from '../';
import Span from '../../Span';
import Button from '../../Button'
import Ul from '../../Ul';
import { Link } from 'react-router-dom';

class DivDireita extends Component {

    renderButton(props){
        const selectedOptions=props['prices']['options'].filter(selectedOption => {
            return selectedOption['ingredient']===props['prices']['currentIngredient']
        })
        if (selectedOptions.length>0 || props['prices']['currentMultiselect']){
            if (props['last']){
                return <Link to="/checkout"><Button {...props} className="confirm" parameter="">Prosseguir</Button></Link>
            }
            else {
                return <Button {...props} className="confirm" parameter={props['prices']['currentIngredient']}>Prosseguir</Button>
            }
        }
    }

    render() {
        const {...props } = this.props;
        return (
            <Div className='right'>
                <Span className='ingredients-title'>Ingredientes Selecionados:</Span>
                <Div className='ingredientsList'>
                    <Ul {...props } module='prices'></Ul>
                </Div>
                <Span className='ingredients-price'>{props['prices']['prices']}</Span>
                {this.renderButton(props)}
            </Div>
        );
    }
}

export default DivDireita;