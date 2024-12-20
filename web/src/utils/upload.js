export async function uploadPDF(file,APIKey) {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + "/convert";

  if (!file) {
    throw new Error("No file provided");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("APIKey", APIKey);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An error occurred during the upload");
    }

    const { message, content } = await response.json();
    console.log(message);
    return content;
  } catch (error) {
    console.error("Upload failed:", error.message);
    throw error;
  }
}
