import { useField } from "formik";
import { memo } from "react";

type Props = {
  on?: boolean;
  type: string;
  name: string;
};

const Toggle = ({ on, ...props }: Props) => {
  const [field] = useField(props);

  return (
    <div className="toggle">
      <label>
        <input className="hidden-input" {...props} {...field} />
        <div className={`toggle-container ${on ? "on" : ""}`} {...props}>
          <span className={`toggle-circle  ${on ? "on" : ""}`}></span>
        </div>
      </label>
    </div>
  );
};

export default memo(Toggle);
