import React, { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { emotionList } from "../util";
import "./EmotionChart.css";

Chart.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function EmotionChart({ diaryList }) {
  // 0개 감정은 제외
  const emotionStats = useMemo(() => {
    const stats = {};
    emotionList.forEach(e => { stats[e.id] = 0; });
    diaryList.forEach(diary => {
      stats[diary.emotionId] = (stats[diary.emotionId] || 0) + 1;
    });
    // 0개인 감정은 제외
    return emotionList
      .map(e => ({
        label: e.name,
        count: stats[e.id],
        color: getPieColor(e.id),
        borderColor: getPieBorderColor(e.id),
      }))
      .filter(e => e.count > 0);
  }, [diaryList]);

  const data = {
    labels: emotionStats.map(e => e.label),
    datasets: [
      {
        data: emotionStats.map(e => e.count),
        backgroundColor: emotionStats.map(e => e.color),
        borderColor: emotionStats.map(e => e.borderColor),
        borderWidth: 3,
        hoverOffset: 18,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: document.body.classList.contains("dark") ? "#f6f6f6" : "#333",
          font: { size: 16, weight: "bold" },
          boxWidth: 24,
          padding: 18,
        },
      },
      tooltip: {
        backgroundColor: "#222",
        titleColor: "#fff",
        bodyColor: "#fff",
        borderColor: "#fff",
        borderWidth: 1,
        padding: 12,
        caretSize: 8,
        displayColors: true,
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percent = total ? ((value / total) * 100).toFixed(1) : 0;
            return `${label}: ${value}개 (${percent}%)`;
          }
        }
      },
      datalabels: {
        color: "#fff",
        font: { weight: "bold", size: 18 },
        textStrokeColor: "#222",
        textStrokeWidth: 2,
        shadowBlur: 6,
        shadowColor: "#888",
        borderRadius: 8,
        backgroundColor: "rgba(0,0,0,0.18)",
        padding: 6,
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percent = total ? ((value / total) * 100).toFixed(1) : 0;
          // 10% 미만은 표시하지 않거나, 0개는 표시하지 않음
          if (value === 0 || percent < 10) return "";
          return `${value}개\n${percent}%`;
        },
        anchor: "center",
        align: "center",
        display: "auto",
        clamp: true,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1400,
      easing: "easeOutBounce",
    },
  };

  return (
    <div className="emotion-chart-container">
      <h3 className="emotion-chart-title">감정별 일기 비율</h3>
      <Pie data={data} options={options} />
    </div>
  );
}

// 감정별 색상 (더 강조)
function getPieColor(id) {
  switch (id) {
    case 1: return "#64c964";
    case 2: return "#9dd772";
    case 3: return "#fdce17";
    case 4: return "#fd8446";
    case 5: return "#fd565f";
    default: return "#ececec";
  }
}
function getPieBorderColor(id) {
  switch (id) {
    case 1: return "#3cae3c";
    case 2: return "#7bbd3b";
    case 3: return "#e6b800";
    case 4: return "#e67e22";
    case 5: return "#e74c3c";
    default: return "#bdbdbd";
  }
}

export default EmotionChart;