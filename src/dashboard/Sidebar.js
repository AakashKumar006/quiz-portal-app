import React, {useState} from "react";
import {
    FaUserAlt,
    FaRegChartBar,
    FaBars,
} from "react-icons/fa";
import {NavLink} from "react-router-dom";

const Sidebar = ({children}) => {

    const menuItem = [
        {
            path:"/dashboard/createquiz",
            name:"Create Quiz",
            role:"ROLE_ADMIN",
            icon:<FaUserAlt/>
        }, 
        {
            path:"/dashboard/allquiz",
            name:"All Quizies",
            role: "ROLE_ADMIN",
            icon:<FaUserAlt/>
        },
        {
            path:"/dashboard/user",
            name:"All Users",
            role:"ROLE_ADMIN",
            icon:<FaRegChartBar/>
        },
        {
            path:"/project",
            name:"profile",
            role: "ROLE_USER",
            icon:<FaRegChartBar/>
        },
        {
            path:"/dashboard/user/quiz",
            name:"Quiz List",
            role:"ROLE_USER",
            icon:<FaUserAlt/>
        },
        {
            path:"/dashboard/attempts",
            name:"Attempts",
            role: "ROLE_USER",
            icon:<FaRegChartBar/>
        },

    ]
    return(
       <div className="view">
           <div className="sidebar">
                <div className="mt-3"></div>
                {
                    menuItem.map((item) => (
                        item.role === sessionStorage.getItem("role") &&
                                <NavLink to={item.path}  className="link" activeclassName="active">
                                    <div className='icon'>{item.icon}</div>
                                    <div className='link_text'>{item.name}</div>
                                </NavLink>
                    ))
                }
            </div>
            <div className="main_page">{children}</div>
       </div>
    );
}
export default Sidebar;