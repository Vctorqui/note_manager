#!/bin/bash

# Colors for messages
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No color

# Log file for errors
LOG_FILE="script_error.log"

# Clear previous log file
>$LOG_FILE

# Start message
echo -e "${GREEN}Starting the application setup...${NC}"

# Directory variables
BACKEND_DIR="backend"
FRONTEND_DIR="frontend"

# 1. Check if backend exists
if [ -d "$BACKEND_DIR" ]; then
    echo -e "${GREEN}Backend directory found...${NC}"
    cd "$BACKEND_DIR"

    # 2. Check if .env exists in the backend
    if [ ! -f .env ]; then
        echo -e "${GREEN}Creating .env file for the backend...${NC}"
        cat <<EOL >.env
PORT=3001
MONGODB_CONNECTION_URL=mongodb+srv://shared-user:EKJjPpUnuh82wD7y@cluster0.cuwz1.mongodb.net/develop?retryWrites=true&w=majority&appName=Cluster0
FRONTEND_URL=http://localhost:3000
EOL
        echo -e "${GREEN}.env file created successfully.${NC}"
    fi

    # 3. Install backend dependencies
    echo -e "${GREEN}Installing backend dependencies...${NC}"
    yarn install >>$LOG_FILE 2>&1 || {
        echo -e "${RED}Error installing backend dependencies. Check ${LOG_FILE} for more details.${NC}"
        exit 1
    }
    echo -e "${GREEN}Backend dependencies installed successfully.${NC}"

    # 4. Start backend in background
    echo -e "${GREEN}Starting backend server on port 3001...${NC}"
    yarn start:dev >>$LOG_FILE 2>&1 &
    BACKEND_PID=$!

    # Return to root directory
    cd ..
else
    echo -e "${RED}Error: Backend directory does not exist.${NC}"
    exit 1
fi

# 5. Check if frontend exists
if [ -d "$FRONTEND_DIR" ]; then
    echo -e "${GREEN}Frontend directory found...${NC}"
    cd "$FRONTEND_DIR"

    # Note: No default .env file is created for the frontend.
    echo -e "${GREEN}Installing frontend dependencies...${NC}"
    yarn install >>$LOG_FILE 2>&1 || {
        echo -e "${RED}Error installing frontend dependencies. Check ${LOG_FILE} for more details.${NC}"
        exit 1
    }
    echo -e "${GREEN}Frontend dependencies installed successfully.${NC}"

    # 6. Start frontend in background
    echo -e "${GREEN}Starting frontend server on port 3000...${NC}"
    yarn dev >>$LOG_FILE 2>&1 &
    FRONTEND_PID=$!

    # Return to root directory
    cd ..
else
    echo -e "${RED}Error: Frontend directory does not exist.${NC}"
    exit 1
fi

echo -e "${GREEN}Application configured and running on ports 3001 (backend) and 3000 (frontend)!${NC}"

# Wait for both processes to finish
wait $BACKEND_PID
wait $FRONTEND_PID
