# PayLens — Salary & Tax Calculator

A static, responsive website with two client-side tools:

- Salary converter for INR, USD, GBP, and EUR
- India income-tax estimate for resident salaried people under the new tax regime for **FY 2025–26 / AY 2026–27**

## Run it

Open `index.html` in a web browser. No build step, API key, server, or database is needed.

## Important tax note

The tax estimator is an educational estimate. It applies the FY 2025–26 new-regime slabs, ₹75,000 standard deduction, Section 87A rebate up to ₹60,000 for taxable income up to ₹12 lakh, and 4% cess. It intentionally does not cover surcharge, capital gains, special-rate income, marginal relief, or every possible eligible deduction. Update `slabTax()` and `updateTax()` in `script.js` whenever tax rules change.
