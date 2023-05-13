export default function arrayToMap(obj, key) {
	return new Map(obj.map((item) => [item[key], item]));
}
