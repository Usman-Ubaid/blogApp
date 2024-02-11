import { createPortal } from "react-dom";

const DeleteBlogPortal = ({
  children,
  onOpen,
}: {
  children: React.ReactNode;
  onOpen: boolean;
}) => {
  const portalContent = document.getElementById("portal")!;

  if (!onOpen) return null;

  return (
    <>
      {createPortal(
        <div className="delete-portal-overlay">
          <div className="delete-portal">{children}</div>
        </div>,
        portalContent
      )}
    </>
  );
};
export default DeleteBlogPortal;
