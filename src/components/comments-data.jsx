import React, { Fragment } from "react";
import CommentInfo from "./comments-info";

function CommentsData({ commentsData }) {
  return (
    <>
      {commentsData.map((comment) => (
        <Fragment key={comment.id}>
          <CommentInfo data={comment} />
          {comment.replies && comment.replies.length > 0 && (
            <div className="ml-[10vw]">
              <CommentsData commentsData={comment.replies} />
            </div>
          )}
        </Fragment>
      ))}
    </>
  );
}

export default CommentsData;
