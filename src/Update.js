import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Update() {
  const location = useLocation();
  const nav = useNavigate();

  const [rno, setRno] = useState(location.state.rno || "");
  const [name, setName] = useState(location.state.name || "");
  const [marks, setMarks] = useState(location.state.marks || "");

  const updateRecord = (event) => {
    event.preventDefault();
    if ((rno === "") || (rno < 1)) {
      alert("invalid rno");
      return;
    }
    if ((name === "") || (name.trim().length === 0) || (name.length < 2) || (!name.match(/^[A-z]+$/))) {
      alert("invalid name");
      return;
    }
    if ((marks === "") || (marks < 0) || (marks > 100)) {
      alert("invalid marks");
      return;
    }

    let data = { rno, name, marks };
    let url = `http://localhost:9000/update/${rno}`; // Assuming you have an update API endpoint
    axios.put(url, data)
      .then(res => {
        if (res.data.updatedId === rno) {
          alert("record updated");
          nav("/");
        } else {
          alert("rno does not exist");
        }
      })
      .catch(err => alert("issue " + err));
  };

  return (
    <>
      <center>
        <h1>Update Page</h1>
        <form onSubmit={updateRecord}>
          <input type="number" placeholder="enter rno" value={rno} disabled />
          <br /><br />
          <input type="text" placeholder="enter name" onChange={(event) => { setName(event.target.value); }} value={name} />
          <br /><br />
          <input type="number" placeholder="enter marks" onChange={(event) => { setMarks(event.target.value); }} value={marks} />
          <br /><br />
          <input type="submit" value="Update" />
          <br /><br />
        </form>
      </center>
    </>
  );
}
