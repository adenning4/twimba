import {
  getLocalReplies,
  getLocalTweets,
  deleteLocalTweet,
  deleteLocalReply,
} from "./storage-functions.js";
import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

function handleLikeClick(tweetId) {
  const targetTweetObj = getTargetTweetObj(tweetId);

  if (targetTweetObj.isLiked) {
    targetTweetObj.likes--;
  } else {
    targetTweetObj.likes++;
  }
  targetTweetObj.isLiked = !targetTweetObj.isLiked;

  //create a local storage item for a liked item
  localStorage.setItem(
    `${tweetId} likes`,
    JSON.stringify({
      isLiked: targetTweetObj.isLiked,
      likes: targetTweetObj.likes,
    })
  );
}

function handleRetweetClick(tweetId) {
  const targetTweetObj = getTargetTweetObj(tweetId);

  if (targetTweetObj.isRetweeted) {
    targetTweetObj.retweets--;
  } else {
    targetTweetObj.retweets++;
  }
  targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;

  //create a local storage item for a retweeted item
  localStorage.setItem(
    `${tweetId} retweets`,
    JSON.stringify({
      isRetweeted: targetTweetObj.isRetweeted,
      retweets: targetTweetObj.retweets,
    })
  );
}

function handleReplyClick(replyId) {
  document.getElementById(`replies-${replyId}`).classList.toggle("hidden");
}

//create new function to handle replies to a post
function handlePostReply(tweetId) {
  const replyInput = document.getElementById(`tweet-reply-${tweetId}`);

  if (replyInput.value) {
    const targetTweetObj = getTargetTweetObj(tweetId);

    const newReply = {
      handle: `@Scrimba`,
      profilePic: `images/scrimbalogo.png`,
      tweetText: replyInput.value,
      uuid: uuidv4(),
    };
    targetTweetObj.replies.push(newReply);
    //add or append to the replies held in local storage
    if (getLocalReplies(tweetId) === null) {
      localStorage.setItem(`${tweetId} replies`, JSON.stringify([newReply]));
    } else {
      const appendedLocalReplies = [...getLocalReplies(tweetId)];
      appendedLocalReplies.push(newReply);
      localStorage.setItem(
        `${tweetId} replies`,
        JSON.stringify(appendedLocalReplies)
      );
    }
  }
}

function handleTweetBtnClick() {
  const tweetInput = document.getElementById("tweet-input");

  if (tweetInput.value) {
    const newTweet = {
      handle: `@Scrimba`,
      profilePic: `images/scrimbalogo.png`,
      likes: 0,
      retweets: 0,
      tweetText: tweetInput.value,
      replies: [],
      isLiked: false,
      isRetweeted: false,
      uuid: uuidv4(),
    };

    tweetsData.unshift(newTweet);
    tweetInput.value = "";

    //add a user created tweet to local storage
    //add or append to the tweets held in local storage
    if (getLocalTweets() === null) {
      // localStorage.setItem("local-tweets", JSON.stringify(newTweet));
      localStorage.setItem("local-tweets", JSON.stringify([newTweet]));
    } else {
      const appendedLocalTweets = [...getLocalTweets()];
      // const appendedLocalTweets = [getLocalTweets()];
      appendedLocalTweets.push(newTweet);
      localStorage.setItem("local-tweets", JSON.stringify(appendedLocalTweets));
    }
  }
}

function handleDeleteTweetClick(tweetId) {
  tweetsData.forEach((tweet, index) => {
    if (tweet.uuid === tweetId) {
      tweetsData.splice(index, 1);
      deleteLocalTweet(tweetId);
    }
  });
}

function handleDeleteReplyClick(replyId) {
  tweetsData.forEach((tweet) => {
    tweet.replies.forEach((reply, index) => {
      if (reply.uuid === replyId) {
        deleteLocalReply(replyId);
        tweet.replies.splice(index, 1);
      }
    });
  });
}

function getTargetTweetObj(tweetId) {
  return tweetsData.filter((tweet) => {
    return tweet.uuid === tweetId;
  })[0];
}

export {
  handleLikeClick,
  handleRetweetClick,
  handleReplyClick,
  handlePostReply,
  handleTweetBtnClick,
  handleDeleteTweetClick,
  handleDeleteReplyClick,
};
