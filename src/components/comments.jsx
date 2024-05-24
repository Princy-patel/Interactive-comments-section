import { useContext, useState } from "react";
import CommentsData from "./comments-data";
import { ContextProvider } from "../context/DataContext";
import InputBox from "../ui/inputbox";
import Button from "../ui/button";
import uniqid from "uniqid";

function Comments() {
  // State to manage the input value, added comments, error message, and input box visibility
  const [comment, setComment] = useState({
    inputValue: "",
    addComments: [],
    errorMessage: "",
    isInputBox: null,
  });

  // Get comments data from the context
  const { commentsData } = useContext(ContextProvider);

  // Function to send a new comment
  const sendComment = function () {
    if (comment.inputValue.trim().length === 0) {
      setComment({ ...comment, errorMessage: "Please enter valid comment!" });
      return;
    }
    // Create a new comment object with necessary properties
    const newComment = {
      id: uniqid(),
      like: 0,
      img: "/avatars/image-amyrobson.png",
      name: "Princy Patel",
      time: "Just now",
      comment: comment.inputValue,
      replies: [],
      isYou: true,
    };

    // Check if the input value is not empty
    if (comment.inputValue.trim().length > 0) {
      setComment({
        ...comment,
        addComments: commentsData.push(newComment), //// Add the new comment to the comments data
        inputValue: "", // Reset the input value
        errorMessage: "", // Clear any previous error message
      });
    }
  };

  return (
    <>
      <CommentsData commentsData={commentsData} />
      <div className="bg-white rounded-xl flex flex-col justify-between p-5 m-5">
        {comment.errorMessage && comment.inputValue.length <= 0 && (
          <span className="text-left ml-2 text-red-600">
            {comment.errorMessage}
          </span>
        )}

        <div className="flex [&>*]:m-2">
          <InputBox
            placeholderText="Enter your comment"
            handleInput={(e) =>
              setComment({ ...comment, inputValue: e.target.value })
            }
            value={comment.inputValue}
          />
          <Button event={sendComment}>SEND</Button>
        </div>
      </div>
    </>
  );
}

export default Comments;
