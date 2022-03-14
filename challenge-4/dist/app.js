"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const db_json_1 = __importDefault(require("./db.json"));
const { Router } = express_1.default;
const app = (0, express_1.default)();
const router = Router();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
router.get('/products', (req, res) => {
    res.json(db_json_1.default);
});
router.get('/products/:id', (req, res) => {
    if (!db_json_1.default.find((product) => product.id === +req.params.id))
        res.json({ error: 'product not found' });
    res.json(db_json_1.default.find((product) => product.id === +req.params.id));
});
router.post('/products/:id', (req, res) => {
    db_json_1.default.push(Object.assign(Object.assign({}, req.body), { id: req.params.id }));
    fs_1.default.promises.writeFile('./src/db.json', JSON.stringify(db_json_1.default));
    if (!db_json_1.default.find((product) => product.id === +req.params.id))
        res.json({ error: 'product not found' });
    res.json(req.body);
});
router.put('/products/:id', (req, res) => {
    fs_1.default.promises.writeFile('./src/db.json', JSON.stringify(db_json_1.default.map((product, index) => {
        if (product.id === +req.params.id) {
            product = Object.assign(Object.assign({}, req.body), { id: product.id });
        }
        return product;
    })));
    if (!db_json_1.default.find((product) => product.id === +req.params.id))
        res.json({ error: 'product not found' });
    res.json(req.body);
});
router.delete('/products/:id', (req, res) => {
    fs_1.default.promises.writeFile('./src/db.json', JSON.stringify(db_json_1.default.filter((product) => product.id !== +req.params.id)));
    if (!db_json_1.default.find((product) => product.id === +req.params.id))
        res.json({ error: 'product not found' });
    res.json(req.body);
});
app.use('/api', router);
app.listen(8080, () => {
    console.log('Listening on port 8080...');
});
//# sourceMappingURL=app.js.map