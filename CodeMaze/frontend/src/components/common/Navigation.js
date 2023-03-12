// import React, { useEffect, useState } from 'react';
import StudentNav from '../student/StudentNav';
import StudentLogin from '../student/StudentLogin';
import AdminNav from '../admin/AdminNav';
// import { useNavigate } from 'react-router-dom';

const Navigation = () => {
// const navigate = useNavigate();
    // const [flag, setflag] = useState("true")

    // useEffect(() => {
    //     if (flag === "false") {
    //         setflag("true")
    //         window.location.reload();

    //     }
    // }, [flag]);

    var currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser == null) {

        return <StudentLogin />
    }

    if (currentUser && currentUser.userrole === 'ROLE_ADMIN') {
        
        return <AdminNav />;
    }

    if (currentUser && currentUser.userrole === 'ROLE_STUDENT') {

        return <StudentNav />;
    }

    return (
        <div>

        </div>

    );
}

export default Navigation;
