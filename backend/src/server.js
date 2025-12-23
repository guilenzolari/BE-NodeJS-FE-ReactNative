import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import { connectDB } from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';

dotenv.config(); //Carrega variáveis do .env
connectDB();

const app = express(); //Cria a aplicação Express

// cors controla quem pode acessar a sua API.
// Por padrão, o navegador bloqueia requisições feitas de domínios diferentes (por exemplo, seu front-end hospedado em outro servidor).
// O cors() libera esse acesso, permitindo que seu site (frontend) consiga consumir a API sem erro.
app.use(cors());
app.use(express.json());

app.use('/users', userRoutes);

// Rota base
app.get('/', (req, res) => {
  res.send('🚀 API is running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// error handler SEMPRE por último (Tudo que pode gerar erro → vem antes do errorHandler)
app.use(errorHandler);

//SE NADA DER ERRO:
// Request
//  ↓
// cors()
//  ↓
// express.json()
//  ↓
// /users → userRoutes
//  ↓
// controller
//  ↓
// (res.json)

//SE DER ERRO EM ALGUM LUGAR:
// Request
//  ↓
// cors
//  ↓
// express.json
//  ↓
// /users
//  ↓
// 💥 ERRO
//  ↓
// errorHandler
//  ↓
// Response de erro
