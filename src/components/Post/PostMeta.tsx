type Props = {
  date?: string | null | undefined;
  authors?: string | null | undefined;
  className?: string;
};

const PostMeta = ({
  date = "Mar 23",
  authors = "Andiez Le",
  className = "black",
}: Props) => {
  return (
    <div className={`post-meta ${className}`}>
      <span className="authors">{authors}</span>
      <span className="time">{date}</span>
    </div>
  );
};

export default PostMeta;
