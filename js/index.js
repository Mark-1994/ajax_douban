var start = 0; // 数据调用起始位置
var count = 10; // 数据条数
var num = 0; // 记录点击加载更多次数
getDate(start, count);
getDate123(0, 10);

// 加载更多
$('#getMoreData').on('click', function() {
    num++;
    start = num * count + 1;
    getDate(start, count);
});

// 正在上映
function getDate(start, count) {
    $.ajax({
        type: 'GET',
        url: 'https://douban.uieee.com/v2/movie/in_theaters',
        dataType: 'jsonp',
        data: {
            start: start,
            count: count
        },
        success: function(result) {
            var subjects = result.subjects;
            var title; // 名字
            var image; // 图片路径
            var average; // 评分
            var str; // 拼接li标签代码段
            var rating; // 评分四舍五入后的值
            subjects.forEach(element => {
                title = element.title;
                image = element.images.small;
                average = element.rating.average;
                average = (average + '').length < 3 ? average + '.0' : average;

                rating = Math.round(average);
                var y = -11 * (10 - rating); // 评分图片的纵坐标

                str = `<li>
                <img src="${image}" alt="${title}">
                <p>${title}</p>
                <span style='background-position: 0 ${y}px;'></span>
                <span>${average}</span>
                <br>
                <input type="button" value="选座购票">
                </li>`;

                $('.nowplaying ul').append(str);
            });
        },
        error: function(e) {
            console.log(e.statusText);
        }
    });
}

// 即将上映
function getDate123(start, count) {
    $.ajax({
        type: 'GET',
        url: 'https://douban.uieee.com/v2/movie/coming_soon',
        dataType: 'jsonp',
        data: {
            start: start,
            count: count
        },
        success: function(result) {
            console.log(result.subjects);
            var subjects = result.subjects;
            var title;
            var image;
            var pubdates;
            var str;
            var strLen; // 上映时间
            subjects.forEach(element => {
                title = element.title;
                image = element.images.small;
                pubdates = element.pubdates;
                strLen = pubdates[0];
                strLen = strLen.substr(5, 5);
                strLen = strLen.split('-').join('月');

                str = `<li>
                <img src="${image}" alt="${title}">
                <p>${title}</p>
                <span>${strLen}日上映</span>
                <br>
                <input type="button" value="选座购票">
                </li>`;

                $('.upcoming ul').append(str);
            });

        },
        error: function(e) {
            console.log(e.statusText);
        }
    });
}