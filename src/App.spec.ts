import { fireEvent, render, screen } from "@testing-library/react";
import { viewApp } from "./App";
import { createSlapstukStore, setGlobalStore } from "./state";
import { cls, e } from "./infra";
import { Provider } from "react-redux";

jest.mock("./infra/CollapsibleContainer", () => ({
  collapsibleContainer: ({ isOpen }: any, children: any) => {
    if (isOpen) return children();
    else return null;
  },
}));

describe("Default App", () => {
  beforeEach(() => {
    const store: any = createSlapstukStore();
    setGlobalStore(store);
    render(e(Provider, { store }, viewApp()));
  });

  xit("renders learn react link", () => {
    const vid1 = screen.getByTestId("5ef71ceff544b15604af39e5");
    expect(vid1).toHaveTextContent(
      "Brooks & Dunn - Play Something Country (Official Video)"
    );
  });

  describe("should have two sidebars:", () => {
    it("left is open", () => {
      expect(screen.getByTestId("leftSidebar")).toHaveClass(
        cls.leftSidebarHidden
      );
    });

    it("when clicking toggleLeftSidebar button left sidebar should be closed", () => {
      fireEvent.click(screen.getByTestId("leftSidebarToggler"));
      expect(screen.getByTestId("leftSidebar")).not.toHaveClass(
        cls.leftSidebarHidden
      );
    });
    it("when clicking toggleLeftSidebar button two times left sidebar should be open", () => {
      fireEvent.click(screen.getByTestId("leftSidebarToggler"));
      fireEvent.click(screen.getByTestId("leftSidebarToggler"));
      expect(screen.getByTestId("leftSidebar")).toHaveClass(
        cls.leftSidebarHidden
      );
    });

    it("right is closed", () => {
      expect(screen.getByTestId("rightSidebar")).toHaveClass(
        cls.rightSidebarHidden
      );
    });
    it("when clicking toggleRightSidebar button right sidebar should be open", () => {
      fireEvent.click(screen.getByTestId("rightSidebarToggler"));
      expect(screen.getByTestId("rightSidebar")).not.toHaveClass(
        cls.rightSidebarHidden
      );
    });
  });
});
