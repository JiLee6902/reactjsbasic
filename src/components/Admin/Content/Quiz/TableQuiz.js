import { useState, useEffect } from "react";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import { useTranslation, Trans } from "react-i18next";


const TableQuiz = (props) => {

    const { listQuizs } = props;
    const { t } = useTranslation();

    return (
        <>
        <div>{t("admin.managementquiz.mqmq.mqlist.mqlisttitle")}</div>
        <table className="table table-hover table-bordered my-2">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">{t("admin.managementquiz.mqmq.mqlist.mqlistname")}</th>
                    <th scope="col">{t("admin.managementquiz.mqmq.mqlist.mqlistdes")}</th>
                    <th scope="col">{t("admin.managementquiz.mqmq.mqlist.mqlisttype")}</th>
                    <th scope="col">{t("admin.managementquiz.mqmq.mqlist.mqlistaction")}</th>
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
                                    {t("admin.managementquiz.mqmq.mqlist.mqlistedit")}</button>
                                <button
                                    className='btn btn-danger'
                                    onClick={() => props.handleClickBtnDeleteQuiz(item)}
                                >
                                    {t("admin.managementquiz.mqmq.mqlist.mqlistdelete")}</button>
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