import jwt from "jsonwebtoken";
import environment from "../config/environment";

export const CheckToken = function(req, res, next) {
	try {
		let token = req.headers["x-access-token"] || req.headers["authorization"]
		if (token.startsWith("Bearer ")) {
			// Remove Bearer from string
			token = token.slice(7, token.length)
		}

		if (!token)
			return res.status(401).send({
				success: false,
				message: "Unauthorized! Auth token is not supplied!"
			})

		jwt.verify(token, environment.privateJWT, (err, decoded) => {
			if (err) {
				return res.status(401).send({
					success: false,
					message: "Unauthorized! Token is not valid!"
				})
			} else {
				req.decoded = decoded
				next()
			}
		})
	} catch (e) {
		return res.status(401).send({
			success: false,
			message: "Unauthorized! Auth token is not supplied!"
		})
	}
}