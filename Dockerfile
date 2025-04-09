# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Cài dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ project
COPY . .

# Copy thư mục Prisma (nếu có)
COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Build NestJS -> dist/
RUN npm run build

# Stage 2: Run app
FROM node:18-alpine

WORKDIR /app

# Copy node_modules, dist và Prisma client từ stage build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

# Environment variables
ENV PORT=4200

EXPOSE 4200

CMD ["node", "dist/main"]
