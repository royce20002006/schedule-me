import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../../context/Modal";
import { useParams } from "react-router-dom";
import { createShiftThunk, readShiftThunk, updateShiftThunk } from "../../../redux/shift";
import './NewShiftModal.css'

function NewShiftModal({ shift }) {
    const dispatch = useDispatch();
    const { id } = useParams()
    const [userId, setUserId] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const users = useSelector(state => state.userState.allUsers)





    const [errors, setErrors] = useState({});
    const { closeModal } = useModal();
    useEffect(() => {


        if (shift) {
            setUserId(shift.userId)
            setStartTime(shift.startTime)
            setEndTime(shift.endTime)
        }
    }, [shift])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (shift) {
            const updateShift = {
                id: shift.id,
                userId,
                startTime,
                endTime,
            }

            const serverResponse = await dispatch(

                updateShiftThunk(
                    id,
                    updateShift
                )
            );

            if (serverResponse.ok) {
                
                await dispatch(readShiftThunk(id))
                closeModal();
                
                
            } else {
                
                setErrors(serverResponse.errors);


            }


        } else {

            const shift = {
                userId: parseInt(userId),
                startTime,
                endTime,
            }


            const serverResponse = await dispatch(

                createShiftThunk(
                    parseInt(id),
                    shift
                )
            );

            if (serverResponse.ok) {

                await dispatch(readShiftThunk(id))
                closeModal();
                
            } else {
                console.log(serverResponse)
                setErrors(serverResponse.errors);
                console.log(errors)


            }
        }
    };

    return (
        <>
            <h1 className="title">Create a new Shift</h1>

            <form className="form" onSubmit={handleSubmit}>
                {errors?.startTime && <p className="error">{errors.startTime}</p>}
                <label className="label">
                    User
                    <select
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                    >
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.lastName}, {user.firstName}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="label">
                    Start Time
                    <input
                        className="input"
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value + ':00')}
                        required
                    />
                </label>
                <label className="label">
                    End Time
                    <input className="input"
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value + ':00')}
                        required
                    />
                </label>
                <button className="submit" type="submit">Submit</button>
            </form>
        </>
    );
}

export default NewShiftModal;
