import { Component } from 'react';
import Div from '../';
import Span from '../../Span';
import Button from '../../Button'
import Ul from '../../Ul';
import Form from '../../Form'

class DivRight extends Component {

    renderButton(props){
        if (props['page']==='/'){
            return (
                <Button {...props} className="confirm" parameter={props['element']['currentIngredient']}>
                    Prosseguir
                </Button>
            )
        }
        else if (props['page']==='/checkout'){
            return (
                <Button {...props} className="pay" parameter={this.state}>
                    Pagar
                </Button>
            )
        }
    }

    renderTopArea(props){
        if (props['page']==='/'){
            return (
                <>
                    <Div className='ingredients-list'>
                        <Ul {...props } module='prices'></Ul>
                    </Div>
                </>
            )
        }
        else if (props['page']==='/checkout'){
            return (
                <>
                    <Div className='form'>
                        <Form {...props}/>
                    </Div>
                </>
            )
        }
    }

    renderBottomArea(props){
        if (props['page']==='/'){
            return (
                <>
                    <Div className='ingredients-price'>
                        <Span className='ingredients-price'>{props['element']['prices']}</Span>
                    </Div>
                    <Div className='ingredients-button'>
                        {this.renderButton(props)}
                    </Div>
                </>
            )
        }
        else if (props['page']==='/checkout'){
            return (
                <>
                    <Div className='pay-button'>
                        {this.renderButton(props)}
                    </Div>
                </>
            )
        }
    }

    renderDiv(props){
        return (
            <>                    
                <Div className='top-area'>
                    <Div className='ingredients-title'>
                        <Span className='ingredients-title'>{props['element']['title-right']||'Ingredientes Selecionados:'}</Span>
                    </Div>
                    {this.renderTopArea(props)}
                </Div>
                <Div className='bottom-area'>
                    {this.renderBottomArea(props)}
                </Div>
            </>
        )
    }

    render() {
        const {...props } = this.props;
        return (
            <Div className='right'>
                {this.renderDiv(props)}
            </Div>
        );
    }
}

export default DivRight;