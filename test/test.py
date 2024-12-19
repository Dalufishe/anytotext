from markitdown import MarkItDown
from openai import OpenAI

# 傳入 OpenAI 的 API 金鑰
client = OpenAI(
    api_key="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"
)
md = MarkItDown(llm_client=client, llm_model="gpt-4o")

# 進行轉換
result = md.convert("./test/馬來發5.png")
print(result.text_content)
