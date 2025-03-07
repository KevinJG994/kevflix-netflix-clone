import "./Loading.css";

const Loading = () => {
  return (
    <div className="wrapper">
      <div className="spinner">
        <span className="loading loading-ring text-primary w-60"></span>
      </div>
    </div>
  );
};

export default Loading;
