import PropTypes from "prop-types";
import * as ionicons from "react-icons/io5";

import customIcons from "assets/icons";

const sizes = {
  small: 20,
  medium: 28,
  large: 38,
  massive: 50,
};

const colors = {
  light: "var(--color-white)",
  faded: "var(--color-white-faded)",
  dark: "var(--color-navy-600)",
  green: "var(--color-green-600)",
  blue: "var(--color-blue-600)",
  red: "var(--color-red-600)",
  yellow: "var(--color-yellow-600)",
  purple: "var(--color-purple-600)",
};

const Icon = (props) => {
  const { name, color, size, className, ...rest } = props;
  const custom = name.slice(0, 2) === "CM";

  const IconComponent = ionicons[name];

  return custom ? (
    <img
      {...rest}
      className={className}
      alt={name}
      src={customIcons[`${name}-${size}-${color}`]}
    />
  ) : (
    <IconComponent
      color={colors[color] || color}
      size={sizes[size] || size}
      className={className}
    />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      "light",
      "dark",
      "green",
      "blue",
      "red",
      "yellow",
      "purple",
    ]),
  ]),
  size: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["small", "medium", "large", "massive"]),
  ]),
  className: PropTypes.string,
};

Icon.defaultProps = {
  color: "dark",
  size: "medium",
  className: "",
};

export default Icon;
