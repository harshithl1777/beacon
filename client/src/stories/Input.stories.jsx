import { Input } from "components";

export const Default = () => (
  <div style={{ width: "300px" }}>
    <h4>With Placeholder</h4>
    <Input>Username</Input>
    <h4>Label without Placeholder</h4>
    <Input label="Username" />
    <h4>Forced Value</h4>
    <Input forcedValue="iamforced">Username</Input>
    <h4>Success</h4>
    <Input forcedValue="iamausername" state="success">
      Username
    </Input>
    <h4>Disabled</h4>
    <Input disabled>Username</Input>
    <h4>Disabled with Value</h4>
    <Input disabled forcedValue="iamforced">
      Username
    </Input>
  </div>
);

export const Danger = () => (
  <div style={{ width: "300px" }}>
    <h4>With Placeholder</h4>
    <Input state="error">Username</Input>
    <h4>Label without Placeholder</h4>
    <Input state="error" label="Username" iconTooltip="I am disabled" />
    <h4>With Value</h4>
    <Input state="error" forcedValue="iamausername">
      Username
    </Input>
  </div>
);

export const Warning = () => (
  <div style={{ width: "300px" }}>
    <h4>With Placeholder</h4>
    <Input state="warning">Username</Input>
    <h4>Label without Placeholder</h4>
    <Input state="warning" label="Username" />
    <h4>With Value</h4>
    <Input state="warning" forcedValue="iamausername">
      Username
    </Input>
  </div>
);

const InputStory = {
  title: "Design System/Input",
  component: Input,
};

export default InputStory;
