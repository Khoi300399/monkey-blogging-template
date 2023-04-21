import { memo } from "react";

type Props = {
  children: React.ReactNode;
};

const FormRow = ({ children }: Props) => {
  return <div className="form-row">{children}</div>;
};

export default memo(FormRow);
