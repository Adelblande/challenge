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
