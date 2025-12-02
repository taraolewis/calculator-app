export type Operation = "+" | "-" | "*" | "/" | "%";

export function evaluateOperation(expr: string): number {
  const ops: Operation[] = ["+", "-", "*", "/", "%"];
  let operator: Operation | null = null;

  for (let op of ops) {
    if (expr.includes(op)) {
      operator = op;
      break;
    }
  }

  if (!operator) throw new Error("Invalid expression");

  const [aStr, bStr] = expr.split(operator);
  const a = Number(aStr);
  const b = Number(bStr);

  if (operator === "/" && b === 0) throw new Error("Cannot divide by zero");

  switch (operator) {
    case "+":
      return Math.trunc(a + b);
    case "-":
      return Math.trunc(a - b);
    case "*":
      return Math.trunc(a * b);
    case "/":
      return Math.trunc(a / b);
    case "%":
      return a % b;
    default:
      throw new Error("Unknown operator");
  }
}
