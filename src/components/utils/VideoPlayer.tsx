import ReactPlayer from "react-player";

interface Props {
  url: string;
}

const VideoPlayer = ({ url }: Props) => {
  return (
    <div className="player-wrapper">
      <ReactPlayer className="react-player" url={url} width="100%" height="100%" controls />
    </div>
  );
};

export default VideoPlayer;
