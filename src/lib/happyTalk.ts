const happyTalkList = [
  'おめでとう！',
  'さすが！',
  'すごい！',
  'やったね！',
  'Congrats!!',
  'Awesome!!',
  'Yay!!',
] as const;

export type HappyTalk = typeof happyTalkList[number];

export const drawHappyTalk = (): HappyTalk =>
  happyTalkList[Math.floor(Math.random() * happyTalkList.length)];
