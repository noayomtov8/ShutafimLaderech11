$=jQuery.noConflict();

$(document).ready(function(){
    console.log ("custom js loaded 2!");

    ToggleBurgerMenuPages();

    window.addEventListener('popstate', function (event) {
        // Log the state data to the console
        console.log("url changed2");
        ToggleBurgerMenuPages();
        // $(".burger-wrapper").empty();
        // $(".lesson__content .page .page__menu").detach().appendTo(".burger-wrapper");

        waitForElementToDisplay(
            'section.blocks-lesson a.blocks-button__button[href="#/lessons/7PDh9hJBnQgzqqPSozsXKwcV3PD7hM5B"]',
            function() {
                console.log("found odot button in homepage");

                $('section.blocks-lesson a.blocks-button__button[href="#/lessons/7PDh9hJBnQgzqqPSozsXKwcV3PD7hM5B"]').click(function (ev) {
                    console.log('Clicked odot from homepage!');
                    // ev.preventDefault();
                    $("#AboutPopup").fadeIn();
                });
            },
            25,
            10000
        );

    });

    // wait 1 (on lessons) - fixed, only do it on homepage as well
    waitForElementToDisplay(
        '.transition-group .page-lesson-wrap',
        CodeAfterSideMenuLoads,
        25,
        10000
    );

    // wait 2 - fixed.
    waitForElementToDisplay(
        'body.homepage div a.cover__header-content-action-link',
        CodeAfterHeaderLoads,
        25,
        10000
    );

    //new
    waitForElementToDisplay(
        'body.homepage div a.cover__header-content-action-link',
        CodeAfterHeaderLoads_secondaryHeader,
        25,
        10000
    );

    // wait 3
    // THIS HAS CHANGED!!! (css selector)
    waitForElementToDisplay(
        'ol.nav-sidebar__outline-list li a.nav-sidebar__outline-section-item__link',
        function() {
            console.log('wait 3: lesson-lists');

            $('ol.nav-sidebar__outline-list li a.nav-sidebar__outline-section-item__link').each(function() {
                if ($(this).attr('href').indexOf("7PDh9hJBnQgzqqPSozsXKwcV3PD7hM5B")>=0) {
                    console.log('FOUND IT!');
                    $(this).click(function (ev) {
                        console.log('Clicked odot from menu!');
                        // ev.preventDefault();
                        $("#AboutPopup").fadeIn();
                    });
                }
            });
        },
        25,
        10000
    );



    $("#odotExit").click(function(ev){
        ev.preventDefault();
        $("#AboutPopup").fadeOut();
    });

});

function ToggleBurgerMenuPages() {
    if (window.location.href.indexOf("lessons") < 0) {
        $('body').addClass('homepage');
    }
    else {
        $('body').removeClass('homepage');
    }
}

function CodeAfterSideMenuLoads() {
    console.log('wait 1: transition-group (on lessons)');
    $('.transition-group .page-lesson-wrap').removeClass("lesson--open");
    // $('nav a.lesson-link').on("click",function() {
    $('nav ol.nav-sidebar__outline-list li a').on("click", function () {
        $('.lesson__content button.page-menu-toggle').click();
    });

    $('#AboutPopup').click(function (ev) {
        if (ev.target !== this) return;
        $("#AboutPopup").fadeOut();
    });


}

function waitForElementToDisplay(selector, callback, checkFrequencyInMs, timeoutInMs) {
    var startTimeInMs = Date.now();
    (function loopSearch() {
        if (document.querySelector(selector) != null) {     // object exists - call the function
            callback();
            return;
        }
        else {
            setTimeout(function () {
                if (timeoutInMs && Date.now() - startTimeInMs > timeoutInMs)
                    return;
                loopSearch();
            }, checkFrequencyInMs);
        }
    })();
}


function CodeAfterHeaderLoads() {
    console.log('wait 2: header button');

    $("body.homepage div a.cover__header-content-action-link").after( "<div id=\"creditLine\"><p>תוצר זה פותח במסגרת תואר ראשון <a href=\"https://www.hit.ac.il/telem/B.A\" target=\"_blank\">בפקולטה לטכנולוגיות למידה, HIT</a></p></div>" );
}

// Homepage - new function adding secondary header
function CodeAfterHeaderLoads_secondaryHeader() {
    $("h1.cover__header-content-title.brand--head").after( "<p id='secondaryHeaderHomePage'>ברכותינו על תחילתה של ידידות מופלאה. <br> כדי להפוך את תהליך הקליטה והמשך דרככם המשותפת יחד לקלה יותר פותחה הפלטפורמה \"שותפים לדרך\" שמרכזת את כל המידע שתצטרכו לדעת על הכלב.\<n></n></p>" );
}

function checkWidth() {
    if ($(window).width() > 990) {
        $('#custom-bar .burger-wrapper a').click();
    }
}

// a.overview__button => a.cover__header-content-action-link
// .transition-group>div.lesson => .transition-group .page-lesson-wrap

