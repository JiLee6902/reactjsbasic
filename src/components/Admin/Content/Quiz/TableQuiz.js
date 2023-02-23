import { useState, useEffect } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";

const TableQuiz = (props) => {

    const { listQuizs } = props;

    return (
        <>
        <div>List Quizzes: </div>
        <table className="table table-hover table-bordered my-2">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Type</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {listQuizs && listQuizs.map((item, index) => {
                    return (
                        <tr key={`table-quiz-${index}`}>
                            <th>{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.difficulty}</td>
                            <td style={{display: "flex", gap: "8px"}}>
                                <button
                                    className='btn btn-warning mx-3'
                                    onClick={() => props.handleClickBtnUpdateQuiz(item)}
                                >
                                    Edit</button>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => props.handleClickBtnDeleteQuiz(item)}
                                >
                                    Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
        </>
    )
}

export default TableQuiz;