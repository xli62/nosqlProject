function findItem() {
	fetch('/clicked', {method: 'POST'})
    .then(function(response) {
    	if(response.ok) {
    		return response.json();
      	}
      	throw new Error('Request failed.');
    })
    .then(function(data) {
    	alert(data.item);
    })
    .catch(function(error) {
      	console.log(error);
    });
}
