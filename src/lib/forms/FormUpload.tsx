import React, { ReactElement, useState, useRef } from "react";
import { Form, FormGroup, Input, Label, Row, Col } from "reactstrap";
import { ButtonP } from "../../index";
import axios, { AxiosError } from "axios";
import AlertP from "../units/AlertP";
import ModelP from "../units/ModelP";

interface Props {
  accept?: string;
  fileName: string;
  uri: string;
}
/**
 *
 *@props accept?: string;
 *@props fileName: string;
 *@props uri: string;
 *@returns ReactElement
 */
export default function FormUpload(props: Props): ReactElement {
  const [selectedFile, setSelectedFile] = useState<any>();
  const [previewSource, setPreviewSource] = useState<any>();
  const butRef = useRef<ButtonP>(null);
  const modRef = useRef<ModelP>(null);
  const alerRef = useRef<AlertP>(null);

  const onChangeHandler = (e: any) => {
    setSelectedFile(e.target.files[0]);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(e.target.files[0]);
    fileReader.onloadend = () => {
      setPreviewSource(fileReader.result);
    };
  };

  const submitHandler = async () => {
    try {
      modRef.current?.close();
      butRef.current?.showSpin();
      alerRef.current?.alertLight();

      const formData = new FormData();
      if (selectedFile != undefined) {
        formData.append("upload", selectedFile, props.fileName);

        let res = await axios.post(props.uri, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        butRef.current?.hideSpin();
        alerRef.current?.alertSuccess("Uploaded file");
      } else {
        throw (new Error().message = "File can not be null");
      }
    } catch (error) {
      console.log(error);
      alerRef.current?.alertError("Error Occured");
      butRef.current?.hideSpin();
    }
  };

  return (
    <>
      <Row>
        <Col>
          <ModelP
            ref={modRef}
            Ok={async () => {
              modRef.current?.close();
              await submitHandler();
            }}
            modelTitle="Do you want to Upload file ?"
            modelText="Press Ok to upload, Press cancel to exit"
          />
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              modRef.current?.show();
            }}
          >
            <FormGroup>
              <Label>Upload</Label>
              <Input
                type="file"
                accept={props.accept}
                multiple={false}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
              />
            </FormGroup>

            <FormGroup>
              <ButtonP disabled={false} text="Upload" />
            </FormGroup>
            <AlertP ref={alerRef} />
          </Form>
          {previewSource && <img src={previewSource} height="100rem" />}
        </Col>
      </Row>
    </>
  );
}
