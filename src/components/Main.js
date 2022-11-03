import React, { useState } from "react";
import styled from "styled-components";
import {
  VscFile,
  VscSearch,
  VscSourceControl,
  VscDebugAlt,
  VscExtensions,
} from "react-icons/vsc";

const listArr = [
  {
    icon: <VscFile size={22.4} />,
    path: "post",
  },
  {
    icon: <VscSearch size={22.4} />,
    path: "tags",
  },
  {
    icon: <VscSourceControl size={22.4} />,
    path: "postingLog",
  },
  {
    icon: <VscDebugAlt size={22.4} />,
    path: "runAndDebug",
  },
  {
    icon: <VscExtensions size={22.4} />,
    path: "extensions",
  },
];

function Main() {
  const [selected, setSelected] = useState(null);
  return (
    <Wrap>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWrap
            selected={selected === index}
            onClick={() => {
              setSelected(index);
            }}
          >
            {one.icon}
          </IconWrap>
        ))}
      </LeftBar>
    </Wrap>
  );
}

export default Main;

const Wrap = styled.div`
  height: 100vh;
  background-color: #1e1e1e;
`;

const LeftBar = styled.div`
  width: 3rem;
  height: 100%;
  background-color: #333333;
`;

const IconWrap = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px 0 15px 0;
  cursor: pointer;

  > svg {
    color: ${({ selected }) => (selected ? "#FFF" : "#7a7a7a")};
  }
`;
