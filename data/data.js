const comments = [
  {
    id: 1,
    like: 0,
    img: "/avatars/image-amyrobson.png",
    name: "amyrobson",
    time: "1 month ago",
    comment:
      "Impressive! Though it seems the drag feature could be improved. But overall it look incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    replies: [],
  },
  {
    id: 2,
    like: 0,
    img: "/avatars/image-juliusomo.png",
    name: "maxblagun",
    time: "2 weeks ago",
    comment:
      "Woah, your project looks awesome! How long have you been coding for? I'm still new. but think I want to dive into react as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    replies: [
      {
        id: 1.1,
        like: 0,
        parentId: 2,
        img: "/avatars/image-maxblagun.png",
        name: "remsesmiron",
        time: "1 week ago",
        comment:
          "If you're still new. I'd recommend focusing on the fundamentals of HTML, CSS and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        replies: [],
      },
      {
        id: 1.2,
        like: 0,
        parentId: 2,
        img: "/avatars/image-ramsesmiron.png",
        name: "juliusomo",
        time: "2 days ago",
        comment:
          "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constants.",
        replies: [],
      },
    ],
  },
];

export default comments;
