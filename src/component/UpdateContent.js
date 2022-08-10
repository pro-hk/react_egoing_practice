import React, { useState } from "react";

function UpdateContent(props) {
  const [data, setData] = useState(props.data);
  function inputFormHandler(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <article>
      <h2>Update</h2>
      <form
        action="/create_process"
        method="post"
        onSubmit={(e) => {
          e.preventDefault(); // 페이지 바뀌지 못하게..
          props.onSubmit(data.id, data.title, data.desc);
        }}
      >
        <input type="hidden" name="id" value={data.id} />
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={data.title}
            onChange={inputFormHandler}
          />
        </p>
        <p>
          <textarea
            name="desc"
            placeholder="description"
            value={data.desc}
            onChange={inputFormHandler}
          />
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
    </article>
  );
}

export default UpdateContent;
