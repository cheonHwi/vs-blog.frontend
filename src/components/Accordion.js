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
      <AccordionContentWrap expanded={expanded}>
        {children}
      </AccordionContentWrap>
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
    user-select: none;
    padding-left: 5px;
  }
`;

const AccordionContentWrap = styled.div`
  max-height: ${({ expanded }) => (expanded ? "500px" : "0")};
  overflow: hidden;
  transition: ${({ expanded }) =>
    expanded ? "max-height 0.25s ease-in" : "max-height 0.15s ease-out"};

  margin-bottom: 5px;
  margin-left: 15px;
  user-select: none;
`;
