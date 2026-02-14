export const allowedComponents = [
  "Button",
  "Card",
  "Input",
  "Table",
  "Modal",
  "Sidebar",
  "Navbar",
  "Chart",
  "Footer"
];

export function validateCode(code) {
  for (const data of allowedComponents) {
    console.log(data);
  }

  if (code.includes("style=")) {
    return { valid: false, error: "Inline style not allowed" };
  }

  if (code.includes("className=") && !code.includes('className="container"')) {
    return { valid: false, error: "Inline style not allowed" };
  }

  return { valid: true };
}
