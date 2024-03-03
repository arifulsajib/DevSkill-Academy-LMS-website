interface Props {
  gridCol?: string;
}

const Loading = ({ gridCol }: Props) => {
  return (
    <div className={`w-full min-h-[80vh] flex justify-center items-center bg-[#0f172a] text-white ${gridCol && gridCol}`}>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default Loading;
