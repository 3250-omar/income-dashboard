"use client";
import React, { useState, useMemo, useCallback } from "react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { Spin, Typography, Skeleton } from "antd";
import { useTransactions } from "@/components/helpers/useTransactions";
import { useGetAccounts } from "../accounts/api/query";
import { useGetGoals } from "@/components/helpers/useGetGoals";
import { useFinancialSummary } from "@/components/helpers/useFinancialSummary";
import { useUserStore } from "../store/user_store";
import { ExportModal } from "./_comp/ExportModal";

// Modular Components (Dynamic Imports)
const ControlsSection = dynamic(
  () => import("./_comp/ControlsSection").then((m) => m.ControlsSection),
  {
    ssr: false,
    loading: () => <Skeleton.Input active className="w-full h-20!" />,
  }
);
const ReportHeader = dynamic(
  () => import("./_comp/ReportHeader").then((m) => m.ReportHeader),
  {
    ssr: false,
    loading: () => <Skeleton active title paragraph={{ rows: 1 }} />,
  }
);
const ReportSummary = dynamic(
  () => import("./_comp/ReportSummary").then((m) => m.ReportSummary),
  {
    ssr: false,
    loading: () => <Skeleton active paragraph={{ rows: 2 }} />,
  }
);
const ReportCharts = dynamic(
  () => import("./_comp/ReportCharts").then((m) => m.ReportCharts),
  {
    ssr: false,
    loading: () => <Skeleton.Node active className="w-full h-[300px]!" />,
  }
);
const TransactionsSection = dynamic(
  () =>
    import("./_comp/TransactionsSection").then((m) => m.TransactionsSection),
  {
    ssr: false,
    loading: () => <Skeleton active />,
  }
);
import { AccountsSectionProps } from "./_comp/AccountsSection";
import { getUserData } from "../hooks/getUserData";
const AccountsSection = dynamic<AccountsSectionProps>(
  () => import("./_comp/AccountsSection").then((m) => m.AccountsSection),
  {
    ssr: false,
    loading: () => <Skeleton active />,
  }
);
const GoalsSection = dynamic(
  () => import("./_comp/GoalsSection").then((m) => m.GoalsSection),
  {
    ssr: false,
    loading: () => <Skeleton active />,
  }
);
const FinancialInsights = dynamic(
  () => import("./_comp/FinancialInsights").then((m) => m.FinancialInsights),
  {
    ssr: false,
    loading: () => <Skeleton active />,
  }
);

const { Text } = Typography;

export type ReportCategory = "all" | "transactions" | "accounts" | "goals";

const COLORS = [
  "#3b82f6", // Blue
  "#10b981", // Green
  "#f59e0b", // Amber
  "#ef4444", // Red
  "#8b5cf6", // Violet
  "#ec4899", // Pink
];

const Report = () => {
  const [category, setCategory] = useState<ReportCategory>("all");
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const { sessionUserData } = useUserStore();

  const { data: transactionsData, isLoading: transLoading } = useTransactions({
    userId: sessionUserData?.id,
    enabled: !!sessionUserData?.id,
  });

  const { data: accountsData, isLoading: accountsLoading } = useGetAccounts();
  const { data: goalsData, isLoading: goalsLoading } = useGetGoals();
  const { data: summaryData, isLoading: summaryLoading } = useFinancialSummary({
    userId: sessionUserData?.id,
    enabled: !!sessionUserData?.id,
  });
  const { data: userData } = getUserData({
    userId: sessionUserData?.id,
    enabled: !!sessionUserData?.id,
  });

  const transactions = useMemo(
    () => transactionsData?.transactions || [],
    [transactionsData]
  );
  const accounts = useMemo(() => accountsData || [], [accountsData]);
  const goals = useMemo(() => goalsData || [], [goalsData]);

  const isLoading =
    transLoading || accountsLoading || goalsLoading || summaryLoading;

  const downloadPDF = useCallback(async () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;

    setIsExporting(true);
    setExportProgress(10);

    const progressInterval = setInterval(() => {
      setExportProgress((prev: number) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Use setTimeout to allow the UI to update and show the modal immediately
    // before starting the heavy processing and resource-intensive imports.
    setTimeout(async () => {
      try {
        const [html2canvas, { default: jsPDF }] = await Promise.all([
          import("html2canvas"),
          import("jspdf"),
        ]);

        // Store original styles to restore them later
        const originalStyle = element.style.cssText;
        // Temporarily set a fixed width to ensure consistent layout for capture,
        // preventing responsive layout shifts that could clip content.
        element.style.width = "1200px";
        // Remove border radius to ensure clean edges for PDF rendering,
        // as rounded corners can sometimes cause rendering artifacts.
        element.style.borderRadius = "0";

        const canvas = await html2canvas.default(element, {
          scale: 2, // Higher scale for better quality
          backgroundColor: "#ffffff",
          useCORS: true,
          logging: false,
          allowTaint: true,
          // Account for current scroll position to ensure the entire visible content is captured,
          // even if the user has scrolled down the page.
          scrollY: -window.scrollY,
          // Force the layout to render as if it were a desktop view,
          // preventing mobile-specific layouts from being captured.
          windowWidth: 1200,
        });

        // Restore original styling after capture
        element.style.cssText = originalStyle;

        setExportProgress(95);

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        const pageHeight = pdf.internal.pageSize.getHeight();
        let heightLeft = pdfHeight;
        let position = 0;

        // First Page
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;

        // Additional Pages
        while (heightLeft > 0) {
          position = heightLeft - pdfHeight;
          pdf.addPage();
          pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
          heightLeft -= pageHeight;
        }

        setExportProgress(100);
        pdf.save(`${category}-financial-report.pdf`);
      } catch (error) {
        console.error("Export failed:", error);
      } finally {
        clearInterval(progressInterval);
        setTimeout(() => {
          setIsExporting(false);
          setExportProgress(0);
        }, 500);
      }
    }, 0);
  }, [category]);

  // --- Advanced Data Processing ---

  const processedData = useMemo(() => {
    // Category Breakdown (Still needed from transactions)
    const categoryMap: Record<string, number> = {};
    transactions.forEach((t: any) => {
      if (t.type === "expense") {
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      }
    });

    const categoryBreakdown = Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Summary Stats from useFinancialSummary
    const totalIncome = summaryData?.income || 0;
    const totalExpenses = summaryData?.expenses || 0;
    const totalBalance = summaryData?.balance || 0;
    const completedGoals = goals.filter((g: any) => g.status).length;

    // Advanced Metrics
    const savingsRate =
      totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;
    const expenseRatio =
      totalIncome > 0 ? (totalExpenses / totalIncome) * 100 : 0;
    const netSavings = totalIncome - totalExpenses;
    const topCategory =
      categoryBreakdown.length > 0 ? categoryBreakdown[0] : null;

    const avgTransactionSize =
      transactions.length > 0 ? totalExpenses / transactions.length : 0;

    const summaryChartData = [
      {
        name: "Income",
        amount: totalIncome,
      },
      {
        name: "Expenses",
        amount: totalExpenses,
      },
    ];

    return {
      categoryBreakdown,
      summaryStats: {
        totalIncome,
        totalExpenses,
        totalBalance,
        completedGoals,
        totalGoals: goals.length,
      },
      insights: {
        savingsRate,
        netSavings,
        topCategory,
        burnRate: totalExpenses,
        expenseRatio,
        avgTransactionSize,
      },
      summaryData: summaryChartData,
    };
  }, [transactions, goals, summaryData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Interactive Controls */}
      <ControlsSection
        category={category}
        setCategory={setCategory}
        onDownload={downloadPDF}
      />

      {/* Styled Report Content for PDF */}
      <div
        id="pdf-content"
        className="space-y-8 bg-[#f9fafb] p-8 md:p-12 rounded-3xl print:p-0 print:bg-[#ffffff] print:rounded-none shadow-sm"
      >
        <ReportHeader category={category} userData={userData} />

        {/* Global Summary & Insights */}
        {(category === "all" || category === "transactions") && (
          <>
            <ReportSummary {...processedData.summaryStats} />
            <FinancialInsights {...processedData.insights} />
          </>
        )}

        {category === "transactions" && (
          <TransactionsSection transactions={transactions} />
        )}
        {/* Dynamic Categorized Sections */}
        {(category === "all" || category === "transactions") && (
          <ReportCharts
            categoryData={processedData.categoryBreakdown}
            summaryData={processedData.summaryData}
            colors={COLORS}
          />
        )}

        {category === "accounts" && (
          <AccountsSection accounts={accounts} transactions={transactions} />
        )}

        {category === "goals" && <GoalsSection goals={goals} />}

        {/* Footer */}
        <div className="border-t border-[#f3f4f6] pt-8 text-center bg-[#ffffff] p-6 rounded-2xl">
          <Text type="secondary" className="text-xs text-[#9ca3af]">
            This report represents your financial activity and goals as of{" "}
            {dayjs().format("YYYY-MM-DD")}.
            <br />
            Confidential Document • Generated by Income Dashboard
          </Text>
        </div>
      </div>

      <ExportModal
        isExporting={isExporting}
        category={category}
        exportProgress={exportProgress}
      />
    </div>
  );
};

export default Report;
