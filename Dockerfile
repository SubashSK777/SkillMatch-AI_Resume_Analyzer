FROM node:18-alpine
WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build
RUN npm install -g serve
EXPOSE 7860
CMD ["serve", "-s", "dist", "-l", "7860"]
