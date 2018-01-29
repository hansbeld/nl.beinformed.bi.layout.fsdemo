// @flow
export type startProgressType = {
  type: "START_PROGRESS"
};
export type finishProgressType = {
  type: "FINISH_PROGRESS"
};
export type resetProgressType = {
  type: "RESET_PROGRESS"
};
export type updateProgressType = {
  type: "UPDATE_PROGRESS",
  percentComplete: number
};

// ACTIONS
/**
 * Start the progress indicator
 */
export const startProgress = (): startProgressType => ({
  type: "START_PROGRESS"
});

/**
 * Stop the progress indicator
 */
export const finishProgress = (): finishProgressType => ({
  type: "FINISH_PROGRESS"
});

/**
 * Reset the progress indicator
 */
export const resetProgress = (): resetProgressType => ({
  type: "RESET_PROGRESS"
});

/**
 * Update progress complete percentage
 */
export const updateProgress = (percentComplete: number) => ({
  type: "UPDATE_PROGRESS",
  percentComplete
});
