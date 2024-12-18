import { CSSProperties } from "react";

export const styles: { [key: string]: CSSProperties } = {
  container: {
    display: "flex",
    height: "100vh",
    backgroundColor: "#f8f8f8",
  },
  main: {
    flex: 4,
    padding: "20px",
    fontFamily: "sans-serif",
  },
  header: {
    marginBottom: "20px",
    textAlign: "center",
  },
  title: {
    display: "flex",
    alignItems: "flex-end", // 垂直方向置底
    justifyContent: "center", // 水平方向置中
    fontSize: "36px",
    fontWeight: "bold",
    marginBottom: "10px",
    gap: "10px", // 文字與圖片間距
  },
  section: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    textAlign: "center",
    marginBottom: "20px",
  },
  section_main: { padding: "10px",paddingBottom:"30px"},
  iconContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
  },
  imgContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90px",
    height: "110px",
    borderRadius: "10px",
    border: "1px solid transparent",
    position: "relative",
  },
  imgIcon: {
    paddingTop: 10,
    width: "64px",
    height: "64px",
    objectFit: "contain",
  },
  iconLabel: {
    fontSize: "12px",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: "8px",
  },
  textInfo: {
    marginBottom: "20px",
  },
  uploadText: {
    fontSize: "16px",
    fontWeight: "bold",
    margin: "0px",
  },
  supportedText: {
    fontSize: "14px",
    color: "#666",
    marginTop: "5px",
  },
  button: {
    padding: "10px 20px",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  uploadButton: {
    backgroundColor: "#007BFF",
    color: "#fff",
  },
  downloadButton: {
    backgroundColor: "#28a745",
    color: "#fff",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: "20px",
  },
  downloadContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },
  article: {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f8f8f8",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  footer: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "14px",
    color: "#999",
  },
};
