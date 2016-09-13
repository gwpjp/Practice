
export default function timeElapsed(f){
	var start = new Date().getTime();
	f();
	var end = new Date().getTime();
	console.log(end-start);
}

