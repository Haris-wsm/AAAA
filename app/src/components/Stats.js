import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_GET } from "../api";
import Sidebar from "../sidebar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    Legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "รายงานผลการเล่นเกมบำบัด",
    },
  },
};

const Stats = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isShow, setisShow] = useState(false);
  const [chartData, setChartData] = useState({});
  const { id } = useParams();

  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    const res = await API_GET(`admin/game_report/${id}`);

    if (res.result === true) {
      createChart(res.data);
    }
  };

  const createChart = (stats) => {
    var labels = [];
    var data = [];

    stats.forEach((d) => {
      console.log(d);
      labels.push(d.game_name);
      data.push(d.total);
    });

    var dataset = {
      labels: labels,
      datasets: [
        {
          label: "จำนวนการเล่นเกมทั้งหมดของผู้ป่วย ",
          data: data,
          // All same color
          // backgroundColor: "rgba(175, 159, 223, 0.8)",

          // Diff color
          backgroundColor: [
            "rgba(175, 159, 223, 0.8)",
            "rgba(255, 0, 0, 0.8)",
            "rgba(0, 255, 255, 0.8)",
          ],
        },
      ],
    };

    setChartData(dataset);
    setIsLoading(true);
    setisShow(true);
  };

  const getChart = () => {
    if (isLoading) {
      return <Bar options={options} data={chartData} />;
    }

    return <></>;
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-2 bg p-0">
          <Sidebar />
        </div>
        <div className="col-10 p-0">
          <h1 className="title">จำนวการเล่นเกมแต่ละประเภท</h1>
          <div className="p-5 hight-two">
            <div className="content border rounded-3 p-2 shadow hight-two">
              {isLoading && isShow ? (
                <div>{getChart()}</div>
              ) : (
                <div className="d-flex justify-content-center align-items-center h-100">
                  <h2>ไม่พบข้อมูล</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
