# Bước 1: Sử dụng image Node.js làm base image
FROM node:16 AS builder

# Bước 2: Tạo thư mục làm việc trong container
WORKDIR /app

# Bước 3: Copy package.json và package-lock.json (hoặc yarn.lock nếu sử dụng yarn)
COPY package*.json ./

# Bước 4: Cài đặt các phụ thuộc
RUN npm install

# Bước 5: Copy toàn bộ mã nguồn vào container
COPY . .

# Bước 6: Build ứng dụng NestJS (biên dịch TypeScript)
RUN npm run build

# Bước 7: Sử dụng một image Node.js khác để chạy ứng dụng trong môi trường sản xuất
FROM node:16-slim

# Bước 8: Tạo thư mục làm việc trong container
WORKDIR /app

# Bước 9: Copy các file cần thiết từ bước build vào container
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Bước 10: Cài đặt lại các phụ thuộc (chỉ cài đặt các phụ thuộc production)
RUN npm install --only=production

# Bước 11: Cấu hình ứng dụng để chạy trong môi trường sản xuất
CMD ["npm", "run", "start:prod"]

# Bước 12: Mở cổng mà ứng dụng sẽ chạy
EXPOSE 3000
