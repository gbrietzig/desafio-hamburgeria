import { Component } from 'react';
import DivLeft from '../Div/DivLeft';
import DivRight from '../Div/DivRight';
import {Navigate} from 'react-router-dom';
import Modal from '../Div/Modal'

class Main extends Component {
    constructor() {
        super()
        this.checkClick = this.checkClick.bind(this)
        this.confirmIngredient = this.confirmIngredient.bind(this)
        this.checkCheckout = this.checkCheckout.bind(this)
    }
    
    selectCurrentIngredient() {
        const {...props } = this.props;
        let currentSandwich=props.returnStateBase()
        let noConfirmedElements=[]
        Object.keys(currentSandwich).forEach(ingredientKey=>{
            const ingredient=currentSandwich[ingredientKey]
            if (!ingredient['confirmed']) {
                noConfirmedElements.push(ingredient)
            }
        });
        return noConfirmedElements[0]
    }

    checkClick(clickedIngredient){
        const {...props } = this.props;
        let currentSandwich=props.returnStateBase()
        let currentIngredient=currentSandwich[clickedIngredient['ingredient']]
        if (currentIngredient['options'][clickedIngredient['index']]['selected'])
        {
            currentIngredient['options'][clickedIngredient['index']]['selected']=false
        }
        else {
            if(!currentIngredient['multiselect']){
                let selectedsOptionsIndex=[]
                currentIngredient['options'].forEach((option, index) => {
                    if(option['selected']){
                        selectedsOptionsIndex.push(index)
                    }
                });
                selectedsOptionsIndex.forEach((selectedOptionIndex) => {
                    currentIngredient['options'][selectedOptionIndex]['selected']=false
                });
            }
            currentIngredient['options'][clickedIngredient['index']]['selected']=true            
        }
        currentSandwich[clickedIngredient['ingredient']]=currentIngredient
        props.updateStateBase(currentSandwich)
    }

    selectedsOptions(ingredient){
        const {...props } = this.props;
        let currentSandwich=props.returnStateBase()
        const currentSandwichKeys = Object.keys(currentSandwich)
        let completeSelectedOptions=[]
        currentSandwichKeys.forEach(currentSandwichKey => {
            const currentIngredient=currentSandwich[currentSandwichKey]
            let selectedOptions=currentIngredient['options'].filter(currentIngredientOption => {
                return currentIngredientOption['selected']
            });
            selectedOptions=selectedOptions.map(selectedOption => {
                selectedOption['ingredient']=currentIngredient['ingredient']
                selectedOption['ingredient_display']=currentIngredient['ingredient_display']
                return selectedOption
            })
            completeSelectedOptions=completeSelectedOptions.concat(selectedOptions)   
        });
        const finalOptionsSelecteds={
            'options': completeSelectedOptions
        }
        finalOptionsSelecteds['prices'] = this.sumPrices(finalOptionsSelecteds['options'])
        finalOptionsSelecteds['currentIngredient'] = ingredient['ingredient']
        finalOptionsSelecteds['currentMultiselect'] = ingredient['multiselect']
        return finalOptionsSelecteds
    }

    sumPrices(selectedIngredients){
        let sum=0
        selectedIngredients.forEach(selectedIngredient=>{
            sum=sum+selectedIngredient['price']
        })        
        return (sum/100).toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
    }

    confirmIngredient(confirmedIngredient){
        const {...props } = this.props;
        let currentSandwich=props.returnStateBase()
        const currentIngredient = currentSandwich[confirmedIngredient]
        const selectedsOptions = currentIngredient['options'].filter(selectedOption => {
            return selectedOption['selected']
        })
        if (selectedsOptions.length>0 || currentIngredient['multiselect']){
            currentSandwich[confirmedIngredient]['confirmed']=true
            props.updateStateBase(currentSandwich)
        }
        else (
            // Ou outra validação caso o evento do botão seja chamado mesmo sem ele ser exibido
            window.alert("Insira um ingrediente.")
        )
    }

    checkCheckout(){
        const client= this.props.returnStateClient()
        const validations = client.validations
        let errors = []
        const validationsKeys=Object.keys(validations)

        validationsKeys.forEach(validationsKey => {
            const validation=validations[validationsKey]
            errors = [...errors, ...validation['errors']]
        })

        // if (client['name']===""||client['cardNumber']===""||client['date']===""||client['cvv']===""||client['cpf']===""){
        //     window.alert("Preencha todos os campos.")
        // }
        // else if (errors.length>0){
        //     window.alert("Corrija os campos indicados.")
        // }
        // else{
        //     this.props.updateStateModal(true)
        // }
        this.props.updateStateModal(true)
    }

    renderMain(props, ingredient){
        if (props['page']==='/'){
            return (
                <>
                    <DivLeft element={ingredient} click={this.checkClick} {...props}/>
                    <DivRight element={this.selectedsOptions(ingredient)} click={this.confirmIngredient} {...props}/>
                </>
            )
        }
        else if (props['page']==='/checkout'){
            let currentSandwich=props.returnStateBase()

            const currentSandwichKeys=Object.keys(currentSandwich)
            const selectedsOptions=[]
            currentSandwichKeys.forEach(currentSandwichKey => {
                const currentIngredient=currentSandwich[currentSandwichKey]
                currentIngredient['options'].forEach(selectedOption => {
                    if(selectedOption['selected']){
                        selectedsOptions.push(selectedOption)
                    }
                })
                
            });
            const final_price=this.sumPrices(selectedsOptions)
            const element={
                'title': 'Obrigado pela Preferência!',
                'title-right': 'Insira os dados do pagamento:',
                'price': final_price,
                'options': selectedsOptions
            }

            return (
                <>
                    <DivLeft element={element} click={this.checkClick} {...props}/>
                    <DivRight element={element} click={this.checkCheckout} {...props}/>
                    {props.returnStateModal()?<Modal {...props} />:""}
                </>
            )
        }
        
    }

    render() {
        const {...props } = this.props;
        const ingredient=this.selectCurrentIngredient()
        const destination = ingredient?'/':'/checkout'
        if (props['page']===destination){
            return (
                <main className='main'>
                    {this.renderMain(props, ingredient)}
                </main>
            );
        }
        else {
            return (<Navigate to={destination} />)
        }
    }
}

export default Main;