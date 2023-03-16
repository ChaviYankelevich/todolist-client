import React from "react";
import { useForm } from 'react-hook-form';
import { Button, Form } from "react-bootstrap";
import service from "./service";


function Login(){
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
const onSubmit=(data)=>{
console.log(data,"data")
service.login(data.name,data.password)
      }
return(
    <div>
        <h3> הכנס</h3>
    <form onSubmit={handleSubmit(onSubmit)}>
    <Form.Label>name</Form.Label>
        <Form.Control
      
        placeholder="Enter your first name"
        {...register("name", {
          required: "Please enter your first name",
        })}
      />
      
        
      <Form.Label>Password</Form.Label>
      <Form.Control
        type="password"
        placeholder="Enter your password"
        {...register("password", {
          required: "Please enter your password",
        })}
      /> 
      <input type="submit" value={"שלח"}/>
    </form></div>
)
}
export default Login