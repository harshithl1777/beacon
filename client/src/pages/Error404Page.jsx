import styles from 'pages/Error404Page.module.scss';

const Error404Page = () => {
    return (
        <div className={styles.error404PageContainer}>
            <div className={styles.textContentContainer}>
                <h3 className={styles.header}>Error 404</h3>
                <p className={styles.description}>
                    Hmm...that page doesn't exist. Perhaps go back to where you were and try something else?
                </p>
            </div>
        </div>
    );
};

export default Error404Page;
