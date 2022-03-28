import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from "./components/pages/Index";
import Checkout from "./components/pages/Checkout";
import NotFound from './components/pages/NotFound';

import {sandwich} from './shared/sandwich'

class RootRouters extends Component {
    constructor() {
        super()
        this.state = {
            currentSandwich:this.createStateBase(),
            modalIsOpen:false,
            client:{
                name: '',
                cardNumber: '',
                date: '',
                cvv: '',
                cpf: '',
                validations: {
                  name: {
                    isDirty: false,
                    errors: []
                  },
                  cardNumber: {
                    isDirty: false,
                    errors: []
                  },
                  date: {
                    isDirty: false,
                    errors: []
                  },
                  cvv: {
                    isDirty: false,
                    errors: []
                  },
                  cpf: {
                    isDirty: false,
                    errors: []
                  }
                }
            }
        }
        this.updateStateBase = this.updateStateBase.bind(this)
        this.returnStateBase = this.returnStateBase.bind(this)
        this.updateStateModal = this.updateStateModal.bind(this)
        this.returnStateModal = this.returnStateModal.bind(this)
        this.updateStateClient = this.updateStateClient.bind(this)
        this.returnStateClient = this.returnStateClient.bind(this)
        this.resetAll = this.resetAll.bind(this)
    }

    resetAll(){
        this.updateStateBase(this.createStateBase())
        
        this.updateStateModal(false)

        const client={
            name: '',
            cardNumber: '',
            date: '',
            cvv: '',
            cpf: '',
            validations: {
                name: {
                    isDirty: false,
                    errors: []
                },
                cardNumber: {
                    isDirty: false,
                    errors: []
                },
                date: {
                    isDirty: false,
                    errors: []
                },
                cvv: {
                    isDirty: false,
                    errors: []
                },
                cpf: {
                    isDirty: false,
                    errors: []
                }
            }
            
        }
        this.updateStateClient(client)

    }

    createStateBase(){
        let currentSandwich = {}
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
        return currentSandwich
    }

    updateStateBase(currentSandwich){
        this.setState({ currentSandwich })
    }

    returnStateBase(){
        return this.state['currentSandwich']
    }

    updateStateModal(modalIsOpen){
        this.setState({ modalIsOpen })
    }

    returnStateModal(){
        return this.state['modalIsOpen']
    }

    updateStateClient(client){
        this.setState({ client })
    }

    returnStateClient(){
        return this.state['client']
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" 
                            element={
                                <Index 
                                    updateStateBase={this.updateStateBase} 
                                    returnStateBase={this.returnStateBase}
                                />
                            }
                        />
                        <Route path="/checkout" 
                            element={
                                <Checkout 
                                    updateStateBase={this.updateStateBase} 
                                    returnStateBase={this.returnStateBase}
                                    updateStateModal={this.updateStateModal} 
                                    returnStateModal={this.returnStateModal}
                                    updateStateClient={this.updateStateClient} 
                                    returnStateClient={this.returnStateClient}
                                    resetAll={this.resetAll}
                                />
                            } 
                        />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}

export default RootRouters;