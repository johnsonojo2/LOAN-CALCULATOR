// Listen for submit
document.querySelector("#loan-form").addEventListener("submit", (e) => {
  document.querySelector("#results").style.display = "none";
  document.querySelector("#loading").style.display = "none";
  document.querySelector("#loading").style.display = "block";
  setTimeout(calculateResults, 2000);
  e.preventDefault();
});

//Calculate Results

function calculateResults() {
  const UIamount = document.getElementById("amount");
  const UIinterest = document.getElementById("interest");
  const UIyears = document.getElementById("years");
  const UImonthlyPayments = document.getElementById("monthly-payment");
  const UItotalPayment = document.getElementById("total-payment");
  const UItotalInterest = document.getElementById("total-interest");

  const principal = parseFloat(UIamount.value);
  const calculatedInterest = parseFloat(UIinterest.value) / 100 / 12;
  const calculatedPayments = parseFloat(UIyears.value) * 12;

  //compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    UImonthlyPayments.value = monthly.toFixed(2);
    UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
    UItotalInterest.value = (monthly * calculatedPayments - principal).toFixed(
      2
    );
    document.querySelector("#results").style.display = "block";
    document.querySelector("#loading").style.display = "none";
  } else {
    showError("Please Check Your Numbers");
    document.querySelector("#loading").style.display = "none";
  }
}
function showError(error) {
  const errorDiv = document.createElement("div");
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));
  card.insertBefore(errorDiv, heading);

  setTimeout(() => {
    document.querySelector(".alert").remove();
  }, 3000);
}
