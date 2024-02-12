import { Calculation } from '../services/files/service.calculation';

const calculation = Calculation.GetInstance();

describe('Simple addition test', () => {
  it(' Gives result for two given positive inputs 10, 20 ', async (done) => {
    const result = await calculation.Add(10, 20);
    expect(result).toEqual(30);
    done();
  });
  it(' Gives result for two given negative inputs 10, -20 ', async (done) => {
    const result = await calculation.Add(10, -20);
    expect(result).toEqual(-10);
    done();
  });

  it(' Gives result for two given random values ', async (done) => {
    const num1 : number = await calculation.GetRandomInt(10);
    const num2: number = await calculation.GetRandomInt(20);
    const result = await calculation.Add(num1, num2);
    expect(result).toEqual(num1 + num2);
    done();
  });
});
