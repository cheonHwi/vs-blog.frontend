import React, { useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import {
  VscFile,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
} from "react-icons/vsc";
import Content from "../components/Content";

const tempData = [
  {
    type: "directory",
    title: "일상",
  },
  {
    type: "directory",
    title: "Tech",
    children: [
      {
        type: "post",
        title: "Tech1",
      },
      {
        type: "post",
        title: "Tech2",
      },
      {
        type: "directory",
        title: "Tech3",
        children: [
          {
            type: "post",
            title: "Tech3",
          },
          {
            type: "post",
            title: "Tech3",
          },
        ],
      },
    ],
  },
];

function Main() {
  const [selected, setSelected] = useState(null);

  const listArr = [
    {
      icon: <VscFile size={22.4} />,
      path: "EXPLORER",
      content: (
        <>
          <Accordion title="OPEN POSTS" isBold={true}>
            내요요요옹
          </Accordion>
          <Accordion title="VSCODE" isBold={true}>
            {tempData.map((one) => (
              <Content {...one} />
            ))}
          </Accordion>
        </>
      ),
    },
    {
      icon: <VscSearch size={22.4} />,
      path: "SEARCH",
    },
    {
      icon: <VscSourceControl size={22.4} />,
      path: "POSTING LOG",
    },
    {
      icon: <VscDebugAlt size={22.4} />,
      path: "RUN AND DEBUG",
    },
    {
      icon: <VscExtensions size={22.4} />,
      path: "EXTENSIONS",
    },
  ];

  return (
    <Wrap>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWrap
            selected={selected === index}
            onClick={() => {
              setSelected(index === selected ? null : index);
            }}
          >
            {one.icon}
          </IconWrap>
        ))}
      </LeftBar>

      {selected !== null && listArr[selected] && (
        <LeftContent>
          {/* 옵셔녈 체이닝 */}
          <p>{listArr[selected].path}</p>
          {listArr[selected].content}
        </LeftContent>
      )}
    </Wrap>
  );
}

export default Main;

const Wrap = styled.div`
  display: flex;
  height: 100vh;
  background-color: #fff;
`;

const LeftBar = styled.div`
  width: 3rem;
  height: 100%;
  background-color: #333333;
`;

const LeftContent = styled.div`
  width: 300px;
  height: 100%;
  background-color: #252526;
  padding: 10px;
  > p {
    /* 시계방향 */
    padding-bottom: 10px;
    color: #7a7a7a;
  }
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0 15px 0;
  cursor: pointer;

  border-left: ${({ selected }) => (selected ? 2 : 0)}px solid white;

  > svg {
    color: ${({ selected }) => (selected ? "#FFF" : "#7a7a7a")};
  }
`;
