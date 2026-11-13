# Docker for Cypress tests
FROM cypress/browsers:node-20.14.0-chrome-124.0.6367.91-1-ff-125.0.1-edge-124.0.2478.80-1

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project
COPY . .

# Create directories
RUN mkdir -p cypress/videos cypress/screenshots cypress/reports

# Verify Cypress binary
RUN npx cypress verify

# Default command
CMD ["npm", "test"]