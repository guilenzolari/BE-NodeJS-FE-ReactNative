export class AppError extends Error {
  constructor(message, statusCode = 400) {
    super(message); // Chama o construtor da classe pai (Error) para definir a mensagem de erro
    this.statusCode = statusCode;
    this.isOperational = true; //Marca o erro como operacional não como um bug
  }
}
