import React from "react";
import {
  cls,
  viewCollapsibleContainer,
  colors,
  css,
  e,
  icons,
  utils,
  s,
} from "../infra";
import * as items from "../state";
import Row, { getPaddingForLevel } from "./Row";
import { connect } from "react-redux";
import { State } from "../state";

type OuterProps = {
  onResize: () => void;
};

type LeftSidebarProps = OuterProps & ReturnType<typeof mapState>;

const LeftSidebar = ({ state, onResize }: LeftSidebarProps) => {
  return (
    <div
      className={cls.leftSidebar}
      data-testid={"leftSidebar"}
      style={{
        width: state.uiOptions.leftSidebarWidth,
        marginLeft: state.uiOptions.isLeftSidebarVisible
          ? 0
          : -state.uiOptions.leftSidebarWidth,
      }}
      // onMouseLeave={() => items.actions.removeDestination()}
    >
      <div className={cls.sidebarHeader}>
        {icons.folderPlus({
          testId: "sidebarCreateFolder",
          classNames: [cls.icon, cls.createFolderIcon],
          // onClick: () => items.actions.addNewForder(),
        })}
      </div>
      <div className={cls.sidebarScrollArea}>
        <RowWithChildren
          item={state.items[state.uiOptions.focusedNode]}
          allItems={state.items}
          level={-1}
          focusedNodeId={state.uiOptions.selectedNode}
          renameState={state.uiState.renameState}
          isRootItem
          // dragState={state.dragState}
        />
      </div>
      <SidebarWidthAdjuster
        isMouseDown={state.uiState.isMouseDownOnAdjuster}
        onResize={onResize}
      />
    </div>
  );
};

const ADJUSTER_WIDTH = 4;
type SidebarWidthAdjusterProps = {
  isMouseDown: boolean;
  onResize: () => void;
};
class SidebarWidthAdjuster extends React.PureComponent<SidebarWidthAdjusterProps> {
  // componentDidMount() {
  //   document.addEventListener("mousemove", this.onMouseMove);
  //   document.addEventListener("mouseup", this.onMouseUp);
  // }

  // onMouseMove = (e: MouseEvent) => {
  //   if (this.props.isMouseDown) {
  //     items.actions.setSidebarWidth(e.clientX + ADJUSTER_WIDTH / 2);
  //     this.props.onResize();
  //   }
  // };

  // onMouseUp = () =>
  //   items.actions.assignUiState({
  //     isMouseDownOnAdjuster: false,
  //   });

  // onMouseDown = () =>
  //   items.actions.assignUiState({
  //     isMouseDownOnAdjuster: true,
  //   });

  onDoubleClick = () => {
    const texts = document.getElementsByClassName(cls.rowText);
    const maxWidth = utils.max(
      Array.from(texts).map((r) => {
        const rect = r.getBoundingClientRect();
        return rect.x + rect.width;
      })
    );
    if (maxWidth) {
      // items.actions.setSidebarWidth(maxWidth + 10);
      //ugly, but I'm going to change how sidebar behaves in any way
      setTimeout(() => this.props.onResize(), 10);
    }
  };

  render() {
    return (
      <div
        title="Double click to auto-adjust"
        className={
          cls.sidebarWidthAdjuster +
          " " +
          (this.props.isMouseDown ? cls.sidebarWidthAdjusterActive : "")
        }
        // onMouseDown={this.onMouseDown}
        onDoubleClick={this.onDoubleClick}
      />
    );
  }
}
css.class(cls.leftSidebar, {
  gridArea: "leftSidebar",
  transition: "margin-left 200ms ease-out",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

css.class(cls.createFolderIcon, {
  height: 16,
});

css.class(cls.sidebarHeader, {
  display: "flex",
  justifyContent: "flex-end",
  padding: "2px 5px",
});

css.class(cls.sidebarWidthAdjuster, {
  position: "absolute",
  right: -1,
  width: ADJUSTER_WIDTH,
  top: 0,
  bottom: 0,
  cursor: "col-resize",
  transition: "background-color 200ms ease-out 100ms",
});

css.hover(cls.sidebarWidthAdjuster, {
  backgroundColor: colors.primary,
});
css.class(cls.sidebarWidthAdjusterActive, {
  backgroundColor: colors.primary,
});

css.class(cls.sidebarScrollArea, {
  overflowY: "auto",
});

css.text(
  s.scrollbar(cls.sidebarScrollArea, { width: 8, color: colors.primary })
);

type Props = {
  level: number;
  item: Item;
  allItems: Items;
  renameState: items.RenameState | undefined;
  focusedNodeId: string;
  isRootItem?: boolean;
  // dragState: items.DragState | undefined;
};

class RowWithChildren extends React.PureComponent<Props> {
  renderChildren = () => (
    <div data-testid={"children-" + this.props.item.id}>
      {items.isContainer(this.props.item) &&
        this.props.item.children.map((id) => (
          <RowWithChildren
            key={id}
            level={this.props.level + 1}
            item={this.props.allItems[id]}
            allItems={this.props.allItems}
            focusedNodeId={this.props.focusedNodeId}
            renameState={this.props.renameState}
            // dragState={this.props.dragState}
          />
        ))}
    </div>
  );

  renderLoading = () => (
    <div
      data-testid={"loading-" + this.props.item.id}
      style={{ paddingLeft: getPaddingForLevel(this.props.level + 2) }}
    >
      Loading...
    </div>
  );

  onChevronClick = (e: React.MouseEvent<SVGSVGElement>) => {
    e.stopPropagation();
    if (items.isContainer(this.props.item)) {
      // items.actions.toggleItemInSidebar(this.props.item);
      const { item } = this.props;
      if (items.isNeedsToBeLoaded(item)) {
        // items.actions.loadItem(this.props.item);
      }
    }
  };

  renderRow = (item: Item, level: number) => (
    <Row
      item={item}
      level={level}
      isFocused={this.props.isRootItem}
      isSelected={item.id === this.props.focusedNodeId}
      renameState={this.props.renameState}
      onChevronClick={this.onChevronClick}
      // dragState={this.props.dragState}
    />
  );

  render() {
    const { item, level, isRootItem } = this.props;
    return (
      <>
        {this.renderRow(item, level)}
        {viewCollapsibleContainer(
          {
            isOpen: items.isOpenAtSidebar(item) || !!isRootItem,
          },
          () =>
            items.isLoadingAnything(item)
              ? this.renderLoading()
              : this.renderChildren()
        )}
      </>
    );
  }
}

const mapState = (state: State) => ({
  state,
});

export default connect(mapState)(LeftSidebar);
