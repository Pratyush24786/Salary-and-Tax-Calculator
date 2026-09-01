const currencySymbols = { INR: "₹", USD: "$", GBP: "£", EUR: "€" };

function numberValue(id) {
  return Math.max(0, Number(document.getElementById(id).value) || 0);
}

function money(value, currency = "INR") {
  const locale = currency === "INR" ? "en-IN" : "en-US";
  return new Intl.NumberFormat(locale, { style: "currency", currency, maximumFractionDigits: 0 }).format(value);
}

function updateSalary() {
  const amount = numberValue("salary-amount");
  const period = document.getElementById("salary-period").value;
  const currency = document.getElementById("salary-currency").value;
  const hours = Math.max(1, numberValue("hours-week"));
  const weeks = Math.min(52, Math.max(1, numberValue("weeks-year")));
  const multipliers = { year: 1, month: 12, week: weeks, hour: hours * weeks };
  const annual = amount * multipliers[period];
  document.getElementById("annual-result").textContent = money(annual, currency);
  document.getElementById("monthly-result").textContent = money(annual / 12, currency);
  document.getElementById("weekly-result").textContent = money(annual / weeks, currency);
  document.getElementById("hourly-result").textContent = money(annual / (hours * weeks), currency);
  document.getElementById("salary-currency-label").textContent = currency;
}

function slabTax(income) {
  const slabs = [[400000, 0], [800000, 0.05], [1200000, 0.10], [1600000, 0.15], [2000000, 0.20], [2400000, 0.25], [Infinity, 0.30]];
  let tax = 0;
  let lower = 0;
  for (const [upper, rate] of slabs) {
    tax += Math.max(0, Math.min(income, upper) - lower) * rate;
    lower = upper;
    if (income <= upper) break;
  }
  return tax;
}

function updateTax() {
  const gross = numberValue("gross-income");
  const deductions = numberValue("other-deductions") + (document.getElementById("standard-deduction").checked ? 75000 : 0);
  const taxable = Math.max(0, gross - deductions);
  let incomeTax = slabTax(taxable);
  // FY 2025–26 new-regime rebate: up to ₹60,000 where taxable income is ≤ ₹12 lakh.
  if (taxable <= 1200000) incomeTax = Math.max(0, incomeTax - Math.min(incomeTax, 60000));
  const cess = incomeTax * 0.04;
  const total = incomeTax + cess;
  document.getElementById("tax-result").textContent = money(total);
  document.getElementById("taxable-result").textContent = money(taxable);
  document.getElementById("income-tax-result").textContent = money(incomeTax);
  document.getElementById("monthly-tax-result").textContent = money(total / 12);
  document.getElementById("tax-caption").textContent = total === 0 ? "No estimated tax after the applicable rebate" : "including 4% health & education cess";
}

document.getElementById("salary-form").addEventListener("submit", (event) => { event.preventDefault(); updateSalary(); });
document.getElementById("tax-form").addEventListener("submit", (event) => { event.preventDefault(); updateTax(); });
document.getElementById("salary-currency").addEventListener("change", (event) => { document.getElementById("salary-symbol").textContent = currencySymbols[event.target.value]; updateSalary(); });
document.getElementById("year").textContent = new Date().getFullYear();
updateSalary();
updateTax();
