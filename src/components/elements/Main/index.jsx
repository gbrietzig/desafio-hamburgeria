import { Component } from 'react';
import DivLeft from '../Div/DivLeft';
import DivRight from '../Div/DivRight';
import {sandwich} from '../../../shared/sandwich'
import { Navigate } from 'react-router-dom';

class Header extends Component {
    constructor() {
        super()
        this.state = {
            currentSandwich:{}
        }
        this.selectCurrentIngredient = this.selectCurrentIngredient.bind(this)
        this.checkClick = this.checkClick.bind(this)
        this.confirmIngredient = this.confirmIngredient.bind(this)
    }    

    createStateBase(currentSandwich){
        Object.keys(sandwich).forEach(ingredientKey => {                
            let ingredient=sandwich[ingredientKey]
            let options = ingredient['options']   
            options.map(option => {
                return option['selected']=false
            });            

            currentSandwich[ingredientKey]= {
                'ingredient': ingredient['ingredient'],
                'ingredient_display': ingredient['ingredient_display'],
                'title': ingredient['title'],
                'multiselect': ingredient['multiselect'],
                'options': options,
                'confirmed': false,
            }
        });
        this.setState({ currentSandwich })
        return currentSandwich
    }

    selectCurrentIngredient() {
        let currentSandwich=this.state['currentSandwich']

        if (Object.keys(currentSandwich).length === 0) {
            currentSandwich=this.createStateBase(currentSandwich)
        }
        let noConfirmedElements=[]
        Object.keys(currentSandwich).forEach(ingredientKey=>{
            const ingredient=currentSandwich[ingredientKey]
            if (!ingredient['confirmed']) {
                noConfirmedElements.push(ingredient)
            }
        });
        return {
            'ingredient': noConfirmedElements[0],
            'last': noConfirmedElements.length===1
        }
    }

    checkClick(clickedIngredient){
        let currentSandwich=this.state['currentSandwich']
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
        this.setState({ currentSandwich })
    }

    selectedsOptions(ingredient){
        let currentSandwich=this.state['currentSandwich']
        const currentSandwichKeys = Object.keys(currentSandwich)
        let completeSelectedOptions=[]
        currentSandwichKeys.forEach(currentSandwichKey => {
            const currentIngredient=currentSandwich[currentSandwichKey] //ingrediente atual
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
        let currentSandwich=this.state['currentSandwich']
        const currentIngredient = currentSandwich[confirmedIngredient]
        const selectedsOptions = currentIngredient['options'].filter(selectedOption => {
            return selectedOption['selected']
        })
        if (selectedsOptions.length>0 || currentIngredient['multiselect']){
            currentSandwich[confirmedIngredient]['confirmed']=true
            this.setState({ currentSandwich })
        }
        else (
            // Ou outra validação caso o evento do botão seja chamado mesmo sem ele ser exibido
            window.alert("Insira um ingrediente.")
        )
    }

    render() {
        const {...props } = this.props;
        const currentSandwich=this.setState['sandwich']
        if (props['page']==='index'){
            const current=this.selectCurrentIngredient()
            return (
                <main className='main'>
                    <DivLeft ingredient={current['ingredient']} click={this.checkClick} {...props}/>
                    <DivRight prices={this.selectedsOptions(current['ingredient'])} last={current['last']} click={this.confirmIngredient} {...props}/>
                </main>
            );
        }
        else if (props['page']==='checkout'){
            console.log('checkout')
            console.log(this.state['sandwich'])
            return (
                <DivLeft ingredient={currentSandwich} {...props}/>
            )
        }
    }
}

export default Header;