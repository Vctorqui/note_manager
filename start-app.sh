#!/bin/bash

# Colores para mensajes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # Sin color

# Mensaje de inicio
echo -e "${GREEN}Iniciando la configuración de la aplicación...${NC}"

# Variables para rutas
BACKEND_DIR="backend"
FRONTEND_DIR="frontend"

# 1. Verificar si backend existe
if [ -d "$BACKEND_DIR" ]; then
    echo -e "${GREEN}Encontrado el directorio del backend...${NC}"
    cd "$BACKEND_DIR"

    # 2. Verificar si .env existe en el backend
    if [ ! -f .env ]; then
        echo -e "${GREEN}Creando archivo .env para el backend...${NC}"
        cat <<EOL >.env
PORT=3001
MONGODB_CONNECTION_URL=mongodb+srv://shared-user:EKJjPpUnuh82wD7y@cluster0.cuwz1.mongodb.net/develop?retryWrites=true&w=majority&appName=Cluster0
FRONTEND_URL=http://localhost:3000
EOL
        echo -e "${GREEN}Archivo .env creado exitosamente.${NC}"
    fi

    # 3. Instalar dependencias del backend
    echo -e "${GREEN}Instalando dependencias del backend...${NC}"
    yarn install || {
        echo -e "${RED}Error instalando dependencias del backend.${NC}"
        exit 1
    }
    echo -e "${GREEN}Dependencias del backend instaladas correctamente.${NC}"

    # Volver al directorio raíz
    cd ..
else
    echo -e "${RED}Error: El directorio del backend no existe.${NC}"
    exit 1
fi

# 4. Verificar si frontend existe
if [ -d "$FRONTEND_DIR" ]; then
    echo -e "${GREEN}Encontrado el directorio del frontend...${NC}"
    cd "$FRONTEND_DIR"

    # Nota: No se crea un archivo .env por defecto en el frontend.
    echo -e "${GREEN}Instalando dependencias del frontend...${NC}"
    yarn install || {
        echo -e "${RED}Error instalando dependencias del frontend.${NC}"
        exit 1
    }
    echo -e "${GREEN}Dependencias del frontend instaladas correctamente.${NC}"

    # Volver al directorio raíz
    cd ..
else
    echo -e "${RED}Error: El directorio del frontend no existe.${NC}"
    exit 1
fi

# 5. Iniciar backend y frontend
echo -e "${GREEN}Iniciando servidores del backend y frontend...${NC}"

# Iniciar backend en una terminal separada
gnome-terminal -- bash -c "cd $BACKEND_DIR && yarn start:dev; exec bash" || {
    echo -e "${RED}Error iniciando el backend.${NC}"
    exit 1
}

# Iniciar frontend en una terminal separada
gnome-terminal -- bash -c "cd $FRONTEND_DIR && yarn dev; exec bash" || {
    echo -e "${RED}Error iniciando el frontend.${NC}"
    exit 1
}

echo -e "${GREEN}¡Aplicación configurada y en ejecución!${NC}"
