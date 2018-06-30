const status = ['pending', 'resolved', 'reject']

class Promise {
	constructor(callback){
		this.status = status[0];
		this.value = null;
		this.queue = [];
		callback(this.resolve.bind(this), this.reject.bind(this));
	}
	resolve(result){
		this.status = status[1];
		this.value = result;

		this.queue.forEach((item)=>this.handle(item));

	}
	reject(error){
		this.status = status[2];
		this.value = error;

	}

	handle(obj){
		if (this.status == status[1] && typeof obj.onfulfiled == 'function') {
			obj.onfulfiled(this.value);
		}
		if (this.status == status[2] && typeof obj.onfailed == 'function') {
			obj.onfailed(this.value);
		}


	}

	then(resolve, reject){
		const obj = {
			onfulfiled: resolve,
			onfailed: reject
		}

		if(this.status === status[0]){
			this.queue.push(obj);
		} else {
			this.handle(obj);
		}

		return this;
	}
}



const promise = new Promise(function(resolve, reject){
	setTimeout(() => resolve(1), 100)
})

promise.then((result)=>{
	console.log(result);
})
