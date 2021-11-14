var scrollLength = [0] 

document.addEventListener('scroll', function(){

    var h = document.documentElement, 
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';

    console.log('st, sh', st, sh);

    var scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
    lastElement = scrollLength.slice(-1)[0];
    // if currentElement > lastElement, only then add it to array
    if (scrollTop > lastElement){
        scrollLength.push(scrollTop);
    }
    max_value = Math.max.apply(Math, scrollLength);
    scrollLength_in_mtrs = max_value * 0.0002645833;


    // console.log('percent', percent);
    console.log('Scrollometer:->>>', scrollLength_in_mtrs, 'meters');
		
});
