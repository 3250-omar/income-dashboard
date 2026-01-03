"use client";
import React from "react";
import dayjs from "dayjs";

interface MonthHeaderProps {
  mValue: number;
  style: {
    color: string;
    bg: string;
    icon: any;
  };
}

const MonthHeader: React.FC<MonthHeaderProps> = React.memo(
  ({ mValue, style }) => {
    const Icon = style.icon;

    return (
      <div className="flex items-center gap-4 w-full">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm uppercase tracking-wider border border-transparent shadow-sm ${style.bg} ${style.color}`}
        >
          {Icon && <Icon size={16} />}
          {dayjs()
            .month(mValue - 1)
            .format("MMMM")}
        </div>
        <div className="h-px bg-gray-100 flex-1"></div>
      </div>
    );
  }
);

MonthHeader.displayName = "MonthHeader";

export default MonthHeader;
