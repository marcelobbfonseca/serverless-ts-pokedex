"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const serverless_http_1 = __importDefault(require("serverless-http"));
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
app.get("/", (req, res, next) => {
    return res.status(200).json({
        message: "Hello from root!",
    });
});
app.get("/path", (req, res, next) => {
    return res.status(200).json({
        message: "Hello from path!",
    });
});
app.use('/pokedex/:pokemon', async (req, res, next) => {
    const pokemon = req.params.pokemon;
    const response = await axios_1.default.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    return res.status(200).json({
        message: { name: pokemon, data: response.data }
    });
});
app.use((req, res, next) => {
    return res.status(404).json({
        error: "Not Found",
    });
});
exports.handler = (0, serverless_http_1.default)(app);
