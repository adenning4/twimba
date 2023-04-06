import { tweetsData } from "./data.js";

function checkLocalLikes(tweet) {
  if (localStorage.getItem(`${tweet.uuid} likes`)) {
    const localItem = JSON.parse(localStorage.getItem(`${tweet.uuid} likes`));
    tweet.likes = localItem.likes;
    tweet.isLiked = localItem.isLiked;
  }
}

//check local storage, if there is something there, update the data
function checkLocalRetweets(tweet) {
  if (localStorage.getItem(`${tweet.uuid} retweets`)) {
    const localItem = JSON.parse(
      localStorage.getItem(`${tweet.uuid} retweets`)
    );
    tweet.retweets = localItem.retweets;
    tweet.isRetweeted = localItem.isRetweeted;
  }
}

function checkLocalReplies(tweet) {
  if (getLocalReplies(tweet.uuid)) {
    getLocalReplies(tweet.uuid).forEach((reply) => {
      tweet.replies.push(reply);
    });
  }
}

function getLocalReplies(tweetId) {
  if (localStorage.getItem(`${tweetId} replies`)) {
    const localReplies = JSON.parse(localStorage.getItem(`${tweetId} replies`));
    return localReplies;
  } else {
    return null;
  }
}

function checkLocalTweets() {
  if (getLocalTweets()) {
    getLocalTweets().forEach((tweet) => {
      tweetsData.unshift(tweet);
    });
  }
}

function getLocalTweets() {
  if (localStorage.getItem(`local-tweets`)) {
    const localTweets = JSON.parse(localStorage.getItem(`local-tweets`));
    return localTweets;
  } else {
    return null;
  }
}

function deleteLocalTweet(tweetId) {
  let currentLocalTweets = getLocalTweets();
  currentLocalTweets.forEach((tweet, index) => {
    if (tweet.uuid === tweetId) {
      currentLocalTweets.splice(index, 1);
    }
  });
  if (currentLocalTweets.length) {
    localStorage.setItem("local-tweets", JSON.stringify(currentLocalTweets));
  } else {
    localStorage.removeItem("local-tweets");
  }
}

function deleteLocalReply(replyId) {
  //find the specific reply, then look up 4 parent elements to find the parent tweet id, slice off the tweet uuid
  const parentTweetId = document
    .querySelector(`i[data-deletereply="${replyId}"]`)
    .parentElement.parentElement.parentElement.parentElement.id.slice(8);

  let currentLocalReplies = getLocalReplies(parentTweetId);
  currentLocalReplies.forEach((reply, index) => {
    if (reply.uuid === replyId) {
      currentLocalReplies.splice(index, 1);
    }
  });
  if (currentLocalReplies.length) {
    localStorage.setItem(
      `${parentTweetId} replies`,
      JSON.stringify(currentLocalReplies)
    );
  } else {
    localStorage.removeItem(`${parentTweetId} replies`);
  }
}

export {
  checkLocalLikes,
  checkLocalRetweets,
  checkLocalReplies,
  getLocalReplies,
  getLocalTweets,
  checkLocalTweets,
  deleteLocalTweet,
  deleteLocalReply,
};
