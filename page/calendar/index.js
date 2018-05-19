
var ccFile = require('calendar-converter.js')
var calendarConverter = new ccFile.CalendarConverter();

//月份天数表
var DAY_OF_MONTH = [
  [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
];

//判断当前年是否闰年
var isLeapYear = function (year) {
  if (year % 400 == 0 || (year % 4 == 0 && year % 100 != 0))
    return 1
  else
    return 0
};

//获取当月有多少天
var getDayCount = function (year, month) {
  return DAY_OF_MONTH[isLeapYear(year)][month];
};

//获取当前索引下是几号
var getDay = function (index) {
  return index - curDayOffset;
};

var pageData = {
  date: "",                //当前日期字符串
  //arr数据是与索引对应的数据信息
  arrIsShow: [],          //是否显示此日期
  arrDays: [],            //关于几号的信息
  arrInfoEx: [],          //农历节假日等扩展信息
  arrInfoExShow: [],      //处理后用于显示的扩展信息

  //选择一天时显示的信息
  detailData: {
    curDay: "",         //detail中显示的日信息
    curInfo1: "",
    curInfo2: "",
  },
  today_index: '',//记录今天日期索引
  selectIndex: '',
  todayIndex: '',//记录今天日期样式索引
  type: ''
}


//设置当前详细信息的索引，前台的详细信息会被更新
var setCurDetailIndex = function (index) {
  var curEx = pageData.arrInfoEx[index];
  curDay = curEx.sDay - 1;
  pageData.detailData.curDay = curEx.sDay;
  pageData.detailData.curInfo1 = "农历" + curEx.lunarMonth + "月" + curEx.lunarDay;
  pageData.detailData.curInfo2 = curEx.cYear + curEx.lunarYear + "年 " + curEx.cMonth + "月 " + curEx.cDay + "日 " + curEx.lunarFestival;
  if (pageData.type !='1') {
    pageData.selectIndex = curEx.sYear + '' + curEx.sMonth + '' + curEx.sDay;//记录选择的日期，和dateFull作比较
  }
}

//刷新全部数据
var refreshPageData = function (year, month, day) {
  pageData.date = year + '年' + (month + 1) + '月';
  var offset = new Date(year, month, 1).getDay();
  for (var i = 0; i < 42; ++i) {
    pageData.arrIsShow[i] = i < offset || i >= getDayCount(year, month) + offset ? false : true;
    var num = i - offset + 1;
    pageData.arrDays[i] = num;
    var d = new Date(year, month, num);
    var dEx = calendarConverter.solar2lunar(d);
    if (dEx.sYear == year && dEx.sMonth == (month + 1) && dEx.sDay == day) {
      pageData.today_index = i//记录今天日期所在的索引
      if (pageData.todayIndex == null || pageData.todayIndex == '') {
        pageData.todayIndex = dEx.dateFull;
      }
    }
    pageData.arrInfoEx[i] = dEx;
    if ("" != dEx.lunarFestival) {
      pageData.arrInfoExShow[i] = dEx.lunarFestival;
    }
    else if ("初一" === dEx.lunarDay) {
      pageData.arrInfoExShow[i] = dEx.lunarMonth + "月";
    }
    else {
      pageData.arrInfoExShow[i] = dEx.lunarDay;
    }
  }
  if (pageData.type != 2) {
    setCurDetailIndex(pageData.today_index);
  } else {
    setCurDetailIndex(offset + day);
  }
};

var curDate = new Date();
var curMonth = curDate.getMonth();
var curYear = curDate.getFullYear();
var curDay = curDate.getDate();
refreshPageData(curYear, curMonth, curDay);

Page({
  data: pageData,
  today_index: pageData.today_index,
  selectIndex: '',

  goToday: function (e) {
    curDate = new Date();
    curMonth = curDate.getMonth();
    curYear = curDate.getFullYear();
    curDay = curDate.getDate();
    refreshPageData(curYear, curMonth, curDay);
    this.setData(pageData);
    this.setData({ selectIndex: pageData.todayIndex })
  },

  goLastMonth: function (e) {
    this.setData({ type: '1' });
    if (0 == curMonth) {
      curMonth = 11;
      --curYear
    }
    else {
      --curMonth;
    }
    refreshPageData(curYear, curMonth, 0);
    this.setData(pageData);
    this.setData({ selectIndex: pageData.todayIndex })
    this.setData({ type: '' });
  },

  goNextMonth: function (e) {
    this.setData({ type: '1' });
    if (11 == curMonth) {
      curMonth = 0;
      ++curYear
    }
    else {
      ++curMonth;
    }
    refreshPageData(curYear, curMonth, 0);
    this.setData(pageData);
    this.setData({ selectIndex: pageData.todayIndex })
    this.setData({ type: '' });
  },

  selectDay: function (e) {
    setCurDetailIndex(e.currentTarget.dataset.dayIndex);
    this.setData({
      detailData: pageData.detailData,
      selectIndex: pageData.selectIndex
    })
  },

  bindDateChange: function (e) {
    this.setData({ type: '2' });
    var arr = e.detail.value.split("-");
    refreshPageData(+arr[0], arr[1] - 1, arr[2]);
    this.setData(pageData);
  }
});