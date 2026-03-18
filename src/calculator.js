/**
 * Calculator module
 *
 * Supported operations:
 * - Addition (add): sum of two or more numbers
 * - Subtraction (subtract): difference between two or more numbers (left-associative)
 * - Multiplication (multiply): product of two or more numbers
 * - Division (divide): quotient of two numbers (throws on division by zero)
 */

function toNumber(n) {
  const num = Number(n);
  if (Number.isNaN(num)) throw new Error(`Invalid number: ${n}`);
  return num;
}

function add(...nums) {
  if (nums.length < 2) throw new Error('add requires at least two numbers');
  return nums.map(toNumber).reduce((a, b) => a + b, 0);
}

function subtract(...nums) {
  if (nums.length < 2) throw new Error('subtract requires at least two numbers');
  const numbers = nums.map(toNumber);
  return numbers.slice(1).reduce((acc, n) => acc - n, numbers[0]);
}

function multiply(...nums) {
  if (nums.length < 2) throw new Error('multiply requires at least two numbers');
  return nums.map(toNumber).reduce((a, b) => a * b, 1);
}

function divide(a, b) {
  const A = toNumber(a);
  const B = toNumber(b);
  if (B === 0) throw new Error('Division by zero');
  return A / B;
}

module.exports = { add, subtract, multiply, divide };
