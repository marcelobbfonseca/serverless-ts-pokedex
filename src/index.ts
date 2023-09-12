import serverless from 'serverless-http';
import { Request, Response, NextFunction } from 'express';
import express from 'express';
import axios from 'axios'
const app = express();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.get("/path", (req: Request, res: Response, next: NextFunction) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use('/pokedex/:pokemon', async (req: Request, res: Response, next: NextFunction) => {
    const pokemon = req.params.pokemon;
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    return res.status(200).json({
        message: { name: pokemon, data: response.data }
    })
})


app.use((req: Request, res: Response, next: NextFunction) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


export const handler = serverless(app);
