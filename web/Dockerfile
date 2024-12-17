# 第一階段：構建 Next.js 應用程式
FROM node:18-alpine AS builder

# 設定工作目錄
WORKDIR /app

# 複製 package.json 和 lock 檔案，安裝依賴
COPY package*.json ./
RUN npm install --frozen-lockfile

# 複製程式碼並建構 Next.js 應用程式
COPY . .
RUN npm run build

# 第二階段：運行 Next.js 應用程式
FROM node:18-alpine

# 設定工作目錄
WORKDIR /app

# 複製構建結果和必要檔案
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# 安裝 production 依賴
RUN npm install --production

# 暴露 Next.js 預設端口
EXPOSE 3000

# 啟動 Next.js 服務
CMD ["npm", "start"]
