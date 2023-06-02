import React from "react";
import './Notification.css'
import { useState, useEffect } from "react";

function Notification({props}){
    const toastList = props;
    const [list, setList] = useState(toastList);
    useEffect(() => {
        setList(toastList);
    }, [toastList, list]);
    const deleteToast = () => {
        list.splice(0, 1);
        toastList.splice(0, 1);
        
        
        setList([...list]);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if ( toastList.length || list.length)
            deleteToast();
            
        }, 3000);
        return () => {
            clearInterval(interval);
        }
        
    }, [toastList]);
    return(
        <div className="notification-container top-right">
            
            {
            list.map((toast, i) =>     
                <div className="notification-toast top-right" style={{ border: toast.border}}>
                    <p>{toast.description}</p>
                </div>
                )
            }
        </div>
    )
}

export default Notification;