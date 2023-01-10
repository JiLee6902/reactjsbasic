import ModalCreateUser from "./ModalCreateUser";
import './ManageUser.scss';
import { FcPlus } from 'react-icons/fc';
import { useState } from "react";
import TableUser from "./TableUser";
import { useEffect } from 'react';
import { getAllUsers, getUserWithPaginate } from '../../../services/apiServices';
import axios from 'axios';
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import { Modal } from "bootstrap";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";



const ManageUser = (props) => {

    const LIMIT_USER = 6;
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1)

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    const [dataDelete, setDataDelete] = useState({});


    const [listUsers, setListUsers] = useState([

    ]);

    useEffect(() => {
        fetchListUsersWithPagniate(1);
    }, []);
    //có mảng rỗng phía sau thì hàm userEffect sẽ chạy ngay khi phần mềm render ra và chỉ chạy 1 lần

    const fetchListUsers = async () => {
        let res = await getAllUsers()
        if (res.EC === 0) {
            setListUsers(res.DT);
        }
    }

    const fetchListUsersWithPagniate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER)
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages)
        }
    }



    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    }

    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setDataView(user);
    }

    const resetViewData = () => {
        setDataView({});
    }

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user);
    }

    const resetUpdateData = () => {
        setDataUpdate({});
    }


    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className='btn-add-new'>
                    <button className="btn btn-primary" onClick={() => setShowModalCreateUser(true)}><FcPlus />Add new User</button>
                </div>
                <div className='table-users-container'>
                    {/* <TableUser
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        handleClickBtnUpdate={handleClickBtnUpdate}
                        handleClickBtnView={handleClickBtnView}
                        handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPagniate={fetchListUsersWithPagniate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPagniate={fetchListUsersWithPagniate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUsers={fetchListUsers}
                    resetUpdateData={resetUpdateData}
                    fetchListUsersWithPagniate={fetchListUsersWithPagniate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    dataView={dataView}
                    resetViewData={resetViewData}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUsers={fetchListUsers}
                    fetchListUsersWithPagniate={fetchListUsersWithPagniate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />

            </div>
        </div>
    )
}

export default ManageUser;