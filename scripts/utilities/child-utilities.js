function addClassToChildren(element, classToAdd)
{
	for (var i=0; i<element.children.length; i++)
	{
		if (!element.children[i].classList.contains('noChange'))
		{
			element.children[i].classList.add(classToAdd);
		}
	}
}

function removeClassFromChildren(element, classToRemove)
{
	for (var i=0; i<element.children.length; i++)
	{
		if (!element.children[i].classList.contains('noChange'))
		{
			element.children[i].classList.remove(classToRemove);
		}
	}
}