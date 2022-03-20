import { Component } from 'react';
import Li from './Li';
import Button from '../Button';
import Span from '../Span';

class Ul extends Component {
    elementList(props, element, index){
        if (props.module==='ingredient'){
            const optionIngredient={
                'ingredient': props[props.module][props.module],
                'index': index
            }
            return (
                <Button {...props} className={`option${element['selected']?" activate": ""}`} parameter={optionIngredient}>{element['name']}</Button>
            )
        }
        else if (props.module==='prices'){         
            return (
                <Span {...props} className='option'>{`${element['ingredient_display']}: ${element['name']}`}</Span>            
            )
        }
    }

    render() {
        const {...props} = this.props
        const content= props[props.module]['options']
        return (
            <ul {...props} className={`ul ul-${props.module}`} >
                {
                    content.map((element, index) =>{
                        return(                            
                            <Li key={`${props.module}_option_li_${index}`} className='ingredient'>
                                {this.elementList(props, element, index)}
                            </Li>
                        ) 
                    })
                }
            </ul>
        );
    }
}

export default Ul;