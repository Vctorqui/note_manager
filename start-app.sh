#!/bin/bash

# Colores para los mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # Sin color

echo -e "${GREEN}Iniciando configuración de la aplicación...${NC}"

# 1. Navegar a backend y asegurarse de que las dependencias estén instaladas
echo -e "${GREEN}Instalando dependencias del backend...${NC}"
cd backend || exit
if ! npm install; then
    echo -e "${RED}Error instalando dependencias del backend.${NC}"
    exit 1
fi

# 2. Verificar si .env existe
if [ ! -f .env ]; then
    echo -e "${GREEN}Creando archivo .env para el backend...${NC}"
    cat <<EOL >.env
PORT=3001
MONGODB_CONNECTION_URL=mongodb+srv://shared-user:EKJjPpUnuh82wD7y@cluster0.cuwz1.mongodb.net/develop?retryWrites=true&w=majority&appName=Cluster0
FRONTEND_URL=http://localhost:3000
EOL
fi

# 3. Volver al directorio raíz y navegar al frontend
cd ..
echo -e "${GREEN}Instalando dependencias del frontend...${NC}"
cd frontend || exit
if ! npm install; then
    echo -e "${RED}Error instalando dependencias del frontend.${NC}"
    exit 1
fi

# 4. Volver al directorio raíz
cd ..

# 5. Iniciar backend y frontend en paralelo
echo -e "${GREEN}Iniciando servidores del backend y frontend...${NC}"

# Ejecutar ambos servidores en paralelo
gnome-terminal -- bash -c "cd backend && npm run start:dev; exec bash" &
gnome-terminal -- bash -c "cd frontend && npm run dev; exec bash" &

echo -e "${GREEN}Aplicación ejecutándose. Backend en http://localhost:3001 y frontend en http://localhost:3000.${NC}"
