const handlebars = require('handlebars')



handlebars.registerHelper('checkID', id => {
    return id % 2
})

// index 頁面判斷要用哪個圖像的子表達式
handlebars.registerHelper('checkPattern', category => {
    switch (category) {
        case '1':
            return '<i class="fa-solid fa-house"></i>'
        case '2':
            return '<i class="fa-solid fa-van-shuttle"></i>'
        case '3':
            return '<i class="fa-solid fa-face-grin-beam"></i>'
        case '4':
            return '<i class="fa-solid fa-utensils"></i>'
        case '5':
            return '<i class="fa-solid fa-pen"></i>'
    }
})

// 判別 ketword 的子表達式
handlebars.registerHelper('keywordValue', (keyword, value) => {
    return keyword === value
})


// 編輯頁面判斷類別的子表達式
handlebars.registerHelper('checkCategory', (category, value) => {
    return category === value
})


module.exports = handlebars