import * as React from "react";
import { Typography } from "antd";

interface IRenderEventContentProps {
  eventInfo: any;
}

const { Text } = Typography;

const RenderEventContent: React.FC<IRenderEventContentProps> = ({
  eventInfo,
}) => {
  return (
    <Text style={{ height: "30px", color: "#fff" }} italic>
      {eventInfo.event.title}
    </Text>
  );
};

export default RenderEventContent;
