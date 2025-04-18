function outputText () {
  if (document.querySelector('.output3')) {
    document.querySelector('.output3').id = 'output0'
    document.getElementById('output0').classList.remove('output3')
  }

  const vector = document.getElementById('vector').value.split('')
  const argument = parseInt(document.getElementById('argument').value)
  const one = document.getElementById('one')
  const zero = document.getElementById('zero')
  let error = null
  let value
  try {
    value = document.getElementById('vector').value
  } catch (e) {
    error = e
    value.length < 1 ? notyf.error('Вектор не может быть пустым') : null
  }
  if (!error) {
    if (Math.log2(vector.length) % 1 != 0 || vector.length === 1) {
      notyf.error('Длина вектора должен быть степенью 2 и больше 1')
      return
    } else {
      if (!(zero.checked || one.checked)) {
        notyf.open({
          type: 'warning',
          message: 'Необходимо выбрать тип остаточной функции'
        })
        // notyf.warning("Необходимо выбрать тип остаточной функции");
        return
      } else {
        if (!argument) {
          notyf.open({
            type: 'warning',
            message: 'Необходимо ввести номер аргумента'
          })
          // notyf.warning("Необходимо ввести номер аргумента");
          return
        } else {
          if (argument > Math.log2(vector.length)) {
            notyf.error(
              `Номер аргумента не должен превышать количество аргументов текущего вектора - ${Math.log2(
                vector.length
              )}`
            )
            return
          }
        }
      }
    }
    const type = zero.checked ? zero.value : one.value

    const output = getResidual(value, type, argument - 1)
    document.getElementById('output0').textContent = `${
      type == 0 ? 'Нулевая' : 'Еденичная'
    } остаточная по ${argument} аргументу - ${output.join('')}`
  }

  function isBinary (input) {
    const binaryPattern = /^[01]+$/ // Регулярное выражение для проверки на 0 и 1
    return binaryPattern.test(input)
  }
  // Проверка бинарного формата
  if (!isBinary(vector)) {
    notyf.error('Разрешены только 0 и 1')
    return
  }
}

// Функция для вычисления остаточной функции
function getResidual (vector, value, argument) {
  const numVariables = Math.log2(vector.length)
  const newVector = []
  for (let i = 0; i < vector.length; i++) {
    // Преобразуем индекс в двоичное представление
    const binaryString = i.toString(2).padStart(numVariables, '0')
    // Проверяем, соответствует ли значение аргумента типу остаточной функции
    if (parseInt(binaryString[argument]) == value) {
      newVector.push(vector[i])
    }
  }
  return newVector
}
