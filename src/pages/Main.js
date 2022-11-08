import React, { useContext, useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import {
  VscFile,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
  VscClose,
} from "react-icons/vsc";
import Content from "../components/Content";
import AppContext from "../context/AppContext";
import { getPostOne } from "../common/common.function";
import PostWrap from "../components/PostWrap";

function Main() {
  const [selected, setSelected] = useState(null);
  const { setSelectedPost, selectedPost, postData, setOpenPost, openPost } =
    useContext(AppContext);

  const listArr = [
    {
      icon: <VscFile size={22.4} />,
      path: "EXPLORER",
      content: (
        <>
          <Accordion title="OPEN POSTS" initialExpanded={true} isBold={true}>
            {openPost.map((one, index) => {
              const data = getPostOne(postData, one);

              return (
                <PostWrap
                  path={data.path}
                  title={data.title}
                  isClose={true}
                  key={index}
                ></PostWrap>
              );
            })}
          </Accordion>
          <Accordion title="VSCODE" initialExpanded={true} isBold={true}>
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
      <RightWrap selected={selected}>
        <RightHeader>
          {openPost.map((one, index) => {
            const data = getPostOne(postData, one);

            return (
              <div
                className={selectedPost === one ? "selected" : ""}
                onClick={() => {
                  setSelectedPost(data.path);
                }}
                key={index}
              >
                📝{data.title}
                <span
                  onClick={(e) => {
                    e.stopPropagation();

                    const openPostFilter = openPost.filter(
                      (one) => one !== data.path
                    );
                    setOpenPost(openPostFilter);

                    setSelectedPost(
                      openPostFilter.length !== 0 ? openPostFilter[0] : null
                    );
                  }}
                >
                  <VscClose />
                </span>
              </div>
            );
          })}
        </RightHeader>
        <RightContent>{selectedPost}</RightContent>
      </RightWrap>
    </Wrap>
  );
}

export default Main;

const Wrap = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftBar = styled.div`
  min-width: 50px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.third};
`;

const LeftContent = styled.div`
  width: 320px;
  min-width: 320px;
  height: 100vh;
  background-color: ${({ theme }) => theme.color.secondary};
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

  border-left: ${({ theme, selected }) =>
    `${selected ? 2 : 0}px solid ${theme.color.text}`};

  > svg {
    color: ${({ theme, selected }) => `${selected ? "#FFF" : "#7a7a7a"}`};
  }
`;

const RightContent = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  /* background-color: #1e1e1e; */
  background-color: ${({ theme }) => theme.color.primary};

  > div:first-child {
    display: flex;
    overflow-x: hidden;
  }
`;

const RightHeader = styled.div`
  width: 100%;
  height: 50px;
  line-height: 25px;
  display: flex;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.color.secondary};

  > div {
    width: 150px;
    padding: 5px 10px;
    background-color: ${({ theme }) => theme.color.secondary};
    position: relative;

    &.selected {
      background-color: ${({ theme }) => theme.color.primary};
      ${({ theme }) => theme.color.primary}
    }

    &:hover > span {
      display: block;
    }

    &:not(.selected) > span {
      display: none;
    }

    > span {
      position: absolute;
      right: 5px;
      top: 7px;
      cursor: pointer;
    }
  }

  ::-webkit-scrollbar-thumb {
    display: none;
  }

  &:hover::-webkit-scrollbar-thumb {
    display: block;
  }
`;

const RightWrap = styled.div`
  width: ${({ selected }) =>
    selected === null ? "calc(100% - 50px);" : "calc(100% - 320px - 50px);"};

  @media (max-width: 540px) {
    display: ${({ selected }) => (selected === null ? "block" : "none")};
  }
`;
