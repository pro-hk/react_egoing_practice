import React from "react";

function TOC(props) {
  return (
    <nav>
      <ul>
        {props.data.map((item) => (
          <li key={item.id}>
            <a
              href={item.id}
              onClick={(e) => {
                e.preventDefault();
                props.onChangePage(item.id);
              }}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TOC;
