import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import AppContext from "../context/AppContext";

function Search() {
  const { postData, setSelectedTag } = useContext(AppContext);
  const [tagData, setTagData] = useState([
    {
      tagTitle: "Tech",
      count: 3,
      postArray: [],
    },
    {
      tagTitle: "일상",
      count: 3,
      postArray: [],
    },
    {
      tagTitle: "잡것",
      count: 3,
      postArray: [],
    },
  ]);

  useEffect(() => {
    const tempArr = [];
    searchTagFunc(postData);
    function searchTagFunc(nowPostDataArr) {
      nowPostDataArr.map((nowPostData) => {
        if (nowPostData.type === "post") {
          nowPostData.data.tag?.map((tag) => {
            const tempTarget = tempArr.find((temp) => tag === temp.tagTitle);

            if (tempTarget) {
              tempTarget.count += 1;
            } else {
              tempArr.push({
                tagTitle: "Tech",
                count: 3,
                postArray: [],
              });
            }
          });
        } else {
          nowPostData.children && searchTagFunc(nowPostData.children);
        }
      });
    }
    setTagData(tempArr);
  }, [postData]);

  return (
    <Accordion title="Tags" initialExpanded={true} isBold>
      <TagWrap>
        {tagData.map((one, index) => (
          <Tag
            key={index}
            onClick={() => {
              setSelectedTag(one.tagTitle);
            }}
          >
            {one.tagTitle} <span> {one.count}</span>
          </Tag>
        ))}
      </TagWrap>
    </Accordion>
  );
}

export default Search;

const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.third};
  cursor: pointer;
  k &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }

  > span {
    /* color: ${({ theme }) => theme.color.second}; */
    color: red;
  }
`;
