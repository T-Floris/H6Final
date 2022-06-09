import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Input, AddButtonForm } from "./AddFormElements";
import IconButton from "../IconButton";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const AddList = (props) => {
  const ref = useRef(null);

  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const url = String(window.location.pathname);
  const lastSegment = url.split("/").pop();
  const CREATELIST_URL = `board/${lastSegment}/table/create`;

  //works
  const onSubmit = async (e) => {
    console.log("addList");
    e.preventDefault();
    e.stopPropagation();
    try {
      const response = await axiosPrivate.post(
        CREATELIST_URL,
        JSON.stringify({ name: value })
      );
      console.log(response.data);
      if (value) {
        props.onConfirm(value);
      }
      setValue("");
      setFocus(false);

      
    } catch (err) {
      console.log(err);
    }
    
  };


  return (
    <Container>
      <AddButtonForm onSubmit={onSubmit} maxWidth={props.maxWidth}>
        <Input
          ref={ref}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={
            focus || value ? props.focusPlaceholder : props.placeholder
          }
        />
        {value && (
          <IconButton.ButtonContainer top="4px">
            <IconButton
              onClick={onSubmit}
              iconType="confirm"
              disabled={!value}
            />
          </IconButton.ButtonContainer>
        )}
      </AddButtonForm>
    </Container>
  );
};

AddList.propTypes = {
  onConfirm: PropTypes.func,
  placeholder: PropTypes.string,
  focusPlaceholder: PropTypes.string,
  maxWidth: PropTypes.string,
};
export default AddList;
