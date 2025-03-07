# Use Node 23
FROM node:23

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY ./ ./
RUN npm install
RUN npx tsc

# Copy source code
COPY . .

# Expose API port
EXPOSE 3000

# Start the server
CMD ["node", "dist/server.js"]
