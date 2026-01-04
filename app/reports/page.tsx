"use client";
import React, { useState, useMemo, useCallback } from "react";
import dynamic from "next/dynamic";
import { Spin, Typography, Modal, Progress, Skeleton } from "antd";
import { useTransactions } from "@/components/helpers/useTransactions";
import { useGetAccounts } from "../accounts/api/query";
import { useGetGoals } from "@/components/helpers/useGetGoals";
import { useUserStore } from "../store/user_store";

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
const AccountsSection = dynamic(
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
const margin = 10;

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

  const transactions = useMemo(
    () => transactionsData?.transactions || [],
    [transactionsData]
  );
  const accounts = useMemo(() => accountsData || [], [accountsData]);
  const goals = useMemo(() => goalsData || [], [goalsData]);

  const isLoading = transLoading || accountsLoading || goalsLoading;

  const downloadPDF = useCallback(async () => {
    const element = document.getElementById("pdf-content");
    if (!element) return;

    setIsExporting(true);
    setExportProgress(10);

    const progressInterval = setInterval(() => {
      setExportProgress((prev: number) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 15;
      });
    }, 200);

    try {
      // Dynamic imports for heavy libraries
      const [html2canvas, { default: jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const canvas = await html2canvas.default(element, {
        scale: 1.5,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
        allowTaint: true,
      });

      setExportProgress(95);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(
        imgData,
        "PNG",
        margin,
        margin,
        pdfWidth - margin * 2,
        pdfHeight
      );

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
  }, [category]);

  // --- Advanced Data Processing ---

  const generatedDate = useMemo(() => new Date().toLocaleDateString(), []);

  const processedData = useMemo(() => {
    // Category Breakdown
    const categoryMap: Record<string, number> = {};
    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((t: any) => {
      if (t.type === "income") {
        totalIncome += t.amount;
      } else {
        totalExpenses += t.amount;
        categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount;
      }
    });

    const categoryBreakdown = Object.entries(categoryMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    const totalBalance = accounts.reduce(
      (sum: number, a: any) => sum + (a.balance || 0),
      0
    );
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

    const summaryData = [
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
      summaryData,
    };
  }, [transactions, accounts, goals]);

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
        <ReportHeader
          category={category}
          generatedDate={generatedDate}
          userEmail={sessionUserData?.email}
        />

        {/* Global Summary & Insights */}
        {(category === "all" || category === "transactions") && (
          <>
            <ReportSummary {...processedData.summaryStats} />
            <FinancialInsights {...processedData.insights} />
          </>
        )}

        {/* Dynamic Categorized Sections */}
        {(category === "all" || category === "transactions") && (
          <ReportCharts
            categoryData={processedData.categoryBreakdown}
            summaryData={processedData.summaryData}
            colors={COLORS}
          />
        )}

        {category === "transactions" && (
          <TransactionsSection transactions={transactions} />
        )}

        {category === "accounts" && <AccountsSection accounts={accounts} />}

        {category === "goals" && <GoalsSection goals={goals} />}

        {/* Footer */}
        <div className="border-t border-[#f3f4f6] pt-8 text-center bg-[#ffffff] p-6 rounded-2xl">
          <Text type="secondary" className="text-xs text-[#9ca3af]">
            This report represents your financial activity and goals as of{" "}
            {generatedDate}.
            <br />
            Confidential Document • Generated by Income Dashboard
          </Text>
        </div>
      </div>

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
    </div>
  );
};

export default Report;
