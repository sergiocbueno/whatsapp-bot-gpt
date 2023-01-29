FROM buildkite/puppeteer

# Create application directory
WORKDIR /app

# Copy package json containing app dependencies
COPY package.json ./

# Install app dependencies
RUN npm install

# Copy app configurations
COPY .env ./

# Copy application
COPY src/* ./src/

# Build solution with production mode
RUN npm ci --only=production

# Start application
CMD [ "node", "." ]