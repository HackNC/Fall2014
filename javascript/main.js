////////////////// run this after the page has been built //////////////////
var image = selectRandomBackground();
setHeaderSize();
setBackground(image);
window.addEventListener("resize", function(event) {
	setHeaderSize();
});
startTime();


//display notification center when icon is clicked
var visibleNav = false;
$('#notecenter').click( function() {
	if (visibleNav) {
		$('.notelist').animate({ right: -250 },'slow');
	}
	else {
		$('.notelist').animate({ right: 0 },'slow');
	}
	visibleNav = !visibleNav;
});


// menubar
var lastClicked;
$("ul.topnav li").click(function() { //When trigger is clicked...
	var button = $(this);
	var menu = $(this).find("ul.subnav");
	if (lastClicked) {
		if (lastClicked.hasClass("open") && button.hasClass("open")) {
			menu.fadeOut(100);
			button.removeClass("open");
			lastClicked = null;
			lastHover = null;
		} else {
			menu.fadeIn(100);
			button.addClass("open");
			lastClicked.find("ul.subnav").fadeOut(100);
			lastClicked.removeClass("open");
			lastClicked = button;
			lastHover = button;
		}
	} else {
		menu.fadeIn(100);
		button.addClass("open");
		lastClicked = button;
		lastHover = button;
	}
	menu.find('li a').each(function() {
		$(this).click(function() {
			menu.fadeOut(100);
			button.removeClass("open");
			lastClicked = null;
			lastHover = null;
		});
	});
	var yPos = $(window).scrollTop();
	$(window).scrollTop(yPos);
	return false; // prevents page from scrolling to the top
});


//after menu item is clicked on, can hover between menu items
var lastHover;
$(".element-left ul.topnav > li+li+li").hover(function() { //mouse enter
	var button = $(this);
	var menu = $(this).find("ul.subnav");
	if (lastHover && !button.hasClass("open")) {
			menu.fadeIn(100);
			button.addClass("open");
			lastHover.find("ul.subnav").fadeOut(100);
			lastHover.removeClass("open");
			lastHover = button;
			lastClicked = lastHover;
	}
	menu.find('li a').each(function() {
		$(this).click(function() {
			menu.fadeOut(100);
			button.removeClass("open");
			lastHover = null;
		});
	});
}, function() { //mouse leave
});


////////////////// easter egg //////////////////
if (navigator.userAgent.indexOf("Chrome") != -1) {
	console.log("%c\n _    _               _      _   _   _____ \n| |  | |             | |    | \\ | | / ____|\n| |__| |  __ _   ___ | | __ |  \\| || |     \n|  __  | / _` | / __|| |/ / | . ` || |     \n| |  | || (_| || (__ |   <  | |\\  || |____ \n|_|  |_| \\__,_| \\___||_|\\_\\ |_| \\_| \\_____|\n                                           \n         WELCOME TO HACKER COUNTRY         ", "background-color:black; color:green;font-size:1.5em;");
} else {
	console.log("\n _    _               _      _   _   _____ \n| |  | |             | |    | \\ | | / ____|\n| |__| |  __ _   ___ | | __ |  \\| || |     \n|  __  | / _` | / __|| |/ / | . ` || |     \n| |  | || (_| || (__ |   <  | |\\  || |____ \n|_|  |_| \\__,_| \\___||_|\\_\\ |_| \\_| \\_____|\n                                           \n         WELCOME TO HACKER COUNTRY         ");
}

////////////////// function definitions //////////////////
// scrolling on anchor clicks
$(function() {
	$('a[href*=#]:not([href=#])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			$target = $(this.hash);
			$target = $target.length ? $target : $('[name=' + this.hash.slice(1) +']');
			if ($target.length) {
				$('html,body').animate({
			        // subtract navbar height;
			        scrollTop: ($target.offset().top-$('.nav table').height())
			    }, 500);
				$target.fadeOut(100).fadeIn(500);
				return false;
			}
		}
	});
});


// power button
var poweredOn = true;
var animatingNow = false;
$(function() {
	$('.power').click(function() {
		if (!animatingNow) {
			animatingNow = true;
			if (poweredOn) {
				poweredOn = false;
				$('.everything').fadeOut(400, function() {
					$('.standby').fadeIn();
					animatingNow = false;
				});
			} else {
				$('.standby').fadeOut(200, function() {
					$('.everything').fadeIn();
					poweredOn = true;
					animatingNow = false;
				});
			}
		}
	})
})

function selectRandomBackground() {
	var numImages = 10;
	return Math.floor(Math.random() * numImages);
}

function setHeaderSize() {
	var height = $(window).height();
	$("header").css("height", height);
	$(".background").css("height", height);
	$(".background::before").css("height", height);
	$(".logo-container").css("height", height-70);
	$('.notelist').css("top", $('table').height());
	$('.nav ul').css("top", $('table').height());
	$("footer").css("margin-top", height);
}

function setBackground(image) {
	var size = '320';
	var width = $(window).width();
	if (width <= 640) {
		size = '640';
	} else if (width <= 800) {
		size = '800';
	} else if (width <= 1024) {
		size = '1024';
	} else if (width <= 1600) {
		size = '1600';
	} else {
		size = '2048';
	}
	$('.background').css({'background-image': 'url(./images/' + image + '_' + size + '.jpg)'});
}

function startTime() {
	var today=new Date();
	var day=today.getDay();
	var month=today.getMonth();
	var date=today.getDate();
	var h=today.getHours();
	var m=today.getMinutes();
	var amPm = getAmPm(h);
	switch(day) {
		case 0:
			day = "Sunday";
			break;
		case 1:
			day = "Monday";
			break;
		case 2:
			day = "Tuesday";
			break;
		case 3:
			day = "Wednesday";
			break;
		case 4:
			day = "Thursday";
			break;
		case 5:
			day = "Friday";
			break;
		case 6:
			day = "Saturday";
			break;
		default:
			day = "";
			break;

	}
	switch(month) {
		case 0:
			month = "January";
			break;
		case 1:
			month = "February";
			break;
		case 2:
			month = "March";
			break;
		case 3:
			month = "April";
			break;
		case 4:
			month = "May";
			break;
		case 5:
			month = "June";
			break;
		case 6:
			month = "July";
			break;
		case 7:
			month = "August";
			break;
		case 6:
			month = "September";
			break;
		case 6:
			month = "October";
			break;
		case 6:
			month = "November";
			break;
		case 6:
			month = "December";
			break;
		default:
			month = "";
			break;

	}
	h = fixHours(h);
	m = fixMinutes(m);
	document.getElementById('clock').innerHTML = day + " " + month + " " + date + ", " + h + ":" + m + " " + amPm;
	var t = setTimeout(function(){
		startTime()
	},1000);
}

function getAmPm(h) {
	if (h >= 12) {
		return "PM";
	} else {
		return "AM";
	}
}

function fixHours(h) {
	if (h > 12) {
		return h - 12;
	} else if (h == 0) {
		return 12;
	} else {
		return h;
	}
}

function fixMinutes(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
