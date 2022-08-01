import { Icon } from "components";

export const Filled = () => (
  <>
    <h4>Dark</h4>
    <Icon name="IoArrowUpCircle" />
    <h4>Light</h4>
    <div
      style={{
        background: "black",
        width: "fit-content",
        borderRadius: "4px",
        padding: "7px",
      }}
    >
      <Icon name="IoArrowUpCircle" color="light" />
    </div>
    <h4>Small</h4>
    <Icon name="IoArrowUpCircle" size="small" />
    <h4>Large</h4>
    <Icon name="IoArrowUpCircle" size="large" />
    <h4>Massive</h4>
    <Icon name="IoArrowUpCircle" size="massive" />
  </>
);

export const Outline = () => (
  <>
    <h4>Dark</h4>
    <Icon name="IoArrowUpCircleOutline" />
    <h4>Light</h4>
    <div
      style={{
        background: "black",
        width: "fit-content",
        borderRadius: "4px",
        padding: "7px",
      }}
    >
      <Icon name="IoArrowUpCircleOutline" color="light" />
    </div>
  </>
);

const IconStory = {
  title: "Design System/Icon",
  component: Icon,
};

export default IconStory;
