import React, { useRef } from "react";
import CareerItem from "./CareerItem";
const CareerList = (props) => {
  const nextIdx = useRef(props.careerList.length ? props.careerList.length : 1);
  const addCareerItem = () => {
    const career = {
      id: nextIdx.current,
      career: "교내활동",
      careerName: "",
      startDate: "",
      endDate: "",
      state: "수료",
      content: "", // 200자 넣기 추가
    };
    props.setCareerList([...props.careerList, career]);
    nextIdx.current += 1;
  };
  const removeCareerItem = (i) => {
    props.setCareerList(props.careerList.filter((a) => a.id !== i));
  };

  return (
    <>
      {props.careerList &&
        props.careerList.map((item, i) => {
          return (
            <CareerItem
              item={item}
              index={i}
              key={item.id}
              length={props.careerList.length}
              addCareerItem={addCareerItem}
              removeCareerItem={removeCareerItem}
              view={props.view}
            />
          );
        })}
    </>
  );
};

export default CareerList;

CareerList.defaultProps = {
  view: false,
};
