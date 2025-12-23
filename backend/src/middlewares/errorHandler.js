import mongoose from 'mongoose';

//middleware para tratar erros de forma centralizada
//captura erros lançados em outras partes do código
//e envia uma resposta padronizada ao cliente
export function errorHandler(err, _req, res, _next) {
  console.error(err);

  let statusCode = err.statusCode || 500; // 500 -> Default para erro interno do servidor
  let message = err.message || 'Internal Server Error';

  if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message) // Extrai as mensagens de erro de validação
      .join(', '); // Junta todas as mensagens em uma única string
  }

  res.status(statusCode).json({
    //retorna o status code e a mensagem de erro
    status: 'error',
    message,
  });
}
