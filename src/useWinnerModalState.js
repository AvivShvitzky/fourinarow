import { useState } from 'react';

export default (_winner = -1) => {
  const [winner, updateWinner] = useState(_winner)


  return {
    winner,
    updateWinner
  }

}