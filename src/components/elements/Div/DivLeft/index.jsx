import { Component } from 'react';
import Div from '../../Div';
import Span from '../../Span';
import Ul from '../../Ul';
import Img from '../../Img';

class DivLeft extends Component {
    renderPack(props){
        if (props['page']==='/'){
            return (
                <Ul {...props } module="ingredient"></Ul>
            )
        }
        else if (props['page']==='/checkout'){
            return (
                <>
                    <Span className='section-subtitle'>Resumo do Pedido:</Span>
                    <Ul {...props } module='price'></Ul>
                    <Span className='section-price'>{`Total: ${props['element']['price']}`}</Span>
                </>
            )
        }
    }

    render() {
        const {...props } = this.props;
        return (
            <Div className='left'>
                <Img />
                <Div className="pack-snack">
                    <Div className="section-title">
                        <Span className='section-title'>{props.element['title']}</Span>
                    </Div>
                    <Div className="ingredient">
                        {this.renderPack(props)}
                    </Div>
                </Div>
            </Div>
        );
    }
}

export default DivLeft;