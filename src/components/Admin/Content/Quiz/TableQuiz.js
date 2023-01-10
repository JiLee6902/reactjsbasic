import { useState, useEffect } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";

const TableQuiz = (props) => {

    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchQuiz();
    }, []);

    const fetchQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    }

    return (
        <table className="table table-hover table-bordered">
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
                {listQuiz && listQuiz.map((item, index) => {
                    return (
                        <tr key={`table-quiz-${index}`}>
                            <th>{item.id}</th>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>{item.difficulty}</td>
                            <td>
                                <button
                                    className='btn btn-warning mx-3'
                                    onClick={() => props.handleClickBtnUpdate(item)}
                                >
                                    Edit</button>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => props.handleClickBtnDelete(item)}
                                >
                                    Delete</button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default TableQuiz;