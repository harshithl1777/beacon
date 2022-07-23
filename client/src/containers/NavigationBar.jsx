import { useState } from 'react';
import { Icon, Button } from 'components';
import sliderMeasurements from 'assets/json/sliderMeasurements.json';
import styles from 'containers/NavigationBar.module.scss';

const NavigationBar = () => {
	const [activeOption, setActiveOption] = useState(0);
	const [hoverOption, setHoverOption] = useState(null);
	const [offsetLeft, setOffsetLeft] = useState(-13);
	const [offsetWidth, setOffsetWidth] = useState(91);

	const navigationOptionClicked = (optionClicked) => {
		setOffsetLeft(sliderMeasurements.offsetLeft[optionClicked] - 2);
		setOffsetWidth(sliderMeasurements.offsetWidth[optionClicked] + 4);
		setActiveOption(optionClicked);
	};

	return (
		<div className={styles.navigationBar}>
			<Icon
				name='CMLogo'
				size='medium'
				color='light'
				className={styles.navigationBarLogo}
				draggable='false'
			/>
			<div className={styles.navigationContainer}>
				<div
					style={{ left: `${offsetLeft}px`, width: `${offsetWidth}px` }}
					className={styles.sliderIndicator}
				/>
				<div className={styles.navigationOptionsContainer}>
					<div
						className={styles.navigationOption}
						onMouseEnter={() => setHoverOption(0)}
						onMouseLeave={() => setHoverOption(null)}
						onClick={(e) => navigationOptionClicked(0)}
					>
						<Icon
							name='CMDatabase'
							color={activeOption === 0 || hoverOption === 0 ? 'light' : 'faded'}
							draggable='false'
						/>
						<h3
							className={
								activeOption === 0 || hoverOption === 0
									? styles.navigationOptionTextActive
									: styles.navigationOptionText
							}
						>
							Data
						</h3>
					</div>
					<div
						className={styles.navigationOption}
						onMouseEnter={() => setHoverOption(1)}
						onMouseLeave={() => setHoverOption(null)}
						onClick={(e) => navigationOptionClicked(1)}
					>
						<Icon
							name='IoChatboxEllipses'
							size={24}
							color={
								activeOption === 1 || hoverOption === 1
									? 'var(--color-white)'
									: 'var(--color-white-faded)'
							}
							draggable='false'
						/>
						<h3
							className={
								activeOption === 1 || hoverOption === 1
									? styles.navigationOptionTextActive
									: styles.navigationOptionText
							}
						>
							Reviews
						</h3>
					</div>
					<div
						className={styles.navigationOption}
						onMouseEnter={() => setHoverOption(2)}
						onMouseLeave={() => setHoverOption(null)}
						onClick={(e) => navigationOptionClicked(2)}
					>
						<Icon
							name='CMContributions'
							size='medium'
							color={activeOption === 2 || hoverOption === 2 ? 'light' : 'faded'}
							draggable='false'
						/>
						<h3
							className={
								activeOption === 2 || hoverOption === 2
									? styles.navigationOptionTextActive
									: styles.navigationOptionText
							}
						>
							Contributions
						</h3>
					</div>
					<div
						className={styles.navigationOption}
						onMouseEnter={() => setHoverOption(3)}
						onMouseLeave={() => setHoverOption(null)}
						onClick={(e) => navigationOptionClicked(3)}
					>
						<Icon
							name='IoRadioOutline'
							size='medium'
							color={activeOption === 3 || hoverOption === 3 ? 'light' : 'faded'}
							draggable='false'
						/>
						<h3
							className={
								activeOption === 3 || hoverOption === 3
									? styles.navigationOptionTextActive
									: styles.navigationOptionText
							}
						>
							Radar
						</h3>
					</div>
				</div>
			</div>
			<div className={styles.navigationBarButtonsContainer}>
				<Button
					variant='yellow'
					className={styles.creditsCounterButton}
					customIcon={<Icon name='CMCompass' color='dark' />}
				>
					20 Credits
				</Button>
				<Button
					className={styles.contributeButton}
					customIcon={<Icon name='CMContributions' color='dark' />}
				>
					Contribute
				</Button>
			</div>
			<div className={styles.navigationBarIconsContainer}>
				<Icon
					name='CMFeedback'
					color='light'
					className={styles.navigationBarIcon}
					draggable='false'
				/>
				<Icon
					name='CMProfile'
					color='dark'
					size='large'
					className={styles.navigationBarIcon}
					draggable='false'
				/>
			</div>
		</div>
	);
};

export default NavigationBar;
