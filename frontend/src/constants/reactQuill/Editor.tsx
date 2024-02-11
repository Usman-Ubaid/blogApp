import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useCallback, useMemo, useRef } from "react";

type EditorProps = {
  value: string;
  onChange: (content) => void;
};

const Editor = ({ value, onChange }: EditorProps) => {
  const quill = useRef<ReactQuill | null>(null);

  const uploadImageToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    return await fetch(" http://localhost:3001/api/blog/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("Image uploaded successfully:");
        return data;
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files && input.files[0];
      if (file) {
        try {
          const imageUrl = await uploadImageToServer(file);
          const baseUrl = "http://localhost:3001";
          const imgUrl = baseUrl + "/images/" + imageUrl.file.filename;
          onChange(
            (prevValue) =>
              prevValue + `<img  src="${imgUrl}" alt="Uploaded Image">`
          );
        } catch (error) {
          console.error("Error handling image:", error);
        }
      }
    };
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          ["bold", "italic", "underline", "blockquote"],
          [{ color: [] }],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
      clipboard: {
        matchVisual: true,
      },
    }),
    [imageHandler]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
    "clean",
  ];

  return (
    <ReactQuill
      className="text-editor"
      ref={(el) => (quill.current = el)}
      theme="snow"
      value={value}
      formats={formats}
      modules={modules}
      onChange={onChange}
    />
  );
};

export default Editor;
