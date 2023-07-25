import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import MajorItem from "./MajorItem";
const SchoolItem = ({
  item,
  index,
  length,
  addSchoolItem,
  removeSchoolItem,
  view,
}) => {
  const [school, setSchool] = useState(item.school || "");
  const [schoolName, setSchoolName] = useState(item.schoolName || "");
  const [startDate, setStartDate] = useState(item.startDate || "");
  const [endDate, setEndDate] = useState(item.endDate || "");
  const [state, setState] = useState(item.state || "");
  const [MajorList, setMajorList] = useState([]);

  useEffect(() => {
    if (school === "대학교")
      setMajorList([
        {
          idx: 0,
          unit: "주전공",
          major: "",
        },
      ]);
    else setMajorList([]);
  }, [school]);
  const nextMajorIdx = useRef(item.majorList ? item.majorList.length : 1);
  const addUnivMajorItem = () => {
    const majorItem = {
      idx: nextMajorIdx.current,
      unit: "주전공",
      major: "",
    };
    setMajorList((current) => [...current, majorItem]);
    nextMajorIdx.current += 1;
  };
  const removeUnivMajorItem = (i) => {
    setMajorList(MajorList.filter((a) => a.idx !== i));
  };

  useEffect(() => {
    item.majorList = [...MajorList];
    console.log(item.majorList);
  }, [MajorList]);

  return (
    <>
      <InputForm>
        <SchoolSelect
          name="school"
          onChange={(e) => {
            item.school = e.target.value;
            setSchool(e.target.value);
          }}
          value={school}
          disabled={view}
        >
          <option name="school" value="고등학교">
            고등학교
          </option>
          <option name="school" value="대학교">
            대학교
          </option>
        </SchoolSelect>
        <Input
          placeholder="학교명"
          size="small"
          width="150px"
          onChange={(e) => {
            item.schoolName = e.target.value;
            setSchoolName(e.target.value || "");
          }}
          value={schoolName}
          disabled={view}
        />
        <DatePicker
          placeholderText="입학 날짜"
          dateFormat="yyyy-MM"
          shouldCloseOnSelect
          selected={startDate}
          onChange={(date) => {
            console.log(date);
            setStartDate(date);
            item.startDate = date;
          }}
          showMonthDropdown
          showYearDropdown
          showIcon
          disabled={view}
        />
        <div style={{ display: "flex", alignItems: "center" }}>~</div>
        <DatePicker
          selected={endDate}
          placeholderText="졸업 날짜"
          dateFormat="yyyy-MM"
          minDate={startDate}
          shouldCloseOnSelect
          onChange={(date) => {
            setEndDate(date);
            item.endDate = date;
          }}
          showMonthDropdown
          showYearDropdown
          showIcon
          disabled={view}
        />

        <SchoolSelect
          name="state"
          onChange={(e) => {
            item.state = e.target.value;
            setState(e.target.value);
          }}
          value={state}
          disabled={view}
        >
          <option name="state" value="졸업">
            졸업
          </option>
          <option name="state" value="졸업예정">
            졸업예정
          </option>
          <option name="state" value="재학">
            재학
          </option>
          <option name="state" value="휴학">
            휴학
          </option>
          <option name="state" value="자퇴">
            자퇴
          </option>
        </SchoolSelect>
        {(index !== 0) & !view ? (
          <Icon>
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => {
                removeSchoolItem(item.idx);
              }}
            />
          </Icon>
        ) : (
          ""
        )}
        {(index === length - 1) & !view ? (
          <Icon>
            <FontAwesomeIcon icon={faPlusCircle} onClick={addSchoolItem} />
          </Icon>
        ) : (
          ""
        )}
      </InputForm>
      {school === "대학교"
        ? MajorList.map((majorItem, idx) => {
            return (
              <Form key={majorItem.idx}>
                <MajorItem
                  item={majorItem}
                  index={idx}
                  length={MajorList.length}
                  addUnivMajorItem={addUnivMajorItem}
                  removeUnivMajorItem={removeUnivMajorItem}
                  view={view}
                />
              </Form>
            );
          })
        : ""}
    </>
  );
};

export default SchoolItem;

const InputForm = styled.div`
  display: flex;
  min-width: 25rem;
  justify-content: space-between;
  margin-bottom: 5px;
  gap: 10px;
  height: 3rem;
`;
const SchoolSelect = styled.select`
  min-width: 9rem;
  text-align: center;
  background-color: #eaeaea;
  height: 2.7rem;
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
  margin-bottom: 10px;
  gap: 10px;
  height: 3rem;
`;
const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2f5383;
  height: 100%;
  svg {
    height: 2rem;
    cursor: pointer;
  }
`;
