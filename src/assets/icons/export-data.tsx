import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

const ExportDataSVG = () => {
  return (
    <svg
      width="12"
      height="16"
      viewBox="0 0 12 16"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M1.6 0C0.712 0 0 0.712 0 1.6V14.4C0 15.288 0.712 16 1.6 16H10.399C11.287 16 11.999 15.288 11.999 14.4V4.01007L8 0H1.6ZM2.99835 10.0013H4.99835V6.99972H7.00018V10.0013H9.00018L5.99927 13.0034L2.99835 10.0013ZM7.00018 4.99817V1L11.0046 4.99817H7.00018Z"
        fill-opacity="0.88"
      />
    </svg>
  );
};

const ExportDataIcon = (props: Partial<CustomIconComponentProps>) => {
  return <Icon component={ExportDataSVG} {...props} />;
};
export default ExportDataIcon;
