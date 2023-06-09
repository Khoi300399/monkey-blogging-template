import { memo } from "react";

type Props = {
  children: React.ReactNode;
};

const Field = ({ children }: Props) => {
  return <div className="field">{children}</div>;
};

export default memo(Field);
