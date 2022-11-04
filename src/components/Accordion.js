import React, { useState } from "react";
import styled from "styled-components";
import { VscChevronRight, VscChevronDown } from "react-icons/vsc";

// 객체형 파라미터 구조분해할당
function Accordion({ title, children, isBold }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <AccordionWrap
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? (
          <VscChevronDown size={16} />
        ) : (
          <VscChevronRight size={16} />
        )}
        <span>{isBold ? <strong>{title}</strong> : title}</span>
      </AccordionWrap>
      {expanded && <AccordionContentWrap>{children}</AccordionContentWrap>}
    </>
  );
}

export default Accordion;

const AccordionWrap = styled.div`
  display: flex;
  align-items: center;
  color: white;
  /* font-weight: bold; */
  font-size: 0.8rem;
  padding: 5px 0;
  cursor: pointer;

  > span {
    padding-left: 5px;
    user-select: none;
  }
`;

const AccordionContentWrap = styled.div`
  padding-bottom: 5px;
  padding-left: 15px;
`;
