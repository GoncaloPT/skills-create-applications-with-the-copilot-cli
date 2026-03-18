#!/usr/bin/env node

/**
 * CLI for the calculator module.
 *
 * Supported operations (as required by the latest issue):
 * - add / +       : Addition (sum of two or more numbers)
 * - subtract / -  : Subtraction (difference between two or more numbers)
 * - multiply / *  : Multiplication (product of two or more numbers)
 * - divide / /    : Division (quotient of two numbers; exact two operands required)
 *
 * Usage examples:
 *   node src/cli.js add 1 2 3
 *   node src/cli.js + 1 2 3
 *   node src/cli.js subtract 10 3
 *   node src/cli.js / 10 2
 */

const calc = require('./calculator');

const OPS = {
  add: 'add', '+': 'add',
  subtract: 'subtract', '-': 'subtract',
  multiply: 'multiply', '*': 'multiply', 'x': 'multiply', 'X': 'multiply',
  divide: 'divide', '/': 'divide'
};

function printUsage() {
  console.log('Usage: node src/cli.js <operation> <num1> <num2> [num3 ...]');
  console.log('Operations: add (+), subtract (-), multiply (*), divide (/)');
  console.log('Examples:');
  console.log('  node src/cli.js add 1 2 3');
  console.log('  node src/cli.js / 10 2');
}

function main(argv) {
  if (argv.length === 0 || ['-h', '--help', 'help'].includes(argv[0])) {
    printUsage();
    return;
  }

  const opRaw = argv[0];
  const op = OPS[opRaw];
  if (!op) {
    console.error('Unknown operation:', opRaw);
    printUsage();
    process.exit(1);
  }

  const args = argv.slice(1);

  try {
    let result;
    switch (op) {
      case 'add':
        result = calc.add(...args);
        break;
      case 'subtract':
        result = calc.subtract(...args);
        break;
      case 'multiply':
        result = calc.multiply(...args);
        break;
      case 'divide':
        if (args.length !== 2) throw new Error('divide requires exactly two numbers');
        result = calc.divide(args[0], args[1]);
        break;
      default:
        throw new Error('Unsupported operation');
    }

    console.log(result);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}
