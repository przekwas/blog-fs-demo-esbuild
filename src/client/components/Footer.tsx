import React from 'react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsGithub, BsTwitter, BsYoutube } from 'react-icons/bs';

const Footer = () => {
	return (
		<footer className="bg-light text-center text-lg-start mt-5">
			<div className="container p-4">
				<div className="row">
					<div className="col-lg-6 col-md-12 mb-4 mb-md-0">
						<h5 className="text-uppercase">Unveiling the Arcane</h5>
						<p>
							Explore the depths of magic and mystery in the fantastical world of
							Dungeons & Dragons.
						</p>
					</div>

					<div className="col-lg-3 col-md-6 mb-4 mb-md-0">
						<h5 className="text-uppercase">Navigate</h5>
						<ul className="list-unstyled mb-0">
							<li>
								<Link to="/" className="text-dark">
									Home
								</Link>
							</li>
							<li>
								<Link to="/search" className="text-dark">
									Search
								</Link>
							</li>
							<li>
								<Link to="/compose" className="text-dark">
									Compose
								</Link>
							</li>
							<li>
								<Link to="/admin" className="text-dark">
									Admin
								</Link>
							</li>
						</ul>
					</div>

					<div className="col-lg-3 col-md-6 mb-4 mb-md-0">
						<h5 className="text-uppercase">Follow us</h5>
						<a href="https://facebook.com" className="me-3 text-dark">
							<BsFacebook />
						</a>
						<a href="https://youtube.com" className="me-3 text-dark">
							<BsYoutube />
						</a>
						<a href="https://twitter.com" className="me-3 text-dark">
							<BsTwitter />
						</a>
						<a href="https://github.com" className="text-dark">
							<BsGithub />
						</a>
					</div>
				</div>
			</div>

			<div className="text-center p-3 bg-primary text-white">
				&copy; {new Date().getFullYear()} Unveiling the Arcane. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
