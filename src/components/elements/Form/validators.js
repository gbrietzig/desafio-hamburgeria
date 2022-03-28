export const stringValidator = (value) => {
  const errors = []

  if (!value) {
    errors.push('Insira um nome!')
  }
  if (/\d/.test(value)) {
    errors.push('Um nome não pode conter números!')
  }

  return errors
}

export const cardNumberValidator = (value) => {
  const errors = []
  if (!value) {
    errors.push('Insira um dado!')
  }
  if (value.length!==16) {
    errors.push('O cartão de crédito deve conter 16 dígitos!')
  }
  if (parseInt(value) <= 0) {
    errors.push('Insira um valor maior que zero!')
  }
  return errors
}

export const dateValidator = (value) => {
  const errors = []
  if (!value) {
    errors.push('Insira um dado!')
  }
  if (value.length!==6) {
    errors.push('A validade deve conter 6 dígitos no formato MMAAAA!')
  }
  if (parseInt(value) <= 0) {
    errors.push('Insira um valor maior que zero!')
  }
  return errors
}

export const cvvValidator = (value) => {
  const errors = []
  if (!value) {
    errors.push('Insira um dado!')
  }
  if (value.length!==3) {
    errors.push('O CVV deve conter 3 dígitos!')
  }
  if (parseInt(value) <= 0) {
    errors.push('Insira um valor maior que zero!')
  }
  return errors
}

export const cpfValidator = (value) => {
  const errors = []
  if (!value) {
    errors.push('Insira um dado!')
  }
  if (value.length!==11) {
    errors.push('O CPF deve conter 11 dígitos!')
  }
  if (parseInt(value) <= 0) {
    errors.push('Insira um valor maior que zero!')
  }
  return errors
}
