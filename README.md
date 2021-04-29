# reactstrap-react-lib

This is build with typescript for using  with react and reactstrap

This contains forloowing lib modules
1. FormSubmit
2. React-Table
3. DeleteForm

## FormSubmit
This is for submiting data to server. it has inbuilt submit button and also reset button.
1. declare states as {} your component asign it curObj prop
2. asign your form submission uri to curUri prop
3. onSuccess prop is function which has two arguments first one is response from server and secons one is succusscalback function
4. onError prop is function which has two arguments first one is response from server and second one is Errorcalback function
5. successCalback is prop which has to passed in onSuccess function
6. errorCalback is prop which has to passed in onError function

```javascript
import{ButtonP, FormSubmit, FormDelete, SectioPanel,Sidebar} from "reactstrap-react-lib"
import React,{useState} from 'react'
import {Container, Row, Col, FormGroup, Input, Label} from "reactstrap"

function submitForm(props) {

    const initObj = {firstName:"", lastName : "", email : ""}//intial value sof inputs
    const [obj, setObj] = useState(initObj)
    return (
        <Container>
            {/* FormSubmit */}
            <Row>
                <Col>
                
                <FormSubmit
                    Inputs={
                        <>
                            <FormGroup>
                                <Label className="required">Firtname</Label>
                                <Input type="text" value={obj.firstName} onChange={(e)=>setObj({...obj, firstName : e.target.value})} required={true}/>
                            </FormGroup>
                            
                            <FormGroup>
                                <Label>lastName</Label>
                                <Input type="text" value={obj.lastName} onChange={(e)=>setObj({...obj, lastName : e.target.value})} required={true}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>email</Label>
                                <Input type="email" value={obj.email} onChange={(e)=>setObj({...obj, email : e.target.value})} required={true}/>
                            </FormGroup>

                        </>
                    }

                    curObj = {["POST", obj]} //"POST , "GET", "PUT", "DELETE", "ACTON"
                    curUri = "/api/auth/login" //login


                    onSuccess = {(res)=>{
                        return res.data.mes // mes is key of json sent from api
                    }}

                    onError={(err)=>{
                        return err.response.data
                    }
                    }
                    

                    validation ={()=>{
                        // return "validation error"
                        //if no wrror return ""
                       
                        return ""
                    }}

  
                    
                    reset={()=>setObj(initObj)}// this resets the inputs to intialstate
                    AxiosRequestConfig={{//axios config setting}}
                
                />
      }


```


## React-Table
This is react-table following code shows the implimentation.


```javascript
import React from 'react'
import {Row, Col, Container} from "reactstrap"
import {LinkP, Table} from "reactstrap-react-lib"



export default function table() {

    const columns = [
        {
            Header : "Id",
            accessor : "id",
            Cell : ({value})=> <LinkP link = {`/edit/${value}`} value = {value} />,
            dataType : "number"
            
    
        },
        {
            Header : "Name",
            accessor : "name",
            dataType : "string"

            
        },{
            Header : "Age",
            accessor : "age",
            dataType : "number"

        }
        ,{
            Header : "Date",
            accessor : "date",
            Cell : ({value})=> new Date(value).toDateString(),
            dataType : "Date"

        }
    ]

    const data  = [
        { id : 1, name : "umesh", age : 53,     date : "1969-09-29"},
        { id : 2, name : "Ramya", age : 38,     date : "1983-08-11"},
        { id : 3, name : "Pradyumna", age : 21, date : "1999-12-03"},
        { id : 4, name : "Prajnya", age : 21,   date : "1999-12-03"},
        { id : 5, name : "Nischita", age : 11,  date : "1999-01-02"},
    ]
    return (
        <>
            <Container>
                    <Row>
                        <Col>
                            <Table
                                columns={columns}
                                data={data}
                                filter= "Both"
                                // sort = {false}
                                

                            />
                        </Col>
                    </Row>
            </Container>
            
        </>

    )
}



```

