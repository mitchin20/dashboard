# Stage 1: Build the application
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript files
RUN npm run build

# Stage 2: Create the production image
FROM node:20-slim

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the builder stage
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist

# Add a new user and switch to that user (for security purposes)
RUN adduser --disabled-password appuser
RUN chown -R appuser:appuser /usr/src/app
USER appuser

# Set environment variables
ENV PORT=8080
EXPOSE 8080

# Health check to ensure server is running
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD curl -f http://localhost:8080/health || exit 1

# Start the server
CMD ["node", "dist/src/server.js"]
