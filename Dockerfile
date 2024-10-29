# Chọn image Node.js
FROM node:20

# Tạo thư mục làm việc
WORKDIR /usr/src/app

# Sao chép package.json và package-lock.json
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào thư mục làm việc
COPY src/ ./src
COPY .env ./

# Mở cổng mà ứng dụng sẽ lắng nghe
EXPOSE 3000

# Lệnh để chạy ứng dụng
CMD ["node", "src/server.js"]
