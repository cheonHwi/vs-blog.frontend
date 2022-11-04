import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Main from "./pages/Main";
import AppContext from "./context/AppContext";
import { useEffect, useState } from "react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Main />}>
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
      {/* ... etc. */}
    </Route>
  )
);

function App() {
  const [selectedPost, setSelectedPost] = useState("");
  const [postData, setPostData] = useState([]);
  const [openPost, setOpenPost] = useState([]);

  useEffect(() => {
    setPostData([
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
                title: "Tech4",
              },
            ],
          },
        ],
      },
    ]);
  }, []);

  return (
    //  전역적으로 사용하는 변수, 함수들을 value에 정의한다.
    <AppContext.Provider
      value={{ selectedPost, setSelectedPost, postData, openPost, setOpenPost }}
    >
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
