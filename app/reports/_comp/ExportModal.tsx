import React from "react";
import { Modal, Progress, Typography } from "antd";

const { Text } = Typography;

interface ExportModalProps {
  isExporting: boolean;
  category: string;
  exportProgress: number;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isExporting,
  category,
  exportProgress,
}) => {
  return (
    <Modal
      title="Generating Report"
      open={isExporting}
      footer={null}
      closable={false}
      centered
      maskClosable={false}
    >
      <div className="py-6 text-center space-y-4">
        <Text type="secondary">
          Preparing your {category} report. This may take a few moments...
        </Text>
        <Progress
          percent={exportProgress}
          status="active"
          strokeColor={{
            "0%": "#3b82f6",
            "100%": "#10b981",
          }}
        />
      </div>
    </Modal>
  );
};
