# 使用官方 Python 3.9 基礎映像
FROM python:3.9-slim

# 設定工作目錄
WORKDIR /app

# 複製 requirements.txt 並安裝依賴
COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

# 複製應用程式程式碼
COPY . .

# 指定 Flask 服務端口
EXPOSE 5000

# 設定環境變數（讓 Flask 運行）
ENV FLASK_APP=app.py
ENV FLASK_RUN_HOST=0.0.0.0
ENV FLASK_ENV=production

# 啟動 Flask 服務
CMD ["flask", "run"]
