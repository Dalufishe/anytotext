export async function uploadPDF(file) {
  const url = process.env.API_ENDPOINT + "/convert";

  if (!file) {
    throw new Error("No file provided");
  }

  const formData = new FormData();
  formData.append("file", file);

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
