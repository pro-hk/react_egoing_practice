import React, { useState } from "react";
import Subject from "./component/Subject";
import TOC from "./component/TOC";
import ReadContent from "./component/ReadContent";
import Control from "./component/Control";
import CreateContent from "./component/CreateContent";
import UpdateContent from "./component/UpdateContent";
import "./App.css";

function App() {
  const [state, setState] = useState({
    mode: "welcome",
    max_content_id: 3,
    selected_content_id: 1,
    subject: { title: "WEB", sub: "World Wide Web!" },
    welcome: { title: "Welcome", desc: "Hello, React!!" },
    contents: [
      { id: 1, title: "HTML", desc: "HTML is for information" },
      { id: 2, title: "CSS", desc: "CSS is for desing" },
      { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
    ],
  });

  function getReadContent() {
    for (var i = 0; i < state.contents.length; i++) {
      var data = state.contents[i];
      if (data.id === state.selected_content_id) {
        return data;
      }
    }
  }

  var _title,
    _desc,
    _article = null;
  if (state.mode === "welcome") {
    _title = state.welcome.title;
    _desc = state.welcome.desc;
    _article = <ReadContent title={_title} desc={_desc} />;
  } else if (state.mode === "read") {
    var _content = getReadContent();
    _article = <ReadContent title={_content.title} desc={_content.desc} />;
  } else if (state.mode === "create") {
    _article = (
      <CreateContent
        onSubmit={(_title, _desc) => {
          var max_id = state.max_content_id + 1;
          // 원본 데이터를 수정하지 않음
          var _contents = state.contents.concat({
            id: max_id,
            title: _title,
            desc: _desc,
          });
          setState({
            ...state,
            max_content_id: max_id,
            contents: _contents,
            mode: "read",
            selected_content_id: max_id,
          });
        }}
      />
    );
  } else if (state.mode === "update") {
    _content = getReadContent();
    _article = (
      <UpdateContent
        data={_content}
        onSubmit={(_id, _title, _desc) => {
          var _contents = Array.from(state.contents);
          for (var i = 0; i < _contents.length; i++) {
            if (_contents[i].id === _id) {
              _contents[i] = { id: _id, title: _title, desc: _desc };
              break;
            }
          }
          setState({
            ...state,
            contents: _contents,
            mode: "read",
          });
        }}
      />
    );
  }

  return (
    <div className="App">
      <Subject
        title={state.subject.title}
        sub={state.subject.sub}
        onChangePage={() => {
          setState({ ...state, mode: "welcome" });
        }}
      />
      <TOC
        data={state.contents}
        onChangePage={(id) => {
          setState({ ...state, mode: "read", selected_content_id: Number(id) });
        }}
      />
      <Control
        onChangeMode={(_mode) => {
          if (_mode === "delete") {
            if (window.confirm("really?")) {
              var _contents = Array.from(state.contents);
              for (var i = 0; i < state.contents.length; i++) {
                if (_contents[i].id === state.selected_content_id) {
                  _contents.splice(i, 1);
                  break;
                }
              }
              setState({ ...state, mode: "welcome", contents: _contents });
              alert("deleted!");
            }
          } else {
            setState({ ...state, mode: _mode });
          }
        }}
      />
      {_article}
    </div>
  );
}

export default App;
