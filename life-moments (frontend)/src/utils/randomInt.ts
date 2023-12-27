export const getRandomInt = (max) => {
	return Math.floor(Math.random() * max)
}

export function get_random (list) {
	return list[Math.floor((Math.random()*list.length))];
}