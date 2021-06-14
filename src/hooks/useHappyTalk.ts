import { useState, useCallback } from 'react';

import { HappyTalk, drawHappyTalk } from '../lib/happyTalk';

export const useHappyTalk = (): { happyTalk: HappyTalk; draw: () => void } => {
  const [happyTalk, setHappyTalk] = useState<HappyTalk>(() => drawHappyTalk());

  const draw = useCallback(() => {
    setHappyTalk(drawHappyTalk());
  }, []);

  return { happyTalk, draw };
};
