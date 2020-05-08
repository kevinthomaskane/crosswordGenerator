export const DIFFICULTIES = ['random', 'easy', 'medium', 'hard']
export const STATUSES = {
  TOO_MANY_LETTERS: {
    content: 'Maximum letters already met',
    isError: true
  },
  CORRECT_GUESS: {
    content: 'Word found!',
    isError: false
  },
  ALREADY_USED: {
    content: 'Word already placed',
    isError: true
  },
  INCORRECT_GUESS: {
    content: 'Word not found',
    isError: true
  }
}

export const WINDOW_WIDTH = document.documentElement.clientWidth || document.body.clientWidth
