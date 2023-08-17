import {useState,useRef} from "react";
import axios from "axios";

export default function Create()
{
	const rRno=useRef();
	const rName=useRef();
	const rMarks=useRef();

	const[rno,setRno]=useState("");
	const[name,setName]=useState("");
	const[marks,setMarks]=useState("");

	const save=(event)=>{
		event.preventDefault();
		if((rno=="")||(rno<1))
		{
			alert("invalid rno")
			setRno("");
			rRno.current.focus();
			return;
		}
		if((name=="")|| (name.trim().length==0) || (name.length<2) || (!name.match(/^[A-z]+$/)))
		{
			alert("invalid name");
			setName("");
			rName.current.focus();
			return;
		}
		if((marks=="")||(marks<0)||(marks>100))
		{
			alert("invalid marks");
			setMarks("");
			rMarks.current.focus();
			return;
		}
		let data={rno,name,marks};
		let url="http://localhost:9000/save";
		axios.post(url,data)
		.then(res=>{
			if(res.data.insertedId==rno)
			{
				alert("record created");
				setRno("");
				setName("");
				setMarks("");
				rRno.current.focus();
			}
			else
			{
				alert("rno already exists");
				setRno("");
				rRno.current.focus();
			}
		})
		.catch(err=>alert("issue "+err));
	}
	return(
		<>
		<center>
			<h1>Create Page</h1>
			<form onSubmit={save}>
			<input type="number" placeholder="enter rno" onChange={(event)=>{setRno(event.target.value);}} ref={rRno} value={rno}/>
			<br/><br/>
			<input type="text" placeholder="enter name" onChange={(event)=>{setName(event.target.value);}} ref={rName} value={name}/>
			<br/><br/>
			<input type="number" placeholder="enter marks" onChange={(event)=>{setMarks(event.target.value);}} ref={rMarks} value={marks}/>
			<br/><br/>
			<input type="submit" value="Save"/>
			<br/><br/>
			</form>
		</center>
		</>
	);
}