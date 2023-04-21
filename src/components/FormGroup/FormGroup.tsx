import { memo } from "react";

type Props = {
  children: React.ReactNode;
};

const FormGroup = ({ children }: Props) => {
  return <div className="form-group">{children}</div>;
};

export default memo(FormGroup);
