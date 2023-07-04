import { ImageComponent } from "./ImageComponent.js";
import { Attachments, TaittsuDown } from "./TaittsuDown.js";
import { TweetComponent } from "./TweetComponent.js";
import { onAddPost } from "./taittsuu.js";

export const showTweetDialog = (content?: string) => {
  if (content != null) {
    (document.getElementById("taiitsuInput") as HTMLTextAreaElement)!.value =
      content;
  }

  Taittsuu.Post.showTaiitsuDialog();
};

export interface Tweet {
  content: string;
  created_at: string;
  id: number;
  is_verified: number;
  user_name: string;
  user_screenname: string;
}

export const installTweetContentPlus = () => {
  onAddPost((postElem, post) => {
    if (location.href.search("/status/") >= 0) {
      for (const a of postElem.find("a.post-link-post")) {
        const parent = a.parentNode!;
        const span = document.createElement("span");
        span.append(...a.childNodes);
        parent.replaceChild(span, a);
      }
    }

    const content = postElem.find(".post-content")[0];
    const contentWrap = $(content.parentElement!);
    const attachments = TaittsuDown.render(content);

    if (attachments.length) {
      contentWrap.after(Attachments(attachments));
    }
  });
};
