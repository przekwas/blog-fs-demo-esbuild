import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GiSpellBook } from 'react-icons/gi';
import { BsFacebook, BsGithub, BsTwitter, BsYoutube } from 'react-icons/bs';

interface NavbarProps {}

const Navbar = (props: NavbarProps) => {
	return (
		<div className="container">
			<nav className="navbar navbar-expand-lg">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						<span className="d-flex align-items-center">
							<GiSpellBook className="text-primary fs-3" />
							<span className="ms-1">Unveiling the Arcane</span>
						</span>
					</Link>
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<div className="container-fluid ">
							<div className="row">
								<div className="col">
									<ul className="mb-2 navbar-nav mb-lg-0">
										<li className="nav-item">
											<NavLink
												className={({ isActive }) =>
													`nav-link ${isActive && 'active'}`
												}
												to="/">
												Home
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink
												className={({ isActive }) =>
													`nav-link ${isActive && 'active'}`
												}
												to="/compose">
												Compose
											</NavLink>
										</li>
										<li className="nav-item">
											<NavLink
												className={({ isActive }) =>
													`nav-link ${isActive && 'active'}`
												}
												to="/admin">
												Admin
											</NavLink>
										</li>
									</ul>
								</div>
								<div className="col-12 col-md-4">
									<div className="d-flex justify-content-between align-items-center fs-3 w-md-25 px-md-4 text-info-emphasis">
										<BsFacebook />
										<BsYoutube />
										<BsTwitter />
										<BsGithub />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
