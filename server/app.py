import os
import hashlib
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from markitdown import MarkItDown
from openai import OpenAI

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

# 確保資料夾存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)

def generate_unique_filename(file_stream, filename):
    """
    基於時間戳和檔案內容 MD5 哈希值生成唯一檔案名稱
    """
    file_stream.seek(0)  # 確保從檔案頭部讀取
    md5_hash = hashlib.md5(file_stream.read()).hexdigest()
    file_stream.seek(0)  # 重置檔案游標
    ext = filename.rsplit(".", 1)[-1].lower()
    timestamp = int(time.time())  # 獲取時間戳
    unique_filename = f"{md5_hash}_{timestamp}.{ext}"
    return unique_filename

def validate_api_key(api_key):
    """
    驗證 API Key 是否有效
    """
    try:
        # 嘗試用 OpenAI API 驗證 API Key
        client = OpenAI(api_key=api_key)
        response = client.models.list()  # 測試列出模型
        if response and "data" in response:
            return True
    except Exception as e:
        print(f"API Key validation failed: {str(e)}")
    return False

@app.route("/convert", methods=["POST"])
def convert_file():
    try:
        # Check if the request contains a file
        if "file" not in request.files:
            return jsonify({"error": "No file part in the request"}), 400
        
        api_key = request.form.get('APIKey')
        print(api_key)
        if api_key != "":
            # Validate the API Key
            # if not validate_api_key(api_key):
            #     return jsonify({"error": "Invalid API Key"}), 401
            # else:
            client = OpenAI(api_key=api_key)
        else:
            client = OpenAI(api_key="")
        markitdown = MarkItDown(llm_client=client, llm_model="gpt-4o")

        file = request.files["file"]
        
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400

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
            return (
                jsonify({"error": f"Failed to convert file: {str(conversion_error)}"}),
                500,
            )

    except KeyError as key_error:
        return jsonify({"error": f"Missing key in request: {str(key_error)}"}), 400

    except IOError as io_error:
        return jsonify({"error": f"File I/O error: {str(io_error)}"}), 500

    except Exception as general_error:
        return (
            jsonify({"error": f"An unexpected error occurred: {str(general_error)}"}),
            500,
        )

if __name__ == "__main__":
    app.run()
