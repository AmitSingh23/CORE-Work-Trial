import ArrayUtils from "./ArrayUtils";


describe('ArrayUtils', () => {
  it.each([
    [[1, 2, 3, 4, 5], 3],
    [[1, 2, 39], 14],
    [[0, -10, 100, 13, 4], 107 / 5]
  ])('ArrayUtils.average(%p) should be %p', (numbers: number[], result: number) => {
    expect(ArrayUtils.average(numbers)).toEqual(result);
  });


  it('should be 0 when array is empty', () => {
    expect(ArrayUtils.average([])).toEqual(0);
  });
})