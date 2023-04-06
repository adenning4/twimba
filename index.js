// localStorage.clear();
import { tweetsData } from "./modules/data.js";
import {
  checkLocalLikes,
  checkLocalRetweets,
  checkLocalReplies,
  checkLocalTweets,
} from "./modules/storage-functions.js";

import {
  handleLikeClick,
  handleRetweetClick,
  handleReplyClick,
  handlePostReply,
  handleTweetBtnClick,
  handleDeleteTweetClick,
  handleDeleteReplyClick,
} from "./modules/handle-functions.js";

import { getFeedHtml } from "./modules/html-boilerplate.js";

document.addEventListener("click", function (e) {
  if (e.target.dataset.like) {
    handleLikeClick(e.target.dataset.like);
    render();
  } else if (e.target.dataset.retweet) {
    handleRetweetClick(e.target.dataset.retweet);
    render();
  } else if (e.target.dataset.reply) {
    handleReplyClick(e.target.dataset.reply);
    //add handler for the reply button
  } else if (e.target.dataset.postReply) {
    handlePostReply(e.target.dataset.postReply);
    render();
  } else if (e.target.id === "tweet-btn") {
    handleTweetBtnClick();
    render();
  } else if (e.target.dataset.deletetweet) {
    handleDeleteTweetClick(e.target.dataset.deletetweet);
    render();
  } else if (e.target.dataset.deletereply) {
    handleDeleteReplyClick(e.target.dataset.deletereply);
    render();
  }
});
checkLocalTweets();

tweetsData.forEach((tweet) => {
  checkLocalLikes(tweet);
  checkLocalRetweets(tweet);
  checkLocalReplies(tweet);
});

function render() {
  document.getElementById("feed").innerHTML = getFeedHtml();
}

render();
