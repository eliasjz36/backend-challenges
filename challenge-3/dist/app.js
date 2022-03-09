"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8080;
const products = [
    {
        name: "elias",
    },
    {
        name: "elias2",
    },
    {
        name: "elias3",
    },
    {
        name: "elias4",
    },
];
app.get("/products", (req, res) => {
    res.send(products);
});
app.get("/randomProduct", (req, res) => {
    const randomNumber = Math.floor(Math.random() * 3);
    res.send(products[randomNumber]);
});
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map