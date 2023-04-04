const calculate = (req, res) => {
  const { installmentAmount, interestRate, numberOfYears } = req.body;

  const investmentAmount = installmentAmount * numberOfYears;

  const maturityValue = calcMaturity(
    installmentAmount,
    interestRate,
    numberOfYears
  );

  const interestGained = maturityValue - investmentAmount;

  res.send({ investmentAmount, maturityValue, interestGained });
};

function calcMaturity(installmentAmount, intrestRate, numberOfYears) {
  let i = intrestRate / 100;

  return Math.round((installmentAmount * ((i + 1) ** numberOfYears - 1)) / i);
}

module.exports = {
  calculate,
};
