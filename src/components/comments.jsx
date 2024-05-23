import { useContext, useState } from "react";
import CommentsData from "./comments-data";
import { ContextProvider } from "../context/DataContext";
import InputBox from "../ui/inputbox";
import Button from "../ui/button";
import uniqid from "uniqid";

function Comments() {
  const [comment, setComment] = useState({
    inputValue: "",
    addComments: [],
  });
  const { commentsData } = useContext(ContextProvider);

  const sendComment = function () {
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

    setComment({
      ...comment,
      addComments: commentsData.push(newComment),
    });

    setComment({ ...comment, inputValue: "" });
  };

  return (
    <div>
      <CommentsData commentsData={commentsData} />
      <div className="bg-white rounded-xl flex justify-between p-5 m-5 [&>*]:m-2">
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
  );
}

export default Comments;
