import { useEffect, useState } from "react"

const useAdmin = email => {
    const [isDoctor, setIsDoctor] = useState(false);
    const [isDoctorLoading, setIsDoctorLoading] = useState(true);
    useEffect(() => {
        if (email) {
            fetch(`${process.env.REACT_APP_SERVER_LINK}/users/doctor/${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setIsDoctor(data.isDoctor);
                    setIsDoctorLoading(false);
                })
        }
    }, [email])
    return [isDoctor, isDoctorLoading]
}

export default useAdmin;