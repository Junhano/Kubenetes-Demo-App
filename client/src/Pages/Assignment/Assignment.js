import React, { useState, useEffect } from "react";
import "./assignment.css";
import axios from "axios";

export default () => {
  const [allAssignment, setallAssignment] = useState([]);
  const [newAssignmentname, setnewAssignmentname] = useState("");
  const [move, setmove] = useState(false);
  const [selectremove, setselectremove] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const values = await axios.get("/api/assignment/all");
      console.log(values.data);
      setallAssignment(values.data);
    };
    fetchData();
    console.log("Fetched Data");
  }, [move]);

  const assignmentList = allAssignment.map((val, index) => {
    return (
      <li
        className="list"
        key={index}
        onClick={() => setselectremove(val.name)}
      >
        {val.name}
      </li>
    );
  });

  const addNewAssignment = async () => {
    await axios.post("/api/assignment", {
      name: newAssignmentname,
    });
    setnewAssignmentname("");
    setmove(!move);
  };

  const removeAssignment = async () => {
    await axios({
      method: "DELETE",
      url: "/api/assignment",
      data: {
        name: selectremove,
      },
    });
    setselectremove("");
    setmove(!move);
  };

  return (
    <div className="assignmentpage">
      <div>
        <h2 className="centertext">Add Assignment</h2>
        <div className="inputdiv">
          <input
            className="input"
            type="text"
            id="name"
            placeholder="Enter New Assignment Name"
            value={newAssignmentname}
            onChange={(event) => setnewAssignmentname(event.target.value)}
          ></input>
          <div className="btndiv">
            <button className="btn" onClick={addNewAssignment}>
              Add
            </button>
          </div>
        </div>
      </div>
      <div className="allava">
        <h2 className="centertext">All Available Assignment</h2>
        {selectremove !== "" ? (
          <div className="removeblock">
            <p className="removetext">{selectremove}</p>
            <div className="removebtndiv">
              <button className="btn" onClick={removeAssignment}>
                Confirm Remove
              </button>
            </div>
          </div>
        ) : null}
        {assignmentList}
      </div>
    </div>
  );
};
