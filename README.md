# AnyToText
**AnyToText** is an online tool that supports direct conversion of various file formats (such as PDF, Word, PPT, images, and more) into text, offering an user-friendly drag-and-drop interface for easy use.

![](/about.png)

## Features
- **Supported File Types:**
  - PDF (.pdf)
  - PowerPoint (.pptx)
  - Word Documents (.docx)
  - Excel Spreadsheets (.xlsx)
  - Images (OCR-based text extraction and EXIF metadata)
  - Audio (Speech transcription and EXIF metadata)
  - HTML (with special handling for Wikipedia and others)
  - Other text-based formats (CSV, JSON, XML, etc.)

- **User-friendly:** Simple drag-and-drop interface.
- **Open-source:** Contributions are welcome.
- **Cross-platform:** Works in modern web browsers.

---


## Getting Started


You can use AnyToText directly online by visiting [AnyToText.com](https://anytotext.com).


### Prerequisites
- Node.js (v18 or later) and npm/yarn for the frontend.
- Python (v3.8 or later) and pip for the backend.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dalufishe/anytotext.git
   cd anytotext
   ```

2. Install dependencies:

   **Frontend:**
   ```bash
   cd frontend
   npm install # or yarn install
   ```

   **Backend:**
   ```bash
   cd backend
   pip install -r requirements.txt
   ```

3. Run the development servers:

   **Frontend:**
   ```bash
   npm run dev
   ```

   **Backend:**
   ```bash
   flask run
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the app.

---

## Contribution Guidelines
We welcome contributions from the community! Here's how you can contribute:

1. **Fork the repository** and clone it locally.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a meaningful commit message"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on the main repository.

### Coding Standards
- Use [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for TypeScript and React code.

---

## Contact
- **Issues & Feedback:** [GitHub Issues](https://github.com/Dalufishe/anytotext/issues)
- **Developers:**
  - [Dalufishe](https://github.com/Dalufishe)
  - [CatTimothy](https://github.com/CatTimothy)
- **Designer:**
  - [2O48](#)

---

## Acknowledgments
- Special thanks to [Microsoft's MarkItDown](https://github.com/microsoft/markitdown) for providing the core file conversion capabilities.
