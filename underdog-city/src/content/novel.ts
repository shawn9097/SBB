export type Chapter = {
  slug: string;
  label: string;
  title: string;
  available: boolean;
  body?: string[];
};

export const novelMeta = {
  title: "Underdog City",
  logline:
    "The world throws people away. Down here, the broken discover that broken things hold the most power — and build a kingdom out of everything that was discarded.",
  blurb: [
    "Above, the Halo gleams — and the Sainted decide who has worth. When they decide you have none, you are Dropped.",
    "Below is Underdog City: grime and neon and the cast-off. The most thrown-away person in it died at the bottom — and something gold and patient and very, very angry refused to let him stay dead.",
    "They wanted a monster. He's going to be the best one they ever made.",
  ],
};

export const chapters: Chapter[] = [
  {
    slug: "prologue",
    label: "Prologue",
    title: "A Minute of Blood",
    available: true,
    body: [
      "I've got maybe a minute of blood left in me, and I'm going to waste it on a lie.",
      "\"Run,\" I tell her. \"I'm fine. Go.\"",
      "I'm not fine. I'm flat on my back in a service corridor sixty levels under the Halo, and the warmth spreading beneath me is the last warm thing I'm ever going to feel. We both know it. But she doesn't move — she never does what she's told — so I say it again, uglier this time, because ugly is the only thing that's ever made her listen.",
      "\"Go. Before the bell stops ringing.\"",
      "High above us, muffled through a mile of steel and money, the Halo is ringing its victory bell. Clean. Bright. The sound they make when they've decided a problem's been solved. Right now, somewhere up there in all that light, a man with very clean boots is being handed a medal for what he just did to me. By morning the whole city will have the story. The monster crawled up out of the dark. The hero put it down. Sleep well.",
      "The man with the clean boots is already gone. He didn't even stay to watch me fall. That's the part that should make me angry, and it does — but anger costs blood, and I'm running low.",
      "She's crying. She's got both hands pressed to the hole in me like she can keep the life inside with her fingers. She can't. She knows she can't. She's doing it anyway. That's her whole problem, right there. That's exactly why I'd do it again.",
      "\"Listen to me.\" My voice is going wrong now — thick, far away, like it belongs to someone in the next room. \"They think you died down here too. Keep it that way.\"",
      "She says my name. I feel it more than hear it. It lands somewhere in my chest and cracks straight down the middle.",
      "I made her a promise once. I can't remember the words anymore, only the weight of them, only the look on her face when I said them. I told her that whatever they turned me into — whatever the world saw when it looked at me — I would never be the monster she could see.",
      "I'm about to break that promise. I can feel it coming the way you feel a storm in your teeth.",
      "She takes my hand. Presses something into it — small, hard, warm from her grip — and folds my fingers shut around it like a secret she's trusting me to keep alive when she can't. I try to look at it. My eyes won't go where I send them.",
      "\"Hold on,\" she whispers. \"Please. Just hold on.\"",
      "I want to. God help me, I want to.",
      "The cold comes up through the warm. The corridor lights slide from gold to white to gone. The last thing left in the world is her face, and even that's pulling away from me now, the edges blurring, the name behind it dissolving like a word said too many times—",
      "—and then there's nothing.",
      "And the nothing is almost a mercy.",
      "So that's it, I think. That's dying. Smaller than I expected.",
      "I'm wrong.",
      "Here's what nobody tells you about the bottom: it isn't the end of the fall. It's just the floor of the place they're allowed to throw you. And some of what lands down there doesn't have the decency to stay dead.",
      "Something moves behind my ribs. Something that wasn't there a minute ago.",
      "Something gold. And patient. And very, very angry.",
      "I don't remember my name. I don't remember her face — only that there was a her, that she mattered more than my own life did, that I spent the last of myself trying to keep her breathing. I don't remember the promise. My hand is open and empty and I can't remember what was in it, only that losing it hurts worse than the dying did.",
      "But I remember the bell.",
      "I remember the clean, bright sound of a whole city celebrating the hero who murdered me.",
      "My eyes open in the dark.",
      "Fine.",
      "They want a monster?",
      "I'll be the best one they ever made.",
    ],
  },
  {
    slug: "chapter-one",
    label: "Chapter One",
    title: "Came Back Wrong",
    available: false,
  },
];
