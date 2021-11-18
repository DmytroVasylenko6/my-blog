import convertDate, { pad } from './convertDate';

let currentDate = '2021-10-15T09:51:48.457Z';
test('should return the converted date in the format 00.00.00', () => {
  const converted = convertDate(currentDate);
  expect(converted).toBe('15.10.2021');
});

test('should return a string of day, month or year separately', () => {
  const result1 = pad('28');
  expect(result1).toBe('28');
  const result2 = pad('3');
  expect(result2).toBe('03');
});
