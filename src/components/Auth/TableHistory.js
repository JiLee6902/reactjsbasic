import { useEffect, useState } from "react";
import "./TableHistory.scss";
import moment from "moment";
import axios from "axios";

const TableHistory = (props) => {
  const { listHistory } = props;
  console.log("Check list: ", listHistory);

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Quiz Name</th>
            <th scope="col">Quiz Description</th>
            <th scope="col">Total Questions</th>
            <th scope="col">Total Correct</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {listHistory &&
            listHistory.length > 0 &&
            listHistory.map((item, index) => {
              return (
                <tr key={`table-history-${index}`}>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
          {listHistory && listHistory.length === 0 && (
            <tr>
              <td colSpan={"4"}>Not found data</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default TableHistory;
