import { memo } from "react";

type Props = {
  children: React.ReactNode;
  title?: string;
};

const DashboardHeading = ({ children, title }: Props) => {
  return (
    <div className="dashboard-heading">
      <h1 className="dashboard-title">{children}</h1>
      <p className="dashboard-desc">{title}</p>
    </div>
  );
};

export default memo(DashboardHeading);
