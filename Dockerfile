# Etapa 1: Definir a imagem base
FROM node:18-alpine as build

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar o package.json e package-lock.json (ou yarn.lock) para instalar as dependências
COPY package.json package-lock.json ./

# Instalar as dependências
RUN npm install

# Copiar o código fonte para o contêiner
COPY . .

# Construir o aplicativo
RUN npm run build

# Etapa 2: Definir a imagem de produção
FROM node:18-alpine as production

# Definir o diretório de trabalho no contêiner
WORKDIR /app

# Copiar apenas os arquivos necessários para a produção (dependências e build)
COPY --from=build /app /app

# Expor a porta em que o Next.js estará ouvindo
EXPOSE 3000

# Iniciar a aplicação com o Next.js
CMD ["npm", "start"]
