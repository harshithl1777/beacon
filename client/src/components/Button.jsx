import PropTypes from "prop-types";
import classnames from "classnames";

import { Icon, Spinner, Tooltip } from "components";
import styles from "components/Button.module.scss";

const Button = (props) => {
  const {
    text,
    variant,
    disabled,
    icon,
    children,
    customIcon,
    loading,
    tooltip,
    tooltipOptions,
    onClick,
    wrapperClass,
    className,
    ...rest
  } = props;

  // check if icon name or customIcon exists, otherwise return empty fragment
  const getIconToRender = () => {
    if (icon)
      return (
        <Icon name={icon} color={variant === "secondary" ? "light" : "dark"} />
      );
    else if (customIcon) return customIcon;
    return <></>;
  };

  return (
    <div className={wrapperClass}>
      <Tooltip message={tooltip} {...tooltipOptions}>
        <button
          className={classnames(
            styles.button,
            (icon || customIcon) && styles.iconButton,
            loading && styles.loading,
            disabled && styles.disabled,
            styles[variant],
            className
          )}
          {...rest}
          disabled={disabled || loading}
          onClick={onClick}
        >
          {!loading && getIconToRender()}
          {loading && (
            <Spinner
              className={styles.buttonSpinner}
              color={variant === "secondary" ? "light" : "dark"}
            />
          )}
          <p>{children}</p>
        </button>
      </Tooltip>
    </div>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    "primary",
    "secondary",
    "danger",
    "blue",
    "purple",
    "yellow",
  ]),
  disabled: PropTypes.bool,
  icon: PropTypes.string,
  customIcon: PropTypes.element,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  wrapperClass: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipOptions: PropTypes.object,
};

Button.defaultProps = {
  variant: "primary",
  disabled: false,
  icon: null,
  customIcon: null,
  loading: false,
  onClick: () => {},
  className: "",
  wrapperClass: "",
  tooltip: "",
  tooltipOptions: {},
};

export default Button;
