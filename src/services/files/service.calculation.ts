export class Calculation {
  private static calc: Calculation;

  private constructor() {}

  public static GetInstance() {
    if (!Calculation.calc) {
      Calculation.calc = new Calculation();
    }
    return Calculation.calc;
  }

  public async Add(a: number, b: number) {
    return a + b;
  }

  public async GetRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
}
