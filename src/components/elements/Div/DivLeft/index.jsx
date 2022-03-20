import { Component } from 'react';
import logo from '../../../../assets/img/sandwich.svg';
import Div from '../../Div';
import Span from '../../Span';
import Ul from '../../Ul';

class DivLeft extends Component {
    render() {
        const {...props } = this.props;
        if (props['page']==='index'){
            return (
                <Div className='left'>        
                    <Div className="image">
                        <img src={logo} alt='imagem' />
                    </Div>
                    <Div className="pack-snack">
                        <Div className="section-title">
                            <Span className='section-title'>{props.ingredient['title']}</Span>
                        </Div>
                        <Div className="ingredient">
                            <Ul {...props } module="ingredient"></Ul>
                        </Div>
                    </Div>
                </Div>
            );
        }
        else if (props['page']==='checkout'){
            return (
                <>Checkout</>
            )
        }
    }
}

export default DivLeft;