module.exports = class Farmer {
  constructor(name, email, cpf, code) {
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.code = Math.floor(Math.random() * 999999);
  }
};
