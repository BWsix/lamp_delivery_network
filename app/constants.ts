export const PORT = process.env.NEXT_PUBLIC_PORT;
export const BASE_URL = `http://localhost:${PORT}`;
console.assert(PORT, "no PORT");
console.assert(BASE_URL, "noo BASE_URL");
