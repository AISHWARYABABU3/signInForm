import React, { Component } from 'react';
import { signin } from '../services/loginService';
import Input from './common/input';
import Joi from 'joi-browser';
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';


class SignInForm extends Component {
    state = {
        account : { email: "" , password: ""},
        errors: { }
    }

    //Defining the schema for input validation
    schema = {
        email: Joi.string().required().email().label('Email'),
        password: Joi.string().required().min(5).label('Password')
    };

    //This method is used to validate the input fields
    validate = () => {
        const options = {abortEarly: false};
        const {error} = Joi.validate(this.state.account, this.schema, options);
        if(!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }

    validateProperty = ({name ,value}) => {
        const object = { [name]: value };  //object to set only a single property dynamically
        const schema = { [name]: this.schema[name]}; //schema for a single property
        const { error } = Joi.validate(object, schema);
        return error ? error.details[0].message : null;
    }

    //This method is used to handle the form submit
    handleSubmit = e => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if(errors) return;

        this.doSubmit();
    };

    //This method is used to handle the change event of the input fields, 
    //inorder to get the inputs and update the state
    handleChange = ({currentTarget: input}) => {
        const errors = {...this.state.errors};
        const errorMessage =  this.validateProperty(input);
        //update the state errors
        if(errorMessage){
            errors[input.name] = errorMessage;
        } 
        else {
            delete errors[input.name];
        }
        //binding view
        const account = {...this.state.account}
        account[input.name] = input.value;
        
        this.setState({ account, errors })
    };

    //This method is for the service and errors
    doSubmit = async () => {
        const { account } = this.state;
        try {
            await signin(account.email, account.password) ; 
        } catch (error) {
            if (error.response && error.response.status === 400){
                const errors = {...this.state.errors};
                errors.email = error.response.data;
                this.setState({ errors });
                toast.error("Your credentials are not correct, please try again.");
            }
        }
    };

    render() { 
        const { account, errors } = this.state;
        return (
            <div>
                <h1 className ="text">Sign in</h1>
                <form onSubmit = {this.handleSubmit}>

                    {/* Imported the re-useable Input component */}
                    <Input name = "email" value = {account.email} label = "Email" onChange={this.handleChange} error={errors.email}/>
                    <Input name = "password" value = {account.password} label = "Password" onChange={this.handleChange} error={errors.password}/>

                    <div className ="checkboxlabel">
                        <input type = "checkbox" name="remember" id="remember" className ="checkboxbutton"/>
                        <label htmlFor="remember">Remember me?</label>
                    </div>
                    <button className = "signinbutton">Sign in</button>
                </form>
                <div className = "textalign">
                    <Link className= "linkstyle" to ="/forgotpassword">Forgot your password?</Link>
                </div>
                <div className = "textalign">
                    <label>Don't have an account? </label>
                    <Link className= "linkstyle" to ="/signup">Sign up</Link>
                </div>
                <div className = "textalign">
                    <Link className= "linkstyle" to ="/emailconfirmation">Resend email confirmation</Link>
                </div>
            </div>
          );
    }
}
 
export default SignInForm;
