import { connect } from "react-redux";
import { button, div } from "./infra";
import { actions, State } from "./state";

type Props = {
  counter: number;
};

const App = ({ counter }: Props) =>
  div(
    null,
    div({ testId: "label" }, counter),
    button({ testId: "increment", onClick: actions.increment }, "Inc"),
    button({ testId: "decrement", onClick: actions.decrement }, "Decrement")
  );

const mapState = (state: State) => ({
  counter: state.counter,
});

export default connect(mapState)(App);
