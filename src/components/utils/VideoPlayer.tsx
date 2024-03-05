import ReactPlayer from "react-player";

interface Props {
  url: string;
  title?: string;
  isDemo?: boolean;
}

const VideoPlayer = ({ url, title, isDemo }: Props) => {
  return (
    <>
      <ReactPlayer url={url} width="100%" height={isDemo ? "240px" : "100%"} controls light />
      {title && <h1 className="text-2xl font-bold text-success my-3">{title}</h1>}
    </>
  );
};

export default VideoPlayer;
