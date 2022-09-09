FROM node:18-alpine

WORKDIR /app

COPY package.json tsconfig.json ./

# Create empty src. 
RUN mkdir src && touch src/index.ts

RUN npm install

CMD ["npm", "run", "build-container"]