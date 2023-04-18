import ClipLoader from "react-spinners/ClipLoader";

const ClipLoaderWithText = ({ text, textClass }) => {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <div>
        <ClipLoader
          cssOverride={{ display: "block", margin: "0 auto" }}
          color="#ff8f20"
          className="mb-6"
        />
      </div>
      <div className={textClass}>{text}</div>
    </div>
  );
};
export default ClipLoaderWithText;
