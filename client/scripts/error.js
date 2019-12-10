function show_error(error)
{
	var error_dom = document.getElementById("error");
	hide_error();
	if (error_dom)
	{
		error_dom.innerHTML = "Error: " + error + ".";
		error_dom.style.display = "inline-block";
	}
}

function hide_error()
{
	var error_dom = document.getElementById("error");
	if (error_dom)
	{
		error_dom.innerHTML = "Error: ";
		error_dom.style.display = "none";
	}
}
