import os
import hashlib
import time
from flask import Flask, request, jsonify
from flask_cors import CORS
from markitdown import MarkItDown

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
markitdown = MarkItDown()

UPLOAD_FOLDER = "uploads"
OUTPUT_FOLDER = "outputs"

# 確保資料夾存在
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(OUTPUT_FOLDER, exist_ok=True)


def generate_unique_filename(file_stream, filename):
    """
    基於時間戳和檔案內容 MD5 哈希值生成唯一檔案名稱
    """
    # 讀取檔案內容並計算 MD5
    file_stream.seek(0)  # 確保從檔案頭部讀取
    md5_hash = hashlib.md5(file_stream.read()).hexdigest()
    file_stream.seek(0)  # 重置檔案游標

    # 提取原始副檔名
    ext = filename.rsplit(".", 1)[-1].lower()
    timestamp = int(time.time())  # 獲取時間戳

    # 組合新檔案名稱: MD5 哈希 + 時間戳
    unique_filename = f"{md5_hash}_{timestamp}.{ext}"
    return unique_filename


@app.route("/convert", methods=["POST"])
def convert_file():
    try:
        # Check if the request contains a file
        if "file" not in request.files:
            return jsonify({"error": "No file part in the request"}), 400

        file = request.files["file"]

        # Check if a file was uploaded
        if file.filename == "":
            return jsonify({"error": "No selected file"}), 400

        # Validate file extension
        if not file.filename.lower().endswith((".pdf", ".ppt", ".pptx", ".docx", ".xls", ".xlsx")):
            return (
                jsonify(
                    {
                        "error": "Invalid file type. Supported types are PDF, PPT, PPTX, DOCX, XLS, XLSX."
                    }
                ),
                400,
            )

        # 生成唯一檔案名稱
        unique_filename = generate_unique_filename(file.stream, file.filename)

        # 定義上傳和輸出路徑
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
            # Clean up uploaded file if conversion fails
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
