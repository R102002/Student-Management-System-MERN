import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const nav = useNavigate();
  const [info, setInfo] = useState([]);

  useEffect(() => {
    let url = "http://localhost:9000/read";
    axios.get(url)
      .then(res => {
        setInfo(res.data);
      })
      .catch(err => console.log("issue " + err));
  }, []);

  const delStu = (rno) => {
    let url = "http://localhost:9000/remove";
    let d = { data: { rno } };
    axios.delete(url, d)
      .then(res => {
        alert("record deleted");
        window.location.reload();
      })
      .catch(err => alert("issue" + err));
  };

  const updateStu = (rno, name, marks) => {
    nav("/update", { state: { rno, name, marks } });
  };

  return (
    <>
      <center>
        <h1>Home Page</h1>
        <table border="4" style={{ "width": "50%" }}>
          <tr>
            <th>Rno</th>
            <th>Name</th>
            <th>Marks</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
          {info.map((e) => (
            <tr style={{ "textAlign": "center" }} key={e._id}>
              <td>{e._id}</td>
              <td>{e.name}</td>
              <td>{e.marks}</td>
              <td><button onClick={() => { if (window.confirm('Are you sure?')) delStu(e._id); }}> Delete </button></td>
              <td><button onClick={() => { updateStu(e._id, e.name, e.marks); }}>Update </button></td>
            </tr>
          ))}
        </table>
      </center>
    </>
  );
}
