export default function Loading({ bar, spinner, dots }) {
  return (
    <div className="flex items-center justify-center h-[60vh]">
      <div>
        {bar ? (
          <span className="loading loading-bars loading-lg">...Loading</span>
        ) : spinner ? (
          <span className="loading loading-spinner loading-lg">...Loading</span>
        ) : dots ? (
          <span className="loading loading-dots loading-lg">...Loading</span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
