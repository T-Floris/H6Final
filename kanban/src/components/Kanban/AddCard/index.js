import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { Container, Input, AddButtonForm } from "./AddFormElements";
import IconButton from "../IconButton";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { useEffect } from "react";

const AddCard = (props) => {
  const ref = useRef(null);

  const [value, setValue] = useState("");
  const [focus, setFocus] = useState(false);

  const axiosPrivate = useAxiosPrivate();
  const url = String(window.location.pathname);
  const lastSegment = url.split("/").pop();

  const GETCARDLIST_URL = `board/${lastSegment}/Table/get`;
  const [value1, setValue1] = useState({
    tableId: "",
  });

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getListName = async () => {
      try {
        const response = await axiosPrivate.get(GETCARDLIST_URL,  {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setValue1(response.data);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getListName();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

console.log(JSON.stringify(value1.tableId))
  
  const CREATELIST_URL = `board/${lastSegment}/table/${value1.tableId}/Card/create`;//need table id
  // const CREATELIST_URL = `board/${lastSegment}/table/c4f07e55-0283-431c-9e77-50c72a0ecc59/Card/create`;//need table id
  console.log(CREATELIST_URL)
  const onSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await axiosPrivate.post(CREATELIST_URL, JSON.stringify({ info: value }));
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

AddCard.propTypes = {
  onConfirm: PropTypes.func,
  placeholder: PropTypes.string,
  focusPlaceholder: PropTypes.string,
  maxWidth: PropTypes.string,
};
export default AddCard;
