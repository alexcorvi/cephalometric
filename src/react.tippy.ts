declare module 'react-tippy' {
	namespace ReactTooltip {
		class Tooltip extends React.Component<Props> {}

		interface Props {
			title: string;
			disabled?: boolean;
			open?: boolean;
			position?: 'top' | 'bottom' | 'left' | 'right';
			trigger?: 'mouseenter' | 'focus' | 'click' | 'manual';
			tabIndex?: number;
			interactive?: boolean;
			interactiveBorder?: number;
			delay?: number;
			hideDelay?: number;
			animation?: 'shift' | 'perspective' | 'fade' | 'scale' | 'none';
			arrow?: boolean;
			arrowSize?: 'small' | 'regular' | 'big';
			duration?: number;
			offset?: number;
			theme?: 'light' | 'dark';
		}
	}

	export = ReactTooltip;
}
