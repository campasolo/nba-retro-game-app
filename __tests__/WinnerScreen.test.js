import React from 'react';
import { render } from '@testing-library/react-native';
import WinnerScreen from '../src/screens/WinnerScreen';

const createNavigation = () => ({
  popToTop: jest.fn(),
});

describe('WinnerScreen', () => {
  it('shows winner info and top 5 scorers ordered by points', () => {
    const route = {
      params: {
        homeTeamId: 'bos',
        awayTeamId: 'lal',
        homePoints: 54,
        awayPoints: 45,
        playerScores: {
          'home:tatum': 15,
          'home:brown': 21,
          'home:holiday': 10,
          'home:porzingis': 6,
          'home:white': 2,
          'away:james': 20,
          'away:davis': 12,
          'away:reaves': 8,
          'away:hachimura': 3,
          'away:russell': 2,
        },
      },
    };

    const { getByText, queryByText } = render(
      <WinnerScreen route={route} navigation={createNavigation()} />
    );

    expect(getByText('Ganador')).toBeTruthy();
    expect(getByText('Boston Celtics')).toBeTruthy();
    expect(getByText('Top 5 - Boston Celtics')).toBeTruthy();
    expect(queryByText('Top 5 - Los Angeles Lakers')).toBeNull();

    expect(getByText('1. Jaylen Brown')).toBeTruthy();
    expect(getByText('21 pts')).toBeTruthy();
    expect(getByText('2. Jayson Tatum')).toBeTruthy();
    expect(getByText('15 pts')).toBeTruthy();
  });

  it('shows both teams top 5 scorers when match ends in draw', () => {
    const route = {
      params: {
        homeTeamId: 'bos',
        awayTeamId: 'lal',
        homePoints: 50,
        awayPoints: 50,
        playerScores: {
          'home:tatum': 16,
          'home:brown': 12,
          'home:holiday': 10,
          'home:porzingis': 8,
          'home:white': 4,
          'away:james': 17,
          'away:davis': 13,
          'away:reaves': 9,
          'away:hachimura': 7,
          'away:russell': 4,
        },
      },
    };

    const { getByText } = render(
      <WinnerScreen route={route} navigation={createNavigation()} />
    );

    expect(getByText('Empate')).toBeTruthy();
    expect(getByText('Top 5 - Boston Celtics')).toBeTruthy();
    expect(getByText('Top 5 - Los Angeles Lakers')).toBeTruthy();
    expect(getByText('1. Jayson Tatum')).toBeTruthy();
    expect(getByText('1. LeBron James')).toBeTruthy();
  });
});
