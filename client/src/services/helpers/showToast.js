import { toast } from 'react-toastify';
import { Icon, Spinner } from 'components';
import styles from 'services/utils/showToast.module.scss';

const toastBody = (title, message) => (
	<>
		<h3 className={styles.toastTitle}>{title}</h3>
		{message && <p className={styles.toastMessage}>{message}</p>}
	</>
);

const success = (title, message, options) => {
	const { ...rest } = options;
	const successIcon = <Icon name='IoCheckmarkCircle' size='medium' color='green' />;
	toast.success(toastBody(title, message), {
		position: toast.POSITION.TOP_RIGHT,
		icon: successIcon,
		...rest,
	});
};

const loading = (title, message, options) => {
	const { ...rest } = options;
	const loadingIcon = <Spinner size='small' />;
	toast.info(toastBody(title, message), {
		position: toast.POSITION.TOP_RIGHT,
		icon: loadingIcon,
		...rest,
	});
};

const info = (title, message, options) => {
	const { ...rest } = options;
	const infoIcon = <Icon name='IoInformationCircle' size='medium' color='blue' />;
	toast.info(toastBody(title, message), {
		position: toast.POSITION.TOP_RIGHT,
		icon: infoIcon,
		...rest,
	});
};

const warning = (title, message, options) => {
	const { ...rest } = options;
	const warningIcon = <Icon name='IoWarning' size='medium' color='yellow' />;
	toast.info(toastBody(title, message), {
		position: toast.POSITION.TOP_RIGHT,
		icon: warningIcon,
		...rest,
	});
};

const error = (title, message, options) => {
	const { ...rest } = options;
	const errorIcon = <Icon name='IoAlertCircle' size='medium' color='red' />;
	toast.info(toastBody(title, message), {
		position: toast.POSITION.TOP_RIGHT,
		icon: errorIcon,
		...rest,
	});
};

const showToast = {
	success,
	loading,
	info,
	warning,
	error,
};

export default showToast;
