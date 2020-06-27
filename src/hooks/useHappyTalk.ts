import { useState, useCallback } from 'react';

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

const useHappyTalk = (): { happyTalk: HappyTalk; draw: () => void } => {
  const [happyTalk, setHappyTalk] = useState<HappyTalk>(happyTalkList[0]);

  const draw = useCallback(() => {
    setHappyTalk(
      happyTalkList[Math.floor(Math.random() * happyTalkList.length)]
    );
  }, []);

  return { happyTalk, draw };
};

export default useHappyTalk;
