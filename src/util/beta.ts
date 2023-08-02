export default function isBeta(): boolean {
	return (new URLSearchParams(window.location.search).has('beta'));
}
