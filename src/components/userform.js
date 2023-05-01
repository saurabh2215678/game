import React, { useState } from "react";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import logoImg from '../assets/images/logo.png';
import logoBottom from '../assets/images/lobo_bottom.png';
import Button from "./button";

const UserSchema = Yup.object().shape({
    Name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    organization: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
  });

const UserForm = ({setUser}) => {


    return (
        <div className="rmc-home">
            <div className="container">
                <div className="logo_wrapper">
                    <a href="#" className="logo">
                        <img src={logoImg} alt="" />
                    </a>
                </div>
                <div className="text-center">
                    <h3 className="font39 fw800 color_theme my-4">Implementing Respectful Maternity Care (RMC) in Healthcare Facilities</h3>
                    <h3 className="font37 fw700 color_secondary_dark">Get your quiz on!</h3>
                    <p className="font21 fw500 color_dark gl_txt">A glimpse into the first-of-its-kind, Certified <br/> E-Learning Course.</p>
                </div>
                <Formik
                initialValues={{
                    Name: '',
                    organization: '',
                    email: '',
                }}
                validationSchema={UserSchema}
                onSubmit={values => {
                // same shape as initial values
                setUser(values);
                console.log(values);
                }}
                >
                {({ errors, touched }) => (
                    <div className="box">
                        <Form className="user_form" autoComplete="off" >
                            <div className="form_item mb-3">
                                <div className={`form-floating ${errors.Name && touched.Name ? 'is-invalid' : ''}`}>
                                    <Field 
                                        type="text" 
                                        className={`form-control ${errors.Name && touched.Name ? 'is-invalid' : ''}`} 
                                        name="Name" 
                                        placeholder="Please enter your name" 
                                        autoComplete="off" 
                                    />
                                    <label>Your name</label>
                                </div>
                                {errors.Name && touched.Name ? (
                                    <div className="invalid-feedback">{errors.Name}</div>
                                ) : null}
                            </div>
                            
                            <div className="form_item mb-3">
                                <div className={`form-floating ${errors.organization && touched.organization ? 'is-invalid' : ''}`}>
                                    <Field 
                                        type="text" 
                                        className={`form-control ${errors.organization && touched.organization ? 'is-invalid' : ''}`} 
                                        name="organization" 
                                        placeholder="Organization name" 
                                        autoComplete="off" 
                                    />
                                    <label>Organization name</label>
                                </div>
                                {errors.organization && touched.organization ? (
                                    <div className="invalid-feedback">{errors.organization}</div>
                                ) : null}
                            </div>
                            
                            <div className="form_item mb-3">
                                <div className={`form-floating ${errors.email && touched.email ? 'is-invalid' : ''}`}>
                                    <Field 
                                        type="text" 
                                        className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`} 
                                        name="email" 
                                        placeholder="Email address" 
                                        autoComplete="off" 
                                    />
                                    <label>Email address</label>
                                </div>
                                {errors.email && touched.email ? (
                                    <div className="invalid-feedback">{errors.email}</div>
                                ) : null}
                            </div>

                            <div className="text-center mt-5">
                                <p className="font26 color_theme">Are you ready?</p>
                                <Button type="submit" className="btn font35 fw500">Start Now</Button>
                            </div>
                            
                        </Form>
                    </div>
                )}
                </Formik>
                <div className="text-center">
                    <p className="font22">Supported by:</p>
                    <img className="bottom_logo mb-4" src={logoBottom} alt="" />
                    <p className="font22 mb-0">This training program is developed in partnership with</p>
                    <p className="font25 fw700">Aastrika Foundation</p>
                </div>
            </div>
        </div>
    )
}
export default UserForm;