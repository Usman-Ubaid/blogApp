import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import { useCallback, useMemo, useRef } from "react";
import { uploadImageToServerApi } from "../../services/api/uploadImage";

type EditorProps = {
  value: string;
  onChange: (content: string) => void;
};

const Editor = ({ value, onChange }: EditorProps) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const uploadImageToServer = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await uploadImageToServerApi(formData);
    return response;
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
          const results = await uploadImageToServer(file);
          const range = quillRef.current?.getEditor().getSelection();
          if (range) {
            quillRef.current
              ?.getEditor()
              .insertEmbed(range?.index, "image", results.file.imageUrl);
          }
        } catch (error) {
          console.error("Error handling image:", error);
        }
      }
    };
  }, []);

  // const deleteImageHandler = useCallback(() => {
  //   const selection = quillRef.current?.getEditor().getSelection();
  //   if (selection) {
  //     const index = selection.index;
  //     const length = selection.length;
  //     quillRef.current?.getEditor().deleteText(index, length);
  //   }
  // }, []);

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
          // deleteImage: deleteImageHandler,
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
      ref={(el) => (quillRef.current = el)}
      theme="snow"
      value={value}
      formats={formats}
      modules={modules}
      onChange={onChange}
    />
  );
};

export default Editor;
