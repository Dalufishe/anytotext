export type FileTypeKey = "pdf" | "word" | "excel" | "powerpoint" | "image" | "music" | "web" | "text";

export const fileTypes: Record<FileTypeKey, {
  gradient: string;
  shadow: string;
  labelColor: string;
  borderColor: string;
  label: string;
}> = {
  pdf: {
    gradient: "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 245, 245, 1))", // 紅色漸層
    shadow: "0px 2px 8px rgba(249, 92, 92, 0.25)", // 紅色陰影
    labelColor: "#ff4d4d", // 紅色文字
    borderColor: "rgba(242, 57, 57, 0.4)", // 紅色邊框
    label: "PDF",
  },
  word: {
    gradient: "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(244, 248, 255, 1))", // 藍色漸層
    shadow: "0px 2px 8px rgba(28, 97, 212, 0.25)", // 藍色陰影
    labelColor: "#1c61d4", // 藍色文字
    borderColor: "rgba(28, 97, 212, 0.4)", // 藍色邊框
    label: "WORD",
  },
  excel: {
    gradient: "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(244, 255, 245, 1))", // 綠色漸層
    shadow: "0px 2px 8px rgba(12, 112, 58, 0.25)", // 綠色陰影
    labelColor: "#0c703a", // 綠色文字
    borderColor: "#28a745", // 綠色邊框
    label: "EXCEL",
  },
  powerpoint: {
    gradient: "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 250, 244, 1))", // 橘色漸層
    shadow: "0px 2px 8px rgba(255, 87, 34, 0.25)", // 橘色陰影
    labelColor: "#ff5722", // 橘色文字
    borderColor: "rgba(249, 92, 92, 0.4)", // 橘色邊框
    label: "POWERPOINT",
  },
  image: {
    gradient: "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(255, 251, 244, 1))", // 黃色漸層
    shadow: "0px 2px 8px rgba(216, 161, 43, 0.25)", // 黃色陰影
    labelColor: "#d8a12b", // 黃色文字
    borderColor: "rgba(216, 161, 43, 0.4)", // 黃色邊框
    label: "IMAGE",
  },
  music: {
    gradient: "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(248, 244, 255, 1))", // 紫色漸層
    shadow: "0px 2px 8px rgba(167, 66, 255, 0.25)", // 紫色陰影
    labelColor: "#a742ff", // 紫色文字
    borderColor: "rgba(167, 66, 255, 0.4)", // 紫色邊框
    label: "MUSIC",
  },
  web: {
    gradient: "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(244, 254, 255, 1))", // 青色漸層
    shadow: "0px 2px 8px rgba(43, 181, 216, 0.25)", // 青色陰影
    labelColor: "#2bb5d8", // 青色文字
    borderColor: "rgba(43, 181, 216, 0.4)", // 青色邊框
    label: "WEB",
  },
  text: {
    gradient: "linear-gradient(135deg, rgba(255, 255, 255, 1), rgba(244, 244, 244, 1))", // 灰色漸層
    shadow: "0px 2px 8px rgba(98, 98, 98, 0.25)", // 灰色陰影
    labelColor: "#626262", // 灰色文字
    borderColor: "rgba(170, 170, 170, 0.4)", // 灰色邊框
    label: "TEXT",
  },
};

export const icons: Array<FileTypeKey> = Object.keys(fileTypes) as Array<FileTypeKey>;
