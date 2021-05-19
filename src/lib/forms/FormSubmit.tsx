import axios, { AxiosResponse } from 'axios'
import React, {useRef, useEffect, ReactFragment, useState} from 'react'
import {Container, Row, Col, Form } from "reactstrap"
import {useRouter} from "next/router"
import ButtonP from "../units/ButtonP"
import AlertP from "../units/AlertP"
import ModelP from "../units/ModelP"
import {propMaster} from "../Interfaces/interfaces"
import queryString from "querystring"



interface Props extends propMaster{
/**This is Form input elements. do not add Form elemet thise get rendered inside the form itself */
  Inputs:ReactFragment
}

const  FormSubmit = ({curObj,curUri,Inputs, reset=()=>{} , onSuccess, onError, successCallBack, errorCallback, validation=()=>"", AxiosRequestConfig={}, triggerSubmit, triggerReset}:Props)=> {
    const butRef            = useRef<ButtonP>(null)
    const modRef            = useRef<ModelP>(null)
    const alerRef           = useRef<AlertP>(null)
    const [triggerSubmitCount, setTriggerSubmitCount] = useState(0)
    const [triggerResetCount, setTriggerResetCount] = useState(0)
    const [submitDisable, setSubmitDisable] = useState(false)

    const router            = useRouter();

    useEffect(() => {
        alerRef.current?.alertLight();
        return () => {
        
        }
    }, [curObj])

    useEffect(() => {
        if(triggerSubmitCount > 0){
            submitHandle(curUri, curObj, onSuccess, onError,validation);
        }
        setTriggerSubmitCount(triggerSubmitCount + 1)
        return () => { }
    }, [triggerSubmit])

    useEffect(() => {
        if(triggerResetCount > 0){
            reset();
        }

        setTriggerResetCount(triggerResetCount + 1)
        return () => {}
    }, [triggerReset])
  
    const  submitHandle =  async(_curUri:string, _curObj:typeof curObj, _onSuccess:typeof onSuccess, _onError:typeof onError, _validation:typeof validation)=>{
           let validationErrorMessage:string = "";

         
            try {
                modRef.current?.close();
                butRef.current?.showSpin();
                setSubmitDisable(true)
                alerRef.current?.alertLight();
                

                validationErrorMessage =_validation();
                if(validationErrorMessage !== ""){
                    alerRef.current?.alertError(validationErrorMessage);
                    butRef.current?.hideSpin();
                    setSubmitDisable(false)
                    return;
                }

                
                let res:AxiosResponse;
                 if( _curObj[0] === "GET"){
                    res = await axios.get(_curUri, AxiosRequestConfig).then(res=>res)
                }else if(_curObj[0] === "DELETE"){
                    res = await axios.delete(_curUri, AxiosRequestConfig).then(res=>res);
                }else if(_curObj[0] === "PUT"){
                    res= await axios.put(_curUri, _curObj[1], AxiosRequestConfig).then(res=>res);
                }else if(curObj[0] === "ACTION"){
                    // code to use router to push the page said
                    router.push(`${_curUri}/?${queryString.stringify(_curObj[1])}`);
                    butRef.current?.hideSpin();
                    setSubmitDisable(false)
                    alerRef.current?.alertSuccess("Successfully completed action");
                    return;
                }else{
                    // default method POST
                    res = await axios.post(_curUri, _curObj[1], AxiosRequestConfig).then(res=>res);
                }
                


                let _successMessage =  _onSuccess(res, successCallBack)
                
                butRef.current?.hideSpin();
                setSubmitDisable(false)
                alerRef.current?.alertSuccess(_successMessage);

                
                

            } catch (error) {
           
                let _errorMessage =  _onError(error, errorCallback);
               
                alerRef.current?.alertError(_errorMessage);
                butRef.current?.hideSpin();
                setSubmitDisable(false)
                
                
    
                
            }
        }
    return (
        <>


            <Row>
                <Col>
                <ModelP 
                    ref = {modRef}
                    Ok ={(e)=>{
                        submitHandle(curUri, curObj, onSuccess, onError,validation)
                        modRef.current?.close();
                    }}
                    modelText="Press Ok to Submit data to server \n Press cancel to exit"
                    modelTitle = "Do you want to submit Data ?"
                />
                <Form onSubmit={(e)=>{
                    e.preventDefault()
                    modRef.current?.show();
                }}><Row>
                    <Col>
                    {/* Form elements go here */}
                    {Inputs}
                        
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ButtonP 
                            text = "Submit"
                            ref={butRef}
                            disabled = {submitDisable}

                        />
                    </Col>
                    <Col>
                        <ButtonP 
                            text={"Reset"}
                            color={"warning"}
                            onClick={reset}
                            disabled={false}
                        />
                    </Col>
                </Row>
                    </Form>
                    <AlertP ref={alerRef}/>
                
                </Col>
            </Row>

        </>

 
    )
}

export default FormSubmit

