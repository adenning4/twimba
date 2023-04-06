import { tweetsData } from "./data.js";

function getFeedHtml() {
  let feedHtml = ``;

  tweetsData.forEach(function (tweet) {
    let deleteTweetButtonAppearance = "hidden";

    if (tweet.handle === "@Scrimba") {
      deleteTweetButtonAppearance = "";
    }

    let likeIconClass = "";

    if (tweet.isLiked) {
      likeIconClass = "liked";
    }

    let retweetIconClass = "";

    if (tweet.isRetweeted) {
      retweetIconClass = "retweeted";
    }

    let repliesHtml = "";

    if (tweet.replies.length > 0) {
      tweet.replies.forEach(function (reply) {
        let deleteReplyButtonAppearance = "hidden";
        if (reply.handle === "@Scrimba") {
          deleteReplyButtonAppearance = "";
        }

        repliesHtml += `
<div class="tweet-reply">
    <div class="tweet-inner">
        <img src="${reply.profilePic}" class="profile-pic">
            <div>
                <p class="handle">${reply.handle}</p>
                <p class="tweet-text">${reply.tweetText}</p>
                <i class="fa-solid fa-trash ${deleteReplyButtonAppearance}"
                    data-deletereply="${reply.uuid}"
                    ></i>
            </div>
        </div>
</div>
`;
      });
    }

    feedHtml += `
<div class="tweet">
    <div class="tweet-inner">
        <img src="${tweet.profilePic}" class="profile-pic">
        <div>
            <p class="handle">${tweet.handle}</p>
            <p class="tweet-text">${tweet.tweetText}</p>
            <div class="tweet-details">
                <span class="tweet-detail">
                    <i class="fa-regular fa-comment-dots"
                    data-reply="${tweet.uuid}"
                    ></i>
                    ${tweet.replies.length}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-heart ${likeIconClass}"
                    data-like="${tweet.uuid}"
                    ></i>
                    ${tweet.likes}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-retweet ${retweetIconClass}"
                    data-retweet="${tweet.uuid}"
                    ></i>
                    ${tweet.retweets}
                </span>
                <span class="tweet-detail">
                    <i class="fa-solid fa-trash ${deleteTweetButtonAppearance}"
                    data-deletetweet="${tweet.uuid}"
                    ></i>
                </span>
            </div>   
        </div>            
    </div>
    <div class="hidden" id="replies-${tweet.uuid}">
        ${repliesHtml}
        <div class="tweet-reply tweet-reply-area">
			<textarea 
            placeholder="What do you think?" 
            id="tweet-reply-${tweet.uuid}"
            ></textarea>
		    <button id="reply-btn" data-post-reply="${tweet.uuid}">Reply</button>
		</div>
    </div>   
</div>
`;
  });
  return feedHtml;
}

export { getFeedHtml };
