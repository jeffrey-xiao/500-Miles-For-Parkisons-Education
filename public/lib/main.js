function validateForm () {
	var name = $('#name').val().trim();
	var email = $('#email').val().trim();
	var subject = $('#subject').val().trim();
	var comment = $('#comment').val().trim();
	
	if (name == '') {
		$('#error').text('Name cannot be empty!');
		return false;
	}
	
	if (email == '') {
		$('#error').text('Email cannot be empty!');
		return false;
	}
	
	if (subject == '') {
		$('#error').text('Subject cannot be empty!');
		return false;
	}
	
	if (comment == '') {
		$('#error').text('Comment cannot be empty!');
		return false;
	}
	
	if (!validateEmail(email)) {
		$('#error').text('Email is not valid!');
		return false;
	}
	return true;
}

function validateEmail (email) {
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}