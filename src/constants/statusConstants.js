export const STATUS = {
  PREPARE: 1,
  IN_PROGRESS: 2,
  TEST: 3,
  FINISH: 4,
  CLOSE: 5,
  PAUSE: 6,
  NOT_DO: 7,
};

export const STATUS_WF = {
  [STATUS.PREPARE]: {
    next: [STATUS.IN_PROGRESS, STATUS.CLOSE],
    prev: [],
  },
  [STATUS.IN_PROGRESS]: {
    next: [STATUS.FINISH, STATUS.PAUSE],
    prev: [STATUS.PREPARE],
  },
  [STATUS.FINISH]: {
    next: [STATUS.CLOSE],
    prev: [STATUS.IN_PROGRESS],
  },
  [STATUS.CLOSE]: {
    next: [],
    prev: [STATUS.FINISH],
  },
  [STATUS.PAUSE]: {
    next: [STATUS.IN_PROGRESS],
    prev: [STATUS.IN_PROGRESS],
  },
  [STATUS.NOT_DO]: {
    next: [STATUS.IN_PROGRESS],
    prev: [],
  },
};

export const PRIORITY = {
  LOW: 0,
  MEDIUM: 1,
  HIGH: 2,
};
