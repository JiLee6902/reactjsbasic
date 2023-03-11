import "./DashBoard.scss";
import { getOverview } from "../../../services/apiServices";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";
import { useState, useEffect } from "react";
import { useTranslation, Trans } from "react-i18next";

const DashBoard = (props) => {
  const [dataOverView, setDataOverView] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    fetchDataOverview();
  }, []);

  const fetchDataOverview = async () => {
    let res = await getOverview();
    if (res && res.EC === 0) {
      setDataOverView(res.DT);
      let Qz = 0,
        Qs = 0,
        As = 0;
      Qz = res?.DT?.others?.countQuiz ?? 0;
      Qs = res?.DT?.others?.countQuestions ?? 0;
      As = res?.DT?.others?.countAnswers ?? 0;

      //process chart data
      const data = [
        {
          name: "Quizzes",
          Qz: Qz,
        },
        {
          name: "Questions",
          Qs: Qs,
        },
        {
          name: "Answers",
          As: As,
        },
      ];

      setDataChart(data);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="title">{t("admin.dashboard.dbtitle")}</div>

      <div className="content">
        <div className="c-left">
          <div className="child">
            <span className="text-1">{t("admin.dashboard.totaluser")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.users &&
              dataOverView.users.total ? (
                <>{dataOverView.users.total}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("admin.dashboard.totalquiz")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuiz ? (
                <>{dataOverView.others.countQuiz}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("admin.dashboard.totalques")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countQuestions ? (
                <>{dataOverView.others.countQuestions}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
          <div className="child">
            <span className="text-1">{t("admin.dashboard.totaluser")}</span>
            <span className="text-2">
              {dataOverView &&
              dataOverView.others &&
              dataOverView.others.countAnswers ? (
                <>{dataOverView.others.countAnswers}</>
              ) : (
                <>0</>
              )}
            </span>
          </div>
        </div>
        <div className="c-right">
          <ResponsiveContainer width="95%" height={"100%"}>
            <BarChart data={dataChart}>
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#d63384" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
