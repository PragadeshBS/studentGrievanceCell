import ClipLoader from "react-spinners/ClipLoader";

const ClipLoaderWithText = ({ text }) => {
  return (
    <div className="mb-6 flex gap-2 items-center">
      <div>
        <ClipLoader
          cssOverride={{ display: "block", margin: "0 auto" }}
          color="#ff8f20"
          className="mb-6"
        />
      </div>
      <div>{text}</div>
    </div>
  );
};
export default ClipLoaderWithText;
