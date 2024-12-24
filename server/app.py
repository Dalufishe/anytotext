import os
import hashlib
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from markitdown import MarkItDown
from openai import OpenAI

app = Flask(__name__)
app.config['MAX_CONTENT_LENGTH'] = 10 * 1024 * 1024  # 16MB
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"
LOG_FOLDER = "logs"
ERROR_LOG_FOLDER = "error_logs"

# 確保資料夾存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)
os.makedirs(LOG_FOLDER, exist_ok=True)
os.makedirs(ERROR_LOG_FOLDER, exist_ok=True)

def generate_unique_filename(file_stream, filename):
    file_stream.seek(0)  # 確保從檔案頭部讀取
    md5_hash = hashlib.md5(file_stream.read()).hexdigest()
    file_stream.seek(0)  # 重置檔案游標
    ext = filename.rsplit(".", 1)[-1].lower()
    timestamp = int(time.time())  # 獲取時間戳
    unique_filename = f"{md5_hash}_{timestamp}.{ext}"
    return unique_filename

def make_logs(filename, file_size):
    # 檔案大小到MB
    file_size_mb = file_size / (1024 * 1024)  # 將檔案大小轉換為 MB
    # 紀錄轉換日誌
    log_filename = time.strftime("%Y-%m-%d") + ".log"
    log_path = os.path.join(LOG_FOLDER, log_filename)
    
    with open(log_path, "a", encoding="utf-8") as log_file:
        log_file.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')} - Filename: {filename}, Size: {file_size_mb:.2f} MB\n")
    return

def log_error(message):
    error_log_path = os.path.join(ERROR_LOG_FOLDER, f"{time.strftime('%Y-%m-%d')}.txt")
    with open(error_log_path, "a", encoding="utf-8") as error_log_file:
        error_log_file.write(f"{time.strftime('%Y-%m-%d %H:%M:%S')} - {message}\n")

@app.route("/convert", methods=["POST"])
def convert_file():
    try:
        # Check if the request contains a file
        if "file" not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        
        api_key = request.form.get('APIKey')

        # 驗證 API Key
        try:
            client = OpenAI(api_key=api_key)
            client.models.list()
        except Exception as api_error:
            log_error(f"Invalid API Key: {str(api_error)}")
            return jsonify({"error": f"Invalid API Key: {str(api_error)}"}), 401

        markitdown = MarkItDown(llm_client=client, llm_model="gpt-4o")

        file = request.files["file"]
        
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400

        # 生成日誌
        make_logs(file.filename, os.fstat(file.stream.fileno()).st_size)

        # 生成唯一檔案名稱
        unique_filename = generate_unique_filename(file.stream, file.filename)
        file_path = os.path.join(UPLOAD_FOLDER, unique_filename)
        output_path = os.path.join(
            OUTPUT_FOLDER, unique_filename.rsplit(".", 1)[0] + ".md"
        )

        # 儲存上傳檔案
        file.save(file_path)

        try:
            # Convert the file to Markdown
            result = markitdown.convert(file_path)

            if not result or not hasattr(result, "text_content"):
                raise ValueError("Conversion failed: No content extracted")

            # Write the Markdown content to a file
            with open(output_path, "w", encoding="utf-8") as output_file:
                output_file.write(result.text_content)

            # Read and return Markdown content
            with open(output_path, "r", encoding="utf-8") as output_file:
                markdown_content = output_file.read()

            # Clean up files after processing
            os.remove(file_path)
            os.remove(output_path)

            return (
                jsonify(
                    {"message": "Conversion successful", "content": markdown_content}
                ),
                200,
            )

        except Exception as conversion_error:
            if os.path.exists(file_path):
                os.remove(file_path)
            log_error(f"Failed to convert file: {str(conversion_error)}")
            return (
                jsonify({"error": f"Failed to convert file: {str(conversion_error)}"}),
                500,
            )

    except KeyError as key_error:
        log_error(f"Missing key in request: {str(key_error)}")
        return jsonify({"error": f"Missing key in request: {str(key_error)}"}), 400

    except IOError as io_error:
        log_error(f"File I/O error: {str(io_error)}")
        return jsonify({"error": f"File I/O error: {str(io_error)}"}), 500

    except Exception as general_error:
        log_error(f"An unexpected error occurred: {str(general_error)}")
        return (
            jsonify({"error": f"An unexpected error occurred: {str(general_error)}"}),
            500,
        )

    except BaseException as base_error:
        log_error(f"A critical error occurred: {str(base_error)}")
        return (
            jsonify({"error": f"A critical error occurred, Please contract Developer"}),
            500,
        )

if __name__ == "__main__":
    app.run()
