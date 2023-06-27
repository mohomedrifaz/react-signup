
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import star from './../../../../assets/signup/stars.png';
import lines from './../../../../assets/signup/lines.png';
import badges from './../../../../assets/signup/badges.png';
import man from './../../../../assets/signup/man.webp';
import bulletPoints from './../../../../assets/signup/bullet-points.png';
import asset from './../../../../assets/signup/Asset.svg';
import svgicon from './../../../../assets/signup/svgicon.svg';
import arrowleft from './../../../../assets/signup/circle-arrow-left.svg';
import ArrowRight from './../../../../assets/signup/circle-arrow-right.svg';
import ratingstars from './../../../../assets/signup/rating-stars.png';

const PrevArrow = ({ onClick }) => {
	return (
		<div className="left-arrow" onClick={ onClick }>
			<img src={arrowleft} width="40" height="40" />
		</div>
	)
}

const NextArrow = ({ onClick }) => {
	return (
		<div className="right-arrow" onClick={ onClick }>
			<img src={ArrowRight} width="40" height="40" />
		</div>
	)
}

export default function RegisterSlider () {
	const settings = {
		dots: true,
		dotsClass: 'slider-buttons',
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		nextArrow: <NextArrow />,
		prevArrow: <PrevArrow />,
	};
	return (
		<div className="slider">
			<Slider {...settings}>
				<div className="slide-content slide-signup-trial">
					<div className="signup-content-emoji">
						<img src={ star } />
					</div>
					<h2 className="signup-content-title">Sign Up for a Risk Free 7-Day Trial.</h2>
					<div className="signup-content-summary">
						<p>
							Whether you need to access your desktop from anywhere, run
							intensive software without lag, or collaborate with your team in real time, V2 cloud
							can help you succeed.
						</p>
					</div>
					<div className="signup-content-join-users">
						<div className="user-images">
							<img src={ asset } height="40" />
						</div>
						<div className="user-images-content">
							Join <span>25,000+</span> Active Users
						</div>
					</div>
				</div>
				<div className="slide-content slide-customer-success">
					<div className="signup-content-background-img">
						<img src={ lines } />
					</div>
					<h2 className="signup-content-title">Leading the Future of Customer Success</h2>
					<div className="signup-content-image-slider">
						<img src={ badges } />
					</div>
					<div className="signup-content-summary">
						<p>
							We've been recognised in 14 categories in G2's Winter Reports 2023
						</p>
					</div>
					<div className="signup-content-ratings-review">
						<div className="read-review">
							<div className="review-stars">
								<img className="review-stars-icons" src={ ratingstars } />
								<span>4.8</span>
							</div>
							<div className="read-our-review">
								Read our review on
							</div>
						</div>
						<div className="review-icon">
							<img src={ svgicon } />
						</div>
					</div>
				</div>
				<div className="slide-content slide-rating">
					<div className="signup-content-rating">
						<div className="rating-title">5 Star Rated</div>
						<img src={ ratingstars } />
					</div>
					<h2>Tested and approved. V2 Cloud proves to be most reliable and productive Desktop virtualization tool.</h2>
					<div className="signup-content-user-rating">
						<div className="user-image">
							<img src={ man } />
						</div>
						<div className="user-name">Alex M.</div>
						<div className="user-designation">Application Developer,</div>
						<div className="user-office-employee">Enterprise (>1000 emp.)</div>
						<div className="user-read-review">
							<p>Read our review on</p>
							<img src={ svgicon } />
						</div>
					</div>
				</div>
				<div className="slide-content slide-features">
					<h1 className="signup-content-title">Simple, Fast & Secure Cloud Desktops</h1>
					<div className="signup-content-summary">
						<ul>
							<li> 
								<img src={ bulletPoints } />
								<span>Full Admin Access</span>
							</li>
							<li>
								<img src={ bulletPoints } />
								<span>Published Applications</span>
							</li>
							<li>
								<img src={ bulletPoints } />
								<span>Daily Backup Snapshots</span>
							</li>
							<li>
								<img src={ bulletPoints } />
								<span>Fanatical Technical Support</span>
							</li>
							<li>
								<img src={ bulletPoints } />
								<span>One Click Browser Access + Desktop App (PC/Mac/RPi/Linus)</span>
							</li>
						</ul>
					</div>
					<div className="signup-content-summary">
						<p>Ready to take your business to the next level?<br/>
						Sign up now and unlock the power of V2 Cloud's advanced cloud infrastructure.</p>
					</div>
					<div className="signup-content-summary-yellow">
						<p>Get your own Cloud Infrastructure | Add up to 250 users per VM |
							Benefit from the fastest cloud computer on market | Affordable plans |
							Customizable options | No IT expertise needed</p>
					</div>
				</div>
			</Slider>
		</div>
	)
}