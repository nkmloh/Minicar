import React, { PropTypes, Component } from 'react';
import MinicarContainer from './MinicarContainer';
import Wrapper from './Wrapper';
import MinicarSlot from './MinicarSlot';
import Swipeable from 'react-swipeable';
import { throttle } from 'lodash';

class Minicar extends Component {
	constructor(props) {
		super(props)
		this.state = {
			position: 0,
			direction: 'next',
			sliding: false,
			width: '392',
			speed: '1'
		}

		this.minicar = React.createRef();
	}

	shouldComponentUpdate(nextProps, nextState) {
		const Children = nextProps.children !== this.props.children;
		const State = nextState !== this.state;
		const Triger = nextProps.triger !== this.props.triger;
		const Filter = nextProps.filter !== this.props.filter;
		if (Children || Triger) {
			// check if children number is odd copy one element to it from the middle of the list
			if (this.isOdd(nextProps.children.length) && nextProps.category.split(" ").length !== 2) {
				const calc_items = nextProps.itemWidth * (nextProps.children.length / 2);
				if (calc_items >= this.minicar.current.offsetWidth) {
					nextProps.children.push(nextProps.children[Math.round((nextProps.children.length - 1) / 2)]);
				}
			}

			if (Filter) {
				this.setState({
					position: 0
				}, () => {
					setTimeout(() => {
						this.setFirstItemFirst();
					}, 100);
				})

			}

			// if ((this.props.width !== nextProps.width) || (Filter && Children)) {
			// 	this.disableSlider(nextProps.children.length);
			// }

		}
		return Children || State || Triger;
	}

	componentDidMount() {
		if (this.props.itemWidth) {
			this.setWidthOfItem()
		}

		if (this.props.slideSpeed) {
			this.setSlideSpeed()
		}

		const calc_items = this.props.itemWidth * (this.props.children.length / 2);
		if (this.isOdd(this.props.children.length)) {
			if (calc_items > this.minicar.current.offsetWidth) {
				this.props.children.push(this.props.children[Math.round((this.props.children.length - 1) / 2)]);
			}
		}

		// this.disableSlider(this.props.children.length);
		if (calc_items > this.minicar.current.offsetWidth) {
			this.setFirstItemFirst();
		}
	}

	disableSlider = (children) => {
		if (children) {
			var calc_items = this.props.itemWidth * (children / 2);
			// console.log("TCL: disableSlider -> children", children)
			// console.log("TCL: disableSlider -> calc_items", calc_items)
			// console.log("TCL: disableSlider -> this.minicar.current.offsetWidth", this.minicar.current.offsetWidth)
		} else {
			var calc_items = this.props.itemWidth * (this.props.children.length / 2);
		}
		// var wind_rat = this.props.width - this.props.excessWidth;

		if ((calc_items < this.minicar.current.offsetWidth) && this.props.category.split(" ").length !== 2) {
			// this.props.handleAutoRaftToggle(true);
		} else if((calc_items > this.minicar.current.offsetWidth) && this.props.category.split(" ").length === 2) {
			// this.props.handleAutoRaftToggle(false);
		}
	}

	setWidthOfItem = () => {
		this.setState({
			width: this.props.itemWidth
		})
	}

	setSlideSpeed = () => {
		this.setState({
			speed: this.props.slideSpeed
		})
	}

	getOrder(itemIndex) {
		const { position } = this.state
		const { children } = this.props
		const numItems = children.length || 1

		if (itemIndex - position < 0) {
			return numItems - Math.abs(itemIndex - position)
		}
		return itemIndex - position
	}

	isOdd(num) {
		return num % 2;
	}

	setFirstItemFirst = () => {
		const { position } = this.state;
		const { children } = this.props;
		const numItems = children.length;
		let position_first = position === 0 ? numItems - 2 : position - 2;
		this.setState({
			position: position_first
		})
	}

	nextSlide = () => {
		const { position } = this.state
		const { children } = this.props
		const numItems = children.length || 1

		if ((position + 2 === numItems - 1) && this.isOdd(numItems)) {
			console.log("ITEM: 1")
			this.doSliding('next', position === numItems - 3 ? 0 : position + 3, this.state.width)
		} else {
			console.log("ITEM: 2")
			this.doSliding('next', position === numItems - 2 ? 0 : position + 2, this.state.width)
		}
	}

	prevSlide = () => {
		const { position } = this.state;
		const { children } = this.props;
		const numItems = children.length
		if ((position === 0) && this.isOdd(numItems)) {
			console.log("PREV 1")
			this.doSliding('prev', position === 0 ? numItems - 3 : position - 3, this.state.width)
		} else {
			console.log("PREV 2")
			this.doSliding('prev', position === 0 ? numItems - 2 : position - 2, this.state.width)
		}
	}

	doSliding = (direction, position, width) => {
		this.setState({
			sliding: true,
			direction,
			position,
			width
		})
		setTimeout(() => {
			this.setState({
				sliding: false
			})
		}, 50)
	}

	handleSwipe = throttle((isNext) => {
		if (isNext) {
			this.nextSlide()
		} else {
			this.prevSlide()
		}
	}, 500, { trailing: false })

	render() {
		const { title, children } = this.props;
		const items = children;

		// if (!this.props.triger) {
		//   if (this.isOdd(items.length)) {
		//     items.push(items[Math.round((items.length - 1) / 2)]);
		//   }
		//   if (items.length <= 5 && items.length >= 2) {
		//     if (this.props.children[2] === undefined) {
		//       items.push.apply(items, [this.props.children[1]]);
		//     } else {
		//       items.push.apply(items, [this.props.children[1], this.props.children[2]]);
		//     }
		//   }
		// }

		return (
			<div className="minicar" ref={this.minicar}>
				<h2>{title}</h2>
				<Swipeable
					className="minicar-list"
					onSwipingLeft={!this.props.triger ? () => this.handleSwipe(true) : null}
					onSwipingRight={!this.props.triger ? () => this.handleSwipe() : null}
				>
					<Wrapper>
						<MinicarContainer
							className="minicar-track"
							sliding={this.state.sliding}
							direction={this.state.direction}
							width={this.props.itemWidth}
							speed={this.state.speed}
						>
							{
								items.map((child, index) => (
									<MinicarSlot
										className="minicar-slide"
										key={index}
										order={this.getOrder(index)}
									>
										{child}
									</MinicarSlot>
								))
							}
						</MinicarContainer>
					</Wrapper>
				</Swipeable>
				<button className="slick-arrow slick-prev" onClick={() => this.prevSlide()}>Prev</button>
				<button className="slick-arrow slick-next" onClick={() => this.nextSlide()}>Next</button>
			</div>
		)
	}
}

export default Minicar;