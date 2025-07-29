import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const ReportBarSVG = () => {
  return (
    <svg
      width="12"
      height="14"
      viewBox="0 0 12 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 14V4.2H2.66667V14H0ZM4.66667 14V0H7.33333V14H4.66667ZM9.33333 14V8.4H12V14H9.33333Z"
        fill="black"
        fill-opacity="0.88"
      />
    </svg>
  );
};

const ReportBarIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={ReportBarSVG} {...props} />
}
export default ReportBarIcon;

