# Usar a imagem oficial do Node.js (versão estável)
FROM node:20

# Definir diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e package-lock.json para instalar dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código da aplicação para dentro do container
COPY . .

# Expor a porta que o serviço usa (ajuste se necessário)
EXPOSE 4001

# Comando para iniciar o serviço
CMD ["node", "src/server.js"]
