import React from 'react';

export const BoardContext = React.createContext<number | null>(null);

export const useBoardContext = () => {
  const context = React.useContext(BoardContext);
  if (context === undefined) {
    throw new Error('useBoardContext must be used within a BoardProvider');
  }
  return context;
};
