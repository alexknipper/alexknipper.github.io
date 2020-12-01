function startSummonLoop(element)
{
	for (i=0; i<element.children.length; i++)
	{
		if (!element.children[i].classList.contains('noChange'))
		{
			// Remove any unwanted stuff
			element.children[i].classList.remove('animated');
			element.children[i].classList.remove('animated-idle');
			element.children[i].removeEventListener('animationend', beginIdling);
			element.children[i].removeEventListener('animationend', syncIdle);
			element.children[i].removeEventListener('animationend', syncDisperse);
			// Kick off the loop
			element.children[i].classList.add('summoning-loop');
			element.children[i].classList.add('animated');
			element.children[i].addEventListener('animationend', beginIdling);
		}
	}
}

function beginIdling()
{
	if (!this.classList.contains('noChange'))
	{
		this.classList.remove('animated');
		this.removeEventListener('animationend', beginIdling);
		if (this.classList.contains('summoning-loop') && !(this.classList.contains('arcane-ring') || this.classList.contains('arcane-center')))
		{
			this.classList.add('animated-idle');
			setTimeout(this.addEventListener('animationend', syncIdle), 500);
		}
	}
}

function syncIdle()
{
	if (!this.classList.contains('noChange'))
	{
		this.classList.remove('animated-idle');
		this.removeEventListener('animationend', syncIdle);
		var allDone = true;
		for (i=0; i<this.parentNode.children.length; i++)
		{
			if (!this.parentNode.children[i].classList.contains('noChange') && (this.parentNode.children[i].classList.contains('animated-idle')) && allDone)
			{
				allDone = false;
			}
		}
		if (allDone && this.classList.contains('summoning-loop'))
		{
			for (i=0; i<this.parentNode.children.length; i++)
			{
				disperse.call(this.parentNode.children[i]);
			}
		}
	}
}

function disperse()
{
	if (this.classList.contains('summoning-loop'))
	{
		this.style.setProperty('--direction', 'reverse');
		this.classList.add('animated');
		this.addEventListener('animationend', syncDisperse);
	}
}

function syncDisperse()
{
	if (!this.classList.contains('noChange'))
	{
		this.classList.add('notSummoned');
		this.classList.remove('animated');
		this.style.removeProperty('--direction');
		this.removeEventListener('animationend', syncDisperse);
		var allDone = true;
		for (i=0; i<this.parentNode.children.length; i++)
		{
			if (!this.parentNode.children[i].classList.contains('noChange') && !(this.parentNode.children[i].classList.contains('notSummoned')) && allDone)
			{
				allDone = false;
			}
		}
		if (allDone)
		{
			for (i=0; i<this.parentNode.children.length; i++)
			{
				setTimeout(function(element){restartLoop(element);},500,this.parentNode.children[i]);
			}
		}
	}
}

function restartLoop(element)
{
	element.classList.remove('notSummoned');
	element.classList.add('animated');
	element.addEventListener('animationend', beginIdling);
}

function endSummonLoop(element)
{
	for (i=0; i<element.children.length; i++)
	{
		if (!element.children[i].classList.contains('noChange'))
		{
			element.children[i].classList.remove('summoning-loop');
		}
	}
}