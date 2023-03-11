import { useState, useEffect } from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { FcPlus } from "react-icons/fc";
import { getHistory } from "../../services/apiServices";
import "./History.scss";
import { toast } from "react-toastify";
import { store } from "../../redux/store";
import TableHistory from "./TableHistory";
import "react-toastify/dist/ReactToastify.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import moment from "moment";

const History = (props) => {
  const account = useSelector((state) => state.user.account);
  const [listHistory, setListHistory] = useState([]);
  useEffect(() => {
    fetchDataHistory();
  }, []);

  const fetchDataHistory = async () => {
    let res = await getHistory();
    if (res && res.EC === 0) {
      let newArray = res?.DT?.data?.map((item) => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item?.quizHistory?.name ?? "",
          description: item?.quizHistory?.description ?? "",
          date: moment(item.createdAt).utc().format("DD/MM/YYYY hh:mm:ss A"),
        };
      });

      if (newArray.length > 10) {
        newArray = newArray.slice(newArray.length - 10, newArray.length);
      }
      setListHistory(newArray);
    }
  };

  return (
    <>
      <div className="history-container ms-3 me-3 mb-3">
        <div className="history-title mb-3">
          {account.username}'s Exam History
        </div>
        <div>
          <TableHistory listHistory={listHistory} />
        </div>
      </div>
    </>
  );
};

export default History;
