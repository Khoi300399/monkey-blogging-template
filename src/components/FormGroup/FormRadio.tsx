import { memo } from "react";

type Props = {
  children: React.ReactNode;
};

const FormRadio = ({ children }: Props) => {
  return <div className="form-radio">{children}</div>;
};

export default memo(FormRadio);
