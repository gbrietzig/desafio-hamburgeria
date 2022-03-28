import { Component } from 'react';
import Div from '..'
import Text from '../../Text'
import Button from '../../Button'

class Modal extends Component {
    checkCardNumber(props){
        const client = props.returnStateClient()
        if (client['cardNumber']!=='1111111111111111'){
            return true
        }
        else{
            return false
        }
    }

    checkCloseModal(props){
        props.updateStateModal(false)
    }

    rederTitle(props){
        if(this.checkCardNumber(props)){
            return ("Pagamento Aprovado com Sucesso")
        }
        else{
            return ("Pagamento Recusado")
        }
    }

    renderPainel(props){
        if(this.checkCardNumber(props)){
            const client = props.returnStateClient()
            return(
                <Text text={`Muito obrigado pela compra, ${client.name}, ela foi computada no cartão de final ${client.cardNumber.substr(-3)}. Esperamos que tenha um excelente lanche e que possamos vos atender mais vezes!`}/>
            )
        }
        else{
            return(
                <Text text={`Identificamos que você tentou inserir um número de cartão inválido para tentar nos enganar. Calote aqui não!`}/>
            )
        }
    }

    renderButton(props){
        if(this.checkCardNumber(props)){
            console.log(props)
            return(
                <Button className="final" click={props.resetAll} parameter={false}>Ok</Button>
            )
        }
        else{
            return(
                <Button click={props.updateStateModal} parameter={false}>Me Desculpe</Button>
            )
        }
    }

    render() {
        return(
            <Div className="modal">
                <Div className="painel">
                    <Div className="painel-title">
                        <Text text={this.rederTitle(this.props)}/>
                    </Div>
                    <Div className="painel-description">
                        {this.renderPainel(this.props)}
                    </Div>
                    <Div className="painel-button">
                        {this.renderButton(this.props)}
                    </Div>
                </Div>
            </Div>
        )
    }
}

export default Modal