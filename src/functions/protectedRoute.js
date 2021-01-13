// Modules
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

// Context
import { Context as UserContext } from "../context/data/UserContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
	const { state } = useContext(UserContext);

	const redirect = (pathname, from) => {
		return (
			<Redirect
				to={{
					pathname,
					state: {
						from,
					},
				}}
			/>
		);
	};

	const routeLogic = (props) => {
		if (state.selectedUser) {
			const { surveyDone } = state.selectedUser;

			switch (props.location.pathname) {
				case "/survey":
					return surveyDone ? (
						redirect("/record", props.location)
					) : (
						<Component {...props} />
					);

				case "/record":
					return !surveyDone ? (
						redirect("/survey", props.location)
					) : (
						<Component {...props} />
					);
				default:
					break;
			}
		} else {
			return redirect("/userid", props.location);
		}
	};

	return <Route {...rest} render={routeLogic} />;
};

export default ProtectedRoute;
