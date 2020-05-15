import { AnyAction, Dispatch } from "redux";
import { initialSteps } from "../initialSteps";

describe("initial steps", () => {
  let dispatch: Dispatch<AnyAction>;
  beforeEach(() => {
    dispatch = jest.fn();
  });

  it("works", async () => {
    const actions = [jest.fn(), jest.fn(), jest.fn()];
    const asyncFunc = initialSteps(...actions);
    const actual = await asyncFunc({ dispatch });
    expect(actual).toStrictEqual({ pageLoaded: true });
    actions.forEach((act) => expect(act).toBeCalled());
    expect(dispatch).toBeCalledTimes(3);
  });
});
