import { memo } from "react";

type Props = {
  children: React.ReactNode;
  htmlFor?: string;
};

const Label = ({ children, htmlFor = "" }: Props) => {
  return (
    <label htmlFor={htmlFor} className="label">
      {children}
    </label>
  );
};

export default memo(Label);
