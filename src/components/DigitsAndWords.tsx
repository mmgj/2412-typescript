import React, { ReactElement, ReactChild, ReactText } from 'react';
import PropTypes from 'prop-types';
/**
 * makeSpans();
 * Creates spans around text to make it line-break
 * at specified points, for to make more pretty.
 */
function makeSpans(first: ReactChild, second: ReactChild | null = null): ReactChild {
  const spans =
    second != null ? (
      <div>
        <span className="unbreakable">{first}</span> <span className="unbreakable">{second}</span>
      </div>
    ) : (
      <span className="unbreakable">{first}</span>
    );
  return spans;
}

const makeWords = (hour: number, minute: number): ReactChild => {
  const hourStringsNB = (index: number): string =>
    [
      'tolv',
      'ett',
      'to',
      'tre',
      'fire',
      'fem',
      'seks',
      'sju',
      'åtte',
      'ni',
      'ti',
      'elleve',
      'tolv',
      'ett',
      'to',
      'tre',
      'fire',
      'fem',
      'seks',
      'sju',
      'åtte',
      'ni',
      'ti',
      'elleve',
      'tolv',
    ][index];
  const minuteStringsNB = (index: number): string =>
  [
  '',
  'ett',
  'to',
  'tre',
  'fire',
  'fem',
  'seks',
  'sju',
  'åtte',
  'ni',
  'ti',
  'elleve',
  'tolv',
  'tretten',
  'fjorten',
  'kvart',
  'seksten',
  'sytten',
  'atten',
  'nitten',
  ][index];

  const hourKey = minute >= 20 ? hour + 1 : hour;
  const minuteKey = minute;
  let jsx: ReactChild;
  switch (true) {
    case minuteKey === 0:
      jsx = makeSpans(`akkurat ${hourStringsNB(hourKey)}`);
      break;
    case minuteKey > 0 && minuteKey < 15:
      jsx = makeSpans(`${minuteStringsNB(minuteKey)} over ${hourStringsNB(hourKey)}`);
      break;
    case minuteKey === 15:
      jsx = makeSpans(`kvart over ${hourStringsNB(hourKey)}`);
      break;
    case minuteKey > 15 && minuteKey < 20:
      jsx = makeSpans(`${minuteStringsNB(minuteKey)} over ${hourStringsNB(hourKey)}`);
      break;
    case minuteKey >= 20 && minuteKey < 30:
      jsx = makeSpans(`${minuteStringsNB(30 - minuteKey)} på`, `halv ${hourStringsNB(hourKey)}`);
      break;
    case minuteKey === 30:
      jsx = makeSpans(`halv ${hourStringsNB(hourKey)}`);
      break;
    case minuteKey > 30 && minuteKey < 45:
      jsx = makeSpans(`${minuteStringsNB(minuteKey - 30)} over`, `halv ${hourStringsNB(hourKey)}`);
      break;
    case minuteKey === 45:
      jsx = makeSpans(`kvart på ${hourStringsNB(hourKey)}`);
      break;
    case minuteKey > 45:
      jsx = makeSpans(`${minuteStringsNB(60 - minuteKey)} på ${hourStringsNB(hourKey)}`);
      break;
    default:
      jsx = makeSpans('...');
      break;
  }
  return jsx;
};
/**
 * makeDigits()
 * Prepend single-digit values with leading zero.
 */
const makeDigits = (hour: number, minute: number): string => {
  const hourFormatted = hour < 10 ? `0${hour.toString()}` : hour.toString();
  const minutesFormatted = minute < 10 ? `0${minute.toString()}` : minute.toString();
  return (`${hourFormatted}:${minutesFormatted}`);
}

interface ClockProps {
  hour: number;
  minute: number;
}

const DigitsAndWords = ({ hour, minute }: ClockProps): ReactChild => {
    return (
      <div className="textboxes">
        <div className="digits">{makeDigits(hour, minute)}</div>
        <div className="words">{makeWords(hour, minute)}</div>
      </div>
    );
  }

export default DigitsAndWords;
