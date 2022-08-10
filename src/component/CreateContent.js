import React from "react";

function CreateContent(props) {
  return (
    <article>
      <h2>Create</h2>
      <form
        action="/create_process"
        method="post"
        onSubmit={(e) => {
          e.preventDefault(); // 페이지 바뀌지 못하게..
          props.onSubmit(e.target[0].value, e.target[1].value);
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="desc" placeholder="description" />
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
    </article>
  );
}

export default CreateContent;
