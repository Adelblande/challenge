/**
 * Returns the array of the CustomerSuccess with the most customers
 * @param {Integer} score
 * @param {array} customers
 * @param {Object} csBusy
 */
function distributorByScore(score, customers, csBusy) {
  const keysCsBusy = Object.keys(csBusy);
  const highestScore = keysCsBusy[keysCsBusy.length - 1];
  
  if(highestScore) {
    return customers.filter(customer => customer.score <= score && customer.score > highestScore)
  } else {
    return customers.filter(customer => customer.score <= score)
  }
}

/**
 * Returns the score of the CustomerSuccess
 * @param {Integer} allCsAvailable
 */
function returnsBigger(allCsAvailable) {
  let matriz = [];
  let bigger = 0;
  for(let prop in allCsAvailable) {
    matriz.push({ score: prop, quantity: allCsAvailable[prop].length })
    if(allCsAvailable[prop].length > bigger) {
      bigger = prop;
    }
  }
  
  matriz.sort((obj1, obj2) => {
    return obj1.quantity > obj2.quantity ? -1 : obj1.quantity < obj2.quantity ? 1 : 0;
  });

  if(matriz.length > 0 && matriz[0].quantity === matriz[1].quantity) {
    return 0;
  }
  return bigger;
}

/**
 * Returns boolean
 * @param {array} customerSuccess
 */
function hasDuplicate(customerSuccess) {
  const scoreValues = customerSuccess.map(cs => cs.score);
  
  return new Set(scoreValues).size !== scoreValues.length;
}

/**
 * Returns boolean
 * @param {Integer} qtdMax
 * @param {array} customers
 */
function quantityIsValid(qtdMax, customers) {
  const qtdCs = customers.length

  return qtdCs > 0 && qtdCs < qtdMax;
}
/**
 * Returns boolean
 * @param {Integer} max
 * @param {array} customers
 */
function hasIdInvalid(max, customers) {
  let invalid = 0;
  customers.forEach(cs => {
    if(cs.id < 0 || cs.id > max) {
      invalid++;
    }
  })
  return (invalid > 0);
}

/**
 * Returns boolean
 * @param {Integer} max
 * @param {array} customers
 */
function hasScoreInvalid(max, customers) {
  let invalid = 0;
  customers.forEach(cs => {
    if(cs.score < 0 || cs.score > max) {
      invalid++;
    }
  })
  return (invalid > 0);
}

/**
 * Returns the id of the CustomerSuccess with the most customers
 * @param {array} customerSuccess
 * @param {array} customers
 * @param {array} customerSuccessAway
 */
function customerSuccessBalancing(
  customerSuccess,
  customers,
  customerSuccessAway
) {
  if(!quantityIsValid(1000, customerSuccess)) {
    return "Quantity invalid to customer success.";
  }
  
  if(!quantityIsValid(1000000, customers)) {
    return "Quantity invalid to customers.";
  }

  if(hasIdInvalid(1000, customerSuccess)) {
    return "Id invalid to customer success.";
  }
  
  if(hasIdInvalid(1000000, customers)) {
    return "Id invalid to customers.";
  }
  
  if(hasScoreInvalid(10000, customerSuccess)) {
    return "Score invalid to customer success.";
  }
  
  if(hasScoreInvalid(100000, customers)) {
    return "Score invalid to customers.";
  }

  if(hasDuplicate(customerSuccess)) {
    return "Duplicated score to customer success.";
  }

  let csAvailable = customerSuccess;
  let csAvailableWithCustomers = {};

  if (customerSuccessAway.length > 0) {
    csAvailable = customerSuccess.filter(cs => !customerSuccessAway.includes(cs.id));
  }

  csAvailable.sort((obj1, obj2) => {
    return obj1.score < obj2.score ? -1 : obj1.score > obj2.score ? 1 : 0;
  })
  
  csAvailable.forEach(cs => {
    const costumersByScore = distributorByScore(cs.score, customers, csAvailableWithCustomers);
    csAvailableWithCustomers[cs.score] = costumersByScore;
  })

  const bigger = returnsBigger(csAvailableWithCustomers);
  const result = bigger !== 0 ? csAvailable.find(item => Number(item.score) === Number(bigger)) : 0;
  return !!result ? result.id : 0;
  
}

module.exports = customerSuccessBalancing
