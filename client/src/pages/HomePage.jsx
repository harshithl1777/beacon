import classnames from 'classnames';
import styles from 'pages/HomePage.module.scss';

const HomePage = () => {
	return (
		<div className={styles.homePageContainer}>
			<div className={styles.headerTextContainer}>
				<h3 className={styles.headerText}>
					Find <span className={styles.headerColorText}>all the data</span> you need to make <br /> decisions on{' '}
					<span className={styles.headerColorText}>where to shop</span>
				</h3>
				<p className={styles.headerDescriptionText}>
					To start, just start typing your address or hit the location button to give us a starting search point. Then, select any products
					you’re looking for and hit search!
				</p>
			</div>
		</div>
	);
};

export default HomePage;
