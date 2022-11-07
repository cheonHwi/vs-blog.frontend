import React, { useContext, useState } from "react";
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
import AppContext from "../context/AppContext";

function Main() {
  const [selected, setSelected] = useState(null);
  const { selectedPost, postData, openPost } = useContext(AppContext);

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
            {postData.map((one, index) => (
              <Content {...one} key={index} />
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
            key={index}
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
      <RightHeader>
        {openPost.map((one) => {
          const pathArr = one.split("/").filter(Boolean);

          const data = pathArr.reduce((sum, current, index) => {
            const lastPath = pathArr.length - 1 === index;

            const target = sum.find(
              (one) =>
                one.title === current &&
                one.type === (lastPath ? "post" : "directory")
            );

            return lastPath ? target : target?.children;
          }, postData);

          return (
            <div className={selectedPost === one ? "selected" : ""}>
              {data.title}
            </div>
          );
        })}
      </RightHeader>
      <RightContent selected={selected}>{selectedPost}</RightContent>
    </Wrap>
  );
}

export default Main;

const Wrap = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftBar = styled.div`
  min-width: 3rem;
  height: 100vh;
  background-color: #333333;
`;

const LeftContent = styled.div`
  width: 320px;
  min-width: 320px;
  height: 100vh;
  background-color: #252526;
  padding: 10px;
  > p {
    /* 시계방향 */
    padding-bottom: 10px;
    color: #7a7a7a;
  }

  @media (max-width: 540px) {
    width: 100%;
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

const RightContent = styled.div`
  width: 100%;
  background-color: #1e1e1e;

  @media (max-width: 540px) {
    display: ${({ selected }) => (selected === null ? "block" : "none")};
  }

  > div:first-child {
    display: flex;
    overflow-x: hidden;
  }
`;

const RightHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;

  > div {
    width: 150px;
    padding: 5px 10px;
    background-color: #252526;

    &.selected {
      background-color: #1e1e1e;
    }
  }
`;
