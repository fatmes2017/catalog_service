FROM node:24-slim

WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build if needed
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]

