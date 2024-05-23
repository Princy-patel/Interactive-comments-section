import React, { useCallback, useContext, useState } from "react";
import { ContextProvider } from "../context/DataContext";
import InputBox from "../ui/inputbox";
import Button from "../ui/button";

export default function CommentInfo({ data }) {
  // State to manage the input box visibility and the value of the reply input
  const [inputBox, setInputBox] = useState({
    showReplies: false,
    inputValue: "",
    parentName: "",
    isEdit: false,
  });

  // Context to get and set comments data
  const { commentsData, setCommentsData } = useContext(ContextProvider);

  // useCallback to memoize the updateLike function to avoid recreating it on each render
  const updateLike = useCallback(
    function (comments, operation) {
      // Update the like count for the targeted comment
      return comments.map((comment) => {
        if (comment.id === data.id) {
          return { ...comment, like: comment.like + operation };
        }

        // Recursively update the likes for nested replies
        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateLike(comment.replies, operation),
          };
        }
        return comment;
      });
    },
    [data.like] // Dependency array ensures function is recreated if data.id changes
  );

  // Handle upvote by increasing the like count
  const handleLike = function () {
    const updatedComment = updateLike(commentsData, 1);
    setCommentsData(updatedComment);
  };

  // Handle downvote by decreasing the like count
  const handleDislike = function () {
    const updatedComment = updateLike(commentsData, -1);
    setCommentsData(updatedComment);
  };

  // Recursive function to add a new reply to the targeted comment
  const updateReplies = function (comments) {
    // Creating a new reply object

    let newReply = {
      id: Date.now(),
      like: 0,
      img: "/avatars/image-amyrobson.png",
      name: "currentName",
      time: "Just now",
      comment: inputBox.inputValue,
      replies: [],
      parentId: data.id,
    };

    // Add the new reply to the targeted comment
    return comments.map((comment) => {
      if (comment.id === data.id) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
        // Recursively add the new reply to nested replies
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: updateReplies(comment.replies),
        };
      }

      return comment;
    });
  };

  // Handle the reply action by updating the comments data with the new reply
  const handleReply = () => {
    const repliesComments = updateReplies(commentsData);
    setCommentsData(repliesComments);

    // Reset input box state after adding the reply
    setInputBox({ showReplies: false, inputValue: "" });
  };

  const deleteComment = function () {
    const deleteData = commentsData.filter((comment) => comment.id !== data.id);
    setCommentsData(deleteData);
  };

  const editComment = function () {
    setInputBox({ ...inputBox, isEdit: true });
  };

  const updateComment = function () {
    console.log(inputBox);
  };

  return (
    <>
      <div className="bg-white rounded-xl flex gap-10 items-center p-5 m-5">
        <div className="[&>*]:text-xl [&>*]:p-1 [&>*]:font-medium [&>*]:text-slate-500 bg-slate-100 rounded-2xl p-2">
          <button onClick={handleLike}>+</button>
          <p className="!text-indigo-600">{data.like}</p>
          <button onClick={handleDislike}>-</button>
        </div>

        <div className="flex flex-col gap-[2.5vw] items-start w-full">
          <div className="flex justify-between w-full">
            <div className="flex items-center [&>*:not(:first-child)]:p-3">
              <img
                src={data.img}
                alt={data.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <span>
                <strong>{data.name}</strong>
              </span>
              {data.isYou && (
                <span className="text-white font-medium bg-indigo-700 !px-2 !py-0 rounded-sm">
                  You
                </span>
              )}
              <span className="text-slate-400 font-medium">{data.time}</span>
            </div>

            {data.isYou && (
              <>
                <p
                  className="flex items-center text-indigo-700 font-semibold cursor-pointer"
                  onClick={editComment}
                >
                  <span className="p-[5px]">
                    <img src="/icon-edit.svg" alt="edit" />
                  </span>
                  Edit
                </p>
                <p
                  className="flex items-center text-red-600 font-semibold cursor-pointer"
                  onClick={deleteComment}
                >
                  <span className="p-[5px]">
                    <img src="/icon-delete.svg" alt="edit" />
                  </span>
                  Delete
                </p>
              </>
            )}

            <p
              className="flex items-center text-indigo-600 font-medium cursor-pointer"
              onClick={() =>
                setInputBox({ ...inputBox, showReplies: !inputBox.showReplies })
              }
            >
              <span className="p-[5px]">
                <img src="/icon-reply.svg" alt="edit" />
              </span>
              Reply
            </p>
          </div>

          <div className="w-full">
            {inputBox.isEdit ? (
              <div className="flex [&>*]:m-2">
                <InputBox
                  handleInput={(e) =>
                    setInputBox({ ...inputBox, inputValue: e.target.value })
                  }
                  value={inputBox.inputValue}
                  placeholderText="Update your comment"
                />
                <Button event={updateComment}>UPDATE</Button>
              </div>
            ) : (
              <p className="text-left text-slate-400 font-medium">
                {/* {inputBox.parentName && inputBox.parentName.length > 0 && (
                <strong className="text-black">@{inputBox.parentName}</strong>
              )} */}

                {data.comment}
              </p>
            )}
          </div>
        </div>
      </div>

      {inputBox.showReplies && (
        <div className="bg-white rounded-xl flex justify-between p-5 m-5 [&>*]:m-2">
          <img
            src={data.img}
            alt={data.name}
            width={60}
            height={60}
            className="rounded-full flex-shrink-0"
          />
          <div className="flex-grow">
            <InputBox
              handleInput={(e) =>
                setInputBox({
                  ...inputBox,
                  inputValue: e.target.value,
                })
              }
              value={inputBox.inputValue}
              placeholderText="Do the Reply"
            />
          </div>
          <Button event={handleReply}>REPLY</Button>
        </div>
      )}
    </>
  );
}
