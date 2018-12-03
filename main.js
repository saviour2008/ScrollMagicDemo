$(function () {
    var scrollMagicController = new ScrollMagic();
    var tween1 = TweenMax.to('#animation-1', 0.3, {
        backgroundColor: 'rgb(255, 39, 46)',
        scale: 10,
        rotation: 360
    });
    var scene1 = new ScrollScene({
        triggerElement: '#scene-1',
        reverse: true,
        offset: 50 /* offset the trigger 50px below #scene's top */
    })
        .setClassToggle('body', 'scene-1-active')
        .setTween(tween1)
        .addTo(scrollMagicController);


    var tween2 = TweenMax.to('#animation-2', 0.3, {
        backgroundColor: 'rgb(0, 255, 187)',
        scale: 10,
        rotation: 360
    });

    var scene2 = new ScrollScene({
        triggerElement: '#scene-2',
        duration: 300
    })
        .setClassToggle('body', 'scene-2-active')
        .setTween(tween2)
        .addTo(scrollMagicController);

    // var tween2 = TweenMax.to('#animation-2', 0.3, {
    //     backgroundColor: 'rgb(0, 255, 187)',
    //     scale: 10,
    //     rotation: 360
    // });
    // var tlCurtain = new TimelineMax();
    // tlCurtain.set($curtain, {yPercent: -100})
    // .to($curtain, 0.3, {yPercent: 0, ease:Power4.easeOut})
    // .to([tomatoLeft2, tomatoLeaves2, tomatoRight2, letters2, bracketRight2, bracketLeft2], 0.01, {fill: "#707070"})
    // .to($curtain, 0.3, {yPercent: -100, ease:Power4.easeOut})

    // var scene2 = new ScrollScene({
    //     triggerElement: '#scene-2',
    //     duration: 300
    // })
    //     .addTo(scrollMagicController)
    //     .setTween(tlCurtain);


    var tween3 = TweenMax.fromTo('#animation-3', 0.3,
        {
            backgroundColor: 'rgb(17, 0, 98)',
            scale: 5,
            left: -400
        },
        {
            scale: 1,
            left: 400,
            rotation: 360,
            repeat: -1, /* Aka an infinite amount of repeats */
            yoyo: true /* Make it go back and forth or not */
        });

    var scene3 = new ScrollScene({
        triggerElement: '#scene-3',
        offset: 50
    })
        .setClassToggle('body', 'scene-3-active')
        .setTween(tween3)
        .addTo(scrollMagicController);

    var cols = ['#f5d76e', '#f7ca18', '#f4d03f', '#ececec', '#ecf0f1', '#a2ded0'];
    var stars = 250;

    for (var i = 0; i <= stars; i++) {

        var size = Math.random() * 30;
        var color = cols[parseInt(Math.random() * 4)];

        $('#starsBox').prepend('<span style=" width: ' + size + 'px; height: ' + size + 'px; top: ' + Math.random() * 100 + '%; left: ' + Math.random() * 100 + '%; background: ' + color + '; box-shadow: 0 0 ' + Math.random() * 10 + 'px' + color + ';"></span>');
    };

    setTimeout(function () {
        $('#starsBox span').each(function () {
            $(this).css('top', Math.random() * 100 + '%').css('left', Math.random() * 100 + '%');
        });
    }, 1);

    setInterval(function () {
        $('#starsBox span').each(function () {
            $(this).css('top', Math.random() * 100 + '%').css('left', Math.random() * 100 + '%');
        });
    }, 100000);

});