import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { createSlapstukStore, setGlobalStore } from "./state";
import { e } from "./infra";
import { Provider } from "react-redux";

describe("some specs", () => {
  beforeEach(() => {
    const store = createSlapstukStore();
    setGlobalStore(store);
    render(e(Provider, { store }, e(App)));
  });

  it("renders learn react link", () => {
    const label = screen.getByTestId("label");

    expect(label).toHaveTextContent("1");

    fireEvent.click(screen.getByTestId("increment"));
    expect(label).toHaveTextContent("2");

    fireEvent.click(screen.getByTestId("decrement"));
    expect(label).toHaveTextContent("1");

    fireEvent.click(screen.getByTestId("decrement"));
    expect(label).toHaveTextContent("0");
  });

  it("renders learn react link", () => {
    const label = screen.getByTestId("label");

    expect(label.textContent).toBe("1");

    fireEvent.click(screen.getByTestId("increment"));
    expect(label.textContent).toBe("2");

    fireEvent.click(screen.getByTestId("decrement"));
    expect(label.textContent).toBe("1");

    fireEvent.click(screen.getByTestId("decrement"));
    expect(label.textContent).toBe("0");
  });
});

describe("with some initial state", () => {
  beforeEach(() => {
    const store = createSlapstukStore({
      counter: 137,
    });
    setGlobalStore(store);
    render(e(Provider, { store }, e(App)));
  });

  it("renders learn react link", () => {
    const label = screen.getByTestId("label");

    expect(label.textContent).toBe("137");
  });
});
