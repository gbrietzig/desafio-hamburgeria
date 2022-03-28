import { Component } from 'react'
import './style.css'
import Div from '../Div'
import { stringValidator, cardNumberValidator, dateValidator, cvvValidator, cpfValidator } from './validators'
export default class DepositForm extends Component {
  constructor() {
    super()
    this.dirtyComponent = this.dirtyComponent.bind(this)
    this.changeFormValue = this.changeFormValue.bind(this)
  }

  changeFormValue($event) {   
    const props=this.props
    const { id, value } = $event.target    
    const client = props.returnStateClient()
    let errors

    switch(id) {
      case 'name':
        errors = stringValidator(value)
        break
      case 'cardNumber':
        errors = cardNumberValidator(value)
        break
      case 'date':
        errors = dateValidator(value)
        break
      case 'cvv':
        errors = cvvValidator(value)
        break
      case 'cpf':
        errors = cpfValidator(value)
        break
      default:
        errors = []
        break
    }
    client[id] = value
    client.validations[id].errors = errors
    props.updateStateClient(client)
  }

  dirtyComponent($event) {
    const props=this.props
    const { id, value } = $event.target    
    const client = props.returnStateClient()
    let errors

    switch(id) {
      case 'name':
        errors = stringValidator(value)
        break
      case 'cardNumber':
        errors = cardNumberValidator(value)
        break
      case 'date':
        errors = dateValidator(value)
        break
      case 'cvv':
        errors = cvvValidator(value)
        break
      case 'cpf':
        errors = cpfValidator(value)
        break
      default:
        errors = []
        break
    }

    client.validations[id].isDirty = true
    client.validations[id].errors = errors
    props.updateStateClient(client)
  }

  render() {
    const client = this.props.returnStateClient()
    return(
      <>
        <form className="form">
          <fieldset className="fieldset fieldset-name">
            <label className='label label-name' htmlFor="name">Nome:</label>
            <br />
            <input
              className='input input-name'
              type="text"
              placeholder="Seu nome completo"
              name="name"
              id="name"
              value={ client['name'] }
              onChange={ this.changeFormValue }
              onBlur={ this.dirtyComponent }
            />
            <br />
            { client['validations'].name.isDirty && client['validations'].name.errors.map((error, index) =>
              <p key={index} className='error-message'>{ error }</p>
            )}
          </fieldset>
          <fieldset className="fieldset fieldset-cardNumber">
            <label className='label label-card' htmlFor="cardNumber">Número do Cartão:</label>
            <br />
            <input
              className='input input-cardNumber'
              type="number"
              placeholder="Somente números"
              name="cardNumber"
              id="cardNumber"
              value={ client['cardNumber'] }
              onChange={ this.changeFormValue }
              onBlur={ this.dirtyComponent }
            />
            <br />
            { client['validations'].cardNumber.isDirty && client['validations'].cardNumber.errors.map((error, index) =>
              <p key={index} className='error-message'>{ error }</p>
            )}
          </fieldset>
          <Div className="cardData">
            <fieldset className="fieldset fieldset-date">
              <label className='label label-date' htmlFor="date">Data de vencimento:</label>
              <br />
              <input
                className='input input-date'
                type="number"
                placeholder="Somente números"
                name="date"
                id="date"
                value={ client['date'] }
                onChange={ this.changeFormValue }
                onBlur={ this.dirtyComponent }
              />
              <br />
              { client['validations'].date.isDirty && client['validations'].date.errors.map((error, index) =>
                <p key={index} className='error-message'>{ error }</p>
              )}
            </fieldset>
            <fieldset className="fieldset fieldset-cvv">
              <label className='label label-cvv' htmlFor="cvv">CVV:</label>
              <br />
              <input
                className='input input-cvv'
                type="number"
                placeholder="3 dígitos"
                name="cvv"
                id="cvv"
                value={ client['cvv'] }
                onChange={ this.changeFormValue }
                onBlur={ this.dirtyComponent }
              />
              <br />
              { client['validations'].cvv.isDirty && client['validations'].cvv.errors.map((error, index) =>
                <p key={index} className='error-message'>{ error }</p>
              )}
            </fieldset>
          </Div>
          <fieldset className="fieldset fieldset-cpf">
            <label className='label label-cpf' htmlFor="cpf">CPF:</label>
            <br />
            <input
              className='input input-cpf'
              type="number"
              placeholder="Somente números"
              name="cpf"
              id="cpf"
              value={ client['cpf'] }
              onChange={ this.changeFormValue }
              onBlur={ this.dirtyComponent }
            />
            <br />
            { client['validations'].cpf.isDirty && client['validations'].cpf.errors.map((error, index) =>
              <p key={index} className='error-message'>{ error }</p>
            )}
          </fieldset>
        </form>
      </>
    )
  }
}
