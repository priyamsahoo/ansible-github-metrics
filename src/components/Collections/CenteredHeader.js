export const CenteredHeader = ({ name }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // background: "tranparent",
        backgroundColor: "transparent",
      }}
    >
      {name}
    </div>
  );
};
