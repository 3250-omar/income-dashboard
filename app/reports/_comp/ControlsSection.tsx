"use client";
import React from "react";
import { Button, Select, Typography } from "antd";
import { FileText, Receipt, Wallet, Target, Download } from "lucide-react";

const { Title, Text } = Typography;

interface ControlsSectionProps {
  category: string;
  setCategory: (val: any) => void;
  onDownload: () => void;
}

export const ControlsSection: React.FC<ControlsSectionProps> = React.memo(
  ({ category, setCategory, onDownload }) => {
    return (
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#ffffff] p-6 rounded-2xl shadow-sm border border-[#f3f4f6] print:hidden">
        <div>
          <Title level={3} className="m-0! text-[#111827] max-sm:text-xl">
            Report Dashboard
          </Title>
          <Text type="secondary" className="text-[#6b7280] max-sm:text-sm ">
            Generate and export detailed financial reports
          </Text>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto max-sm:flex-col">
          <Select
            value={category}
            onChange={setCategory}
            className="w-full md:min-w-[220px] h-10 shadow-sm"
            options={[
              {
                label: "All Categories",
                value: "all",
                icon: <FileText className="w-4 h-4" />,
              },
              {
                label: "Transactions",
                value: "transactions",
                icon: <Receipt className="w-4 h-4" />,
              },
              {
                label: "Accounts",
                value: "accounts",
                icon: <Wallet className="w-4 h-4" />,
              },
              {
                label: "Goals",
                value: "goals",
                icon: <Target className="w-4 h-4" />,
              },
            ]}
          />
          <Button
            type="primary"
            icon={<Download className="w-4 h-4" />}
            onClick={onDownload}
            className="dashboard-gradient border-none! h-10 px-6 flex items-center shadow-lg hover:scale-105 transition-all text-white font-medium"
          >
            Export PDF
          </Button>
        </div>
      </div>
    );
  }
);

ControlsSection.displayName = "ControlsSection";
