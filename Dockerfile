# Start from the official Node.js image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package files and install all dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the TypeScript files
RUN npm run build

# Remove dev dependencies after building the code to reduce image size
RUN npm prune --production

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
