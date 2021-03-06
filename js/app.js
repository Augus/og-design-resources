Array.prototype.getUnique = function(){
   var u = {}, a = [];
   for(var i = 0, l = this.length; i < l; ++i){
      if(u.hasOwnProperty(this[i])) {
         continue;
      }
      a.push(this[i]);
      u[this[i]] = 1;
   }
   return a;
}

var app = angular.module("resourcesApp", ['ngAnimate', 'mgo-mousetrap']);

app.filter('highlight', function($sce) {
    return function(text, phrase) {
      if (phrase) text = text.replace(new RegExp('('+phrase+')', 'gi'),
        '<span class="highlighted">$1</span>')

      return $sce.trustAsHtml(text)
    }
});


app.controller('RootController', function($scope, $location, $timeout) {

    $scope.onNavClick = function (index) {
        var $target = $(".resource-section").eq(index);
        $(window).scrollTo($target, 250);
    };

    $scope.keyword = "";
    $scope.allTags = [];

    $scope.search = function () {
        $timeout(function () {
            $("#search").focus().select();
        }, 100);
    };
    $scope.onSearchKeyUp = function (event) {
        var keyCode = event.keyCode;
        if (keyCode == 27) {
            $timeout(function () {
                $("#search").blur();
            }, 100);
        }
    };

    $scope.searchFilter = function(resource) {

        if (resource) {

            var isMatch = false,
                keywords = $scope.keyword.split(" ");

            for (var i = 0; i < keywords.length; i++) {
                
                var  keyword = keywords[i].toLowerCase();

                var tags = resource.tags && resource.tags.toLowerCase() || "",
                    resourceUrl = resource.linkurl && resource.linkurl.toLowerCase(),
                    resourceName = resource.name.toLowerCase(),
                    resourceDescription = resource.descript.toLowerCase();

                if (tags.indexOf(keyword) != -1 || 
                    resourceName.indexOf(keyword) != -1 || 
                    resourceUrl.indexOf(keyword) != -1 || 
                    resourceDescription.indexOf(keyword) != -1) {
                    isMatch = true;
                }
                else {
                    isMatch = false;
                    return false;
                }
            }

            return isMatch;
            // debugger
            // var keyword = $scope.keyword.toLowerCase(),
            //     tags = resource.tags && resource.tags.toLowerCase() || "",
            //     resourceUrl = resource.linkurl && resource.linkurl.toLowerCase(),
            //     resourceName = resource.name.toLowerCase(),
            //     resourceDescription = resource.descript.toLowerCase();

            // if (tags.indexOf(keyword) != -1 || 
            //     resourceName.indexOf(keyword) != -1 || 
            //     resourceUrl.indexOf(keyword) != -1 || 
            //     resourceDescription.indexOf(keyword) != -1) {
            //     return true;
            // }
        }
        return false;
    };

    $(window).on("scroll", function () {
        var min = 999999999,
            idx = -1,
            $closest,
            windowHeight = $(window).height(),
            scrollTop = $(this).scrollTop(),
            $sectionTitles = $(".resource-section");

        $sectionTitles.each(function (index) {

            var $sectionTitle = $(this),
                middle = $sectionTitle.offset().top,
                diff = Math.abs(scrollTop - middle);

            if (diff <= min) {
                min = diff;
                idx = index;
                // console.log(middle);
                $closest = $sectionTitle;
            }
        });

        $(".nav-item").removeClass("active").eq(idx).addClass("active");
        // console.log(scrollTop);
    });

    

    $scope.resources = [{
        category: "Daily  每日必逛",
        descript: "這些網站非常適合天天來逛逛，是增廣見聞的好地方！",
        items: [{
            linkurl: "https://dribbble.com/",
            thumbnail: "images/rscs/dribbble.png",
            name: "Dribbble",
            descript: "設計領域最熱門的社群之一，大神設計師都會在上面分享作品",
            tags: "ui 界面 介面 gif 靈感 設計 app web 網頁 行動 社群 大神 交互 ixd interactive"
        }, {
            linkurl: "https://www.behance.net/",
            thumbnail: "images/rscs/behance.jpg",
            name: "Behance",
            descript: "Adobe 旗下的設計師作品分享社群，在這裡你可以找到非常完整的設計概念！",
            tags: "ui 界面 介面 靈感 作品集 設計 adobe branding app web 網頁 行動 社群 大神 每日 "
        }, {
            linkurl: "http://www.pttrns.com/",
            thumbnail: "images/rscs/pttrns.jpg",
            name: "Pttrns",
            descript: "收集各種界面設計模式（Patterns），收藏在這裡的都是精品！",
            tags: "patterns pttrn mobile ui components 樣式 模式 介面 界面 每日 "
        }, 
        {
            isNew : true,
            linkurl: "http://colorhunt.co/",
            thumbnail: "images/rscs/colorhunt.jpg",
            name: "Color Hunt",
            descript: "每日配色靈感，有空就來這裡挖掘神氣的色彩靈感！",
            tags: "color 顏色 色彩 配色 每日 靈感"
        },
        {
            isNew: true,
            linkurl: "http://capptivate.co/",
            name: "CAPPTIVATE",
            thumbnail: "images/rscs/capptivate.png",
            descript: "Capptivate.co captures fleeting transitions between app screens and delightful animated UI elements that we will otherwise lose forever as apps and operating systems continue to evolve.",
            tags: "animation gif ui 界面 介面 每日 ixd interactive 靈感"
        }, 
        {
            isNew: true,
            linkurl: "https://twitter.com/uiGIFs/",
            name: "UI Gif",
            color: "#A52F57",
            descript: "值得關注的 Twitter 帳號，時常分享有趣的 Gif 介面動畫靈感！",
            tags: "animation gif ui 界面 介面 每日 ixd interactive 靈感"
        }, 
        {
            isNew: true,
            linkurl: "https://instagram.com/gifux/",
            color: "#EB5E60",
            name: "gifux",
            descript: "Instagram 上值得關注的帳號，每日分享有趣的 Gif 介面動畫靈感！",
            tags: "animation gif ui 界面 介面 每日 ixd interactive 靈感"
        }, 
        {
            linkurl: "http://www.ui.cn/",
            thumbnail: "images/rscs/uicn.jpg",
            name: "UI中国",
            descript: "专业的界面设计师交流、学习/展示平台.同时也是UI设计师人才流动的集散地,会员均为一线UI设计师,覆盖主流互联网公司。",
            tags: "中國 對岸 ui 界面 介面 每日 "
        }, 
        {
            linkurl: "http://www.boxui.com/",
            // thumbnail: "images/rscs/boxui.jpg",
            name: "BoxUI",
            color: "#352D4D",
            descript: "专注于以用户体验为中心的设计，分享精彩的UI设计、交互设计、用户研究作品及相关设计理论知识。",
            tags: "中國 對岸 pttrns patterns ui 界面 介面 每日 ixd interactive"
        }, 
        {
            linkurl: "http://usepanda.com/app/",
            // thumbnail: "images/rscs/panda.jpg",
            name: "Panda",
            color: "#6D6192",
            descript: "國外知名的服務，除了收入Dribble最熱門的作品外，你也可以在這裡看到產業最的訊息",
            tags: "新聞 靈感 ui 界面 介面 每日 "
        }, {
            linkurl: "http://littlebigdetails.com/",
            // thumbnail: "images/rscs/littlebigdetails.jpg",
            name: "Big Details",
            color: "#69B0C1",
            descript: "非常棒的網站，發掘出很多App裡頭的細節設計，非常值得做為借鏡！",
            tags: "細節 靈感 ui 界面 介面 每日 交互"
        }, 

        ]
    }, {
        category: "App  設計參考",
        descript: "App設計沒有靈感，趕快到這些網站逛逛吧！",
        items: [{
            linkurl: "http://appui.mobi/",
            thumbnail: "images/rscs/appmobiledesign.jpg",
            name: "APP UI",
            descript: "對岸收藏行動介面設計的網站，發現設計、分享設計",
            tags: "app patterns pttrn mobile ui components 樣式 模式 介面 界面 對岸"
        }, {
            linkurl: "http://inspired-ui.com/",
            thumbnail: "images/rscs/inspiredui.jpg",
            name: "Inspired UI",
            descript: "收藏各種行動界面設計，你可以在這裡找到各種設計模式的好設計。",
            tags: "app patterns pttrn mobile ui components 樣式 模式 介面 界面 "
        }, {            
            linkurl: "http://www.uisheji.cn/",
            // thumbnail: "images/rscs/uidesign.jpg",
            name: "UI設計",
            color: "#33425B",
            descript: "收藏各式各樣有用的設計資源",
            tags: "app patterns pttrn mobile ui components 樣式 模式 介面 界面 "
        }, {
            linkurl: "http://www.mobile-patterns.com/user-profiles",
            // thumbnail: "images/rscs/mobilepatterns.jpg",
            name: "Mobile Patterns",
            color: "#526ED0",
            descript: "與 Pttrns 相似，這裡也有許多設計樣式可以參考",
            tags: "app patterns pttrn mobile ui components 樣式 模式 介面 界面 "
        }, {
            linkurl: "http://mobileawesomeness.com/?ref=tap",
            // thumbnail: "images/rscs/mobileawesomeness.jpg",
            name: "Mobile Awesomeness",
            color: "#484CB0",
            descript: "在這裡除了可以找到許多免費的 Logo 素材外，你也可以付費購買一些超讚的作品！",
            tags: "app logo mobile ui components 樣式 模式 介面 界面 "
        }, {
            linkurl: "http://www.lovelyui.com/",
            thumbnail: "images/rscs/lovelyui.jpg",
            name: "lovely UI",
            descript: "lovely UI 是 tumblr 平台上的知名部落格，這裡收藏許多簡潔好看的界面設計。",
            tags: "app patterns pttrn mobile ui components 樣式 模式 介面 界面 "
        }, {
            linkurl: "http://inspirationmobile.tumblr.com/",
            thumbnail: "images/rscs/mobiledesigninspiration.jpg",
            name: "Mobile Design Inspiration",
            descript: "Mobile Design Inspiration 每天分享許多來自世界各地的良好界面、圖示。",
            tags: "app gif ixd interactive ui 介面 界面 "
        }, {
            linkurl: "http://www.appdesignserved.co/",
            // thumbnail: "images/rscs/appdesignserved.jpg",
            name: "App Design Served",
            color: "#75597D",
            descript: "知名設計社群 Behance 的分站，這裡的 App Design 都是從 Behance 上精挑細選出來的！",
            tags: "app mobile ui components 樣式 模式 介面 界面 adobe"
        }, {
            linkurl: "http://ui4app.com/category/userguide",
            // thumbnail: "images/rscs/ui4app.jpg",
            name: "Ui4App",
            color: "#B0B8B4",
            descript: "分享精美的App界面设计，可以說是對岸版本的Pttrns。",
            tags: "app patterns pttrn mobile ui components 樣式 模式 介面 界面 "
        }, 
        {
            linkurl: "http://www.iospirations.com/",
            // thumbnail: "images/rscs/iospirations.png",
            name: "iospirations",
            color: "#92E0A9",
            descript: "收藏了很多 iOS / Mac 良好的界面設計、圖示設計",
            descript: "定義了各種裝置的尺寸，尺寸ChiCun最給力的設計標準分享網站。",
            tags: "app mobile ui components 介面 界面 logo "
        }, 
        ]
    }, 
    {
        category: "Web  設計參考",
        descript: "網頁設計極品收藏，靈感多到溢出來",
        items: [
        {
            isNew: true,
            linkurl: "https://vine.co/ThisIsSIXUX",
            thumbnail: "images/rscs/sixux.jpg",
            name: "SIX UX",
            descript: "非常用心的介面交互收藏，發現許許多多的介面交互細節。",
            tags: "app gif ixd interactive ui 介面 界面 web 動畫 animation"
        }, 
        {
            linkurl: "http://www.awwwards.com/",
            thumbnail: "images/rscs/awwwards.jpg",
            name: "Awwwards",
            descript: "在這裡你看到來至世界各地超讚的網頁設計，除此之外你也可以看到這個網站在這種各種分析指標的分數！",
            tags: "html css award best 網站 靈感 inspiring ui web 大獎"
        }, 
        {
            linkurl: "http://www.webdesignerdepot.com/",
            thumbnail: "images/rscs/webdesignerdepot.jpg",
            name: "Webdesigner Depot",
            descript: "Webdesigner Depot is one of the most popular blogs about web design trends, tutorials and much more.",
            tags: "web website ui inspiring 靈感 網站"
        }, {
            linkurl: "http://www.cssdesignawards.com/",
            thumbnail: "images/rscs/cssdesignawards.jpg",
            name: "CSSDA",
            descript: "CSS Design Awards honors and recognizes web designers, developers and agencies that push the boundaries of web design with inspiring and creative work.",
            tags: "html css award best 網站 靈感 inspiring ui web 大獎"
        }, {
            linkurl: "http://www.cssawards.net/",
            thumbnail: "images/rscs/cssawards.jpg",
            name: "CSS Awards",
            descript: "在這裡你看到來至世界各地超讚的網頁設計，學習他們是如何使用CSS進行設計！",
            tags: "html css award best 網站 靈感 inspiring ui web 大獎"
        }, 
        {
            linkurl: "http://land-book.com/",
            name: "Land-Book",
            descript: "這裏收藏了非常多好看又實用的 Landing page，缺少靈感不妨來這看看。",
            color: "#e74c3c",
            tags: "web website ui inspiring landing 著陸 靈感 網站"
        },
        {
            linkurl: "http://www.siteinspire.com//",
            thumbnail: "images/rscs/siteinspire.jpg",
            name: "siteInspire",
            descript: "收藏超過2,500個以上來自世界各地的網頁設計，各個都是精品！",
            tags: "web website ui inspiring 靈感 網站 趨勢 trend"
        }, {
            linkurl: "http://www.webdesignserved.com/",
            thumbnail: "images/rscs/webdesignserved.jpg",
            name: "Web Design Served",
            descript: "知名設計社群 Behance 的分站，這裡的網頁設計都是從 Behance 上精挑細選出來的！",
            tags: "web website ui inspiring 靈感 網站 adobe soical"
        }, {
            linkurl: "http://box.mepholio.com/",
            thumbnail: "images/rscs/mepholio.jpg",
            name: "MephoBox",
            descript: "將網頁解構，你可以在這看到各種良好設計的網頁元件。",
            tags: "web website ui inspiring 靈感 網站 patterns 元件 components"
        }, {
            linkurl: "http://www.webtutorialplus.com/best-website-designs/",
            thumbnail: "images/rscs/webtutorialplus.jpg",
            name: "Best Website Designs",
            descript: "收藏世界各地那些頂尖設計的網站，不過最近好像沒有更新了：（",
        }, {
            linkurl: "http://fltdsgn.com/",
            thumbnail: "images/rscs/fltdsgn.jpg",
            name: "Flat Design",
            descript: "想參考扁平設計風格的網站？來這個網站就對了！",
            tags: "web website ui inspiring 靈感 網站"
        }, {
            linkurl: "http://flatdsgn.com/",
            thumbnail: "images/rscs/flatdsgn.jpg",
            name: "Flat DSGN",
            descript: "超多 Flat 風格的網站設計可以參考，與上一個 Flat Design 非常相似",
            tags: "web website ui inspiring 靈感 網站 flat 扁平"
        }, {
            linkurl: "http://bm.s5-style.com/",
            color: "#006C61",
            name: "S5-Style",
            descript: "來自日本的靈感網站，分享非常多超好看的網站",
            tags: "web website ui inspiring 靈感 網站 日本 japan 配色"
        },
        ]
    }, {
        category: "ICON  設計參考",
        descript: "精品 ICON 設計收藏",
        items: [
        {
            isNew: true,
            linkurl: "http://iconstore.co/",
            thumbnail: "images/rscs/iconstore.jpg",
            name: "IconStore",
            descript: "超多超棒的 ICON Set 免費下載，而且都提供商業使用呢！",
            tags: "icon 圖示 資源 免費 商用 set svg"
        }, 
        {
            linkurl: "http://www.overlapps.com/",
            thumbnail: "images/rscs/overlapps.jpg",
            name: "overlapps",
            descript: "收藏來自世界各地的優良 ICON 設計，是一個非常專注在 ICON 設計整理與分享的好地方！",
            tags: "icon 圖示"
        }, 
        {
            linkurl: "http://iosicongallery.com/",
            thumbnail: "images/rscs/iosicongallery.jpg",
            name: "iOS Icon Gallery",
            descript: "收藏非常多的 iOS 系統上的 ICON 設計，各個案例都是精選！",
            tags: "icon 圖示"
        }, {
            linkurl: "http://www.iconsfeed.com/",
            thumbnail: "images/rscs/iconsfeed.jpg",
            name: "Iconsfeed",
            descript: "Iconsfeed 就像是 ICON 界的 Pttrns，你可以閱覽各種分類的 ICON 設計。",
            tags: "icon 圖示"
        }, ]
    }, {
        category: "LOGO  設計參考",
        descript: "多個LOGO網站，滿滿的都是想法",
        items: [{
            linkurl: "http://logopond.com/",
            thumbnail: "images/rscs/logopond.jpg",
            name: "Logopond",
            descript: "提供眾多的品牌 Logo 設計，是一個尋找 Logo 靈感的好地方",
            tags: "logo cis 商業設計 名片 busienss 商標 mark"
        }, {
            linkurl: "http://logofury.com/",
            thumbnail: "images/rscs/logofury.jpg",
            name: "LogoFury",
            descript: "收藏非常多的 Logo，讓設計師們找尋靈感畫廊，在這裡你也可以看到其他人對這些概念的評價",
            tags: "logo cis 商業設計 名片 busienss 商標 mark"
        }, {
            linkurl: "http://logos.co/",
            thumbnail: "images/rscs/logos.jpg",
            name: "logos",
            descript: "在這裡除了可以找到許多免費的 Logo 素材外，你也可以付費購買一些超讚的作品！",
            tags: "logo cis 商業設計 名片 busienss 商標 mark"
        }, {
            linkurl: "http://www.logogalleria.com/",
            thumbnail: "images/rscs/logogalleria.jpg",
            name: "Logo Galleria",
            descript: "熱門的 Logo 畫廊，也是一個取得靈感的好地方",
            tags: "logo cis 商業設計 名片 busienss 商標 mark"
        }, {
            linkurl: "http://seeklogo.com/",
            thumbnail: "images/rscs/seeklogo.jpg",
            name: "seeklogo.com",
            descript: "Logo 搜尋引擎，你可以透過關鍵字搜尋，找到意想不到的好靈感",
            tags: "logo cis 商業設計 名片 busienss 商標 mark"
        }, ]
    }, {
        category: "Branding  設計參考",
        descript: "了解品牌設計，最完整的設計靈感",
        items: [{
            linkurl: "http://www.brandingserved.com/",
            thumbnail: "images/rscs/brandingserved.jpg",
            name: "Branding Served",
            descript: "知名設計社群 Behance 的分站，這裡的 Branding Design 都是從 Behance 上精挑細選出來的！",
            tags: "品牌 cis branding 商業設計 名片 busienss 商標 mark"
        }, {
            linkurl: "http://www.underconsideration.com/brandnew/",
            color: "#000",
            name: "Brand New",
            descript: "Brand New: Opinions on corporate and brand identity work. A division of UnderConsideration.",
            tags: "品牌 cis branding 商業設計 名片 busienss 商標 mark"
        }, {
            linkurl: "http://identitydesigned.com/",
            thumbnail: "images/rscs/identitydesigned.jpg",
            color: "#000",
            name: "Identity Designed",
            descript: "Identity Designed is a showcase of brand identity projects from around the world.",
            tags: "品牌 cis branding 商業設計 名片 busienss 商標 mark"
        } ]
    }, {
        category: "Font  字體相關",
        descript: "一些字體相關的網站",
        items: [
        {
            isNew: true,
            linkurl: "http://ziwwwo.com/",
            thumbnail: "images/rscs/ziwwwo.jpg",
            name: "字窩",
            descript: "結合群眾力量的經營，上傳圖片、辨識文字、單一漢字搜尋、拼貼宣傳，字窩可以是平面設計師尋找靈感的工具，也是漢字設計做完善保存的管道。",
            tags: "font 字體 typography 排版"
        }, 
        {
            isNew: true,
            linkurl: "http://tips.justfont.com/",
            thumbnail: "images/rscs/justfont.jpg",
            name: "jf tips",
            descript: "JUSTFONT 的另一個部落格，時常分享有用的文章，讓字體走入生活。",
            tags: "font 字體 typography 排版"
        }, 
        {
            isNew: true,
            linkurl: "http://wordmark.it/",
            color: "#000",
            name: "wordmark.it",
            descript: "自動列出你電腦內安裝過的字體，並且立即測試你所需要的文字，反黑、改大小等等設定都不難，不失為快速選字體的方式噢！",
            tags: "font 字體 typography 排版"
        }, 
        {
            linkurl: "http://blog.justfont.com/",
            thumbnail: "images/rscs/justfont.jpg",
            name: "JUSTFONT 部落格",
            descript: "有關字型和字型相關的專業文章，包括字體設計、專業排版、英文和中文字型討論，如何挑選一套好字型等專業文章.",
            tags: "font 字體 typography 排版"
        }, 
        {
            linkurl: "http://hellohappy.org/beautiful-web-type/",
            name: "Beautiful Web Type",
            color: "#EF4723",
            descript: "A showcase of the best typefaces from the Google web fonts directory.",
            tags: "font 字體 typography 排版"
        },
        {
            linkurl: "http://www.qiuziti.com/",
            thumbnail: "images/rscs/qiuziti.jpg",
            name: "qiuziti",
            descript: "來 qiuziti 上傳圖片，問字體不求人！",
            tags: "font 字體 typography 排版"
        }, {
            linkurl: "https://typekit.com/",
            color: "#2ecc71",
            name: "Typekit",
            descript: "Typekit is a service which allows subscribers to embed fonts into online documents.[1] It allows designers and developers a subscription-based library of hosted, high-quality fonts to use on their websites.",
            tags: "font 字體 typography 排版 adobe"
        }, {
            linkurl: "http://www.fontshop.com/",
            name: "FontShop",
            descript: "FontShop.com -- Find, Try, Buy &amp; Download Fonts",
            color: "#9b59b6",
            tags: "font 字體 typography 排版"
        }, {
            linkurl: "http://www.typeisbeautiful.com/",
            name: "Type is Beautiful",
            descript: "Type is Beautiful 是一个关于文字设计和视觉文化的网站。我们关注的话题包括字体、排版、平面设计、公共设计、技术和视觉文化。",
            color: "#34495e",
            tags: "font 字體 typography 排版"
        }, {
            linkurl: "http://www.typography.com/",
            name: "Hoefler",
            descript: "Webfonts by Hoefler&Co.Meet Cloud.typography, the webfont solution for design professionals. ",
            color: "#e67e22",
            tags: "font 字體 typography 排版"
        }, {
            linkurl: "http://typetester.org/",
            name: "Typetester",
            descript: "The Typetester is an online application for comparison of the fonts for the screen. Its primary role is to make web designer’s life easier.",
            color: "#000",
            tags: "font 字體 typography 排版 branding logo cis 品牌 商業設計 商標"
        }, ]
    }, {
        category: "Colors  配色參考",
        descript: "缺乏配色靈感，從這幾個網站上找找吧",
        items: [
        {
            isNew : true,
            linkurl: "http://colorhunt.co/",
            thumbnail: "images/rscs/colorhunt.jpg",
            name: "Color Hunt",
            descript: "每日配色靈感，有空就來這裡挖掘神氣的色彩靈感！",
            tags: "配色 靈感 顏色 搭配 color"
        },
        {
            linkurl: "http://www.colourlovers.com/",
            thumbnail: "images/rscs/colourlovers.jpg",
            name: "COLOURlovers",
            descript: "討論配色的社群，你可以在這看到來自四面八方的色彩靈感！",
            tags: "配色 靈感 顏色 搭配 color"
        }, {
            linkurl: "http://color.hailpixel.com/",
            thumbnail: "images/rscs/hailpixel.jpg",
            name: "color.hailpixel",
            descript: "非常酷的配色網站，你只需要點、點、點，隨性配色的好地方！",
            tags: "配色 靈感 顏色 搭配 color 工具 tools"
        }, {
            linkurl: "http://www.peise.net/tools/web/",
            thumbnail: "images/rscs/peise.jpg",
            name: "Color Scheme Designe",
            descript: "超級好用的配色工具，你可以使用單色、互補色、類似色等搭配方式找到理想的色彩搭配方案。",
            tags: "配色 靈感 顏色 搭配 color tools 工具"
        }, {
            linkurl: "https://kuler.adobe.com/zh/explore/",
            thumbnail: "images/rscs/kuler.jpg",
            name: "Adobe Kuler",
            descript: "由 Adobe 開發的色彩分享網站，在這裡你可以看到非常多樣的 Color Scheme，讓我們的靈感源源不絕！",
            tags: "配色 靈感 顏色 搭配 color adobe 工具 tools"
        }, 
        {
            linkurl: "http://flatuicolors.com/",
            color: "#1abc9c",
            name: "Flat Colors",
            descript: "扁平化配色案例參考，裡面已經配好各式各樣扁平化設計風格的顏色。",
            tags: "配色 靈感 顏色 搭配 color"
        }, 
        {
            linkurl: "http://nipponcolors.com/#tonoko",
            color: "#2C586A",
            name: "日本の伝統色",
            descript: "想要設計日本風格的配色嗎，趕快來這個網站找配色！",
            tags: "配色 靈感 顏色 搭配 color japan 日本"
        }, 
        {
            linkurl: "http://colourco.de/",
            color: "#954335",
            name: "Colourcode",
            descript: "非常好玩的配色工具，點擊旁邊的工具列，移動滑鼠瞬間就配出超好看的顏色了！",
            tags: "配色 靈感 顏色 搭配 color 工具 tools"
        }, 
        
        ]
    }, {
        category: "PSD  相關資源",
        descript: "需要免費資源？這幾個網站趕快記下來",
        items: [
        {
            isNew: true,
            linkurl: "http://medialoot.com/free/",
            thumbnail: "images/rscs/medialoot.jpg",
            name: "MediaLoot",
            descript: "分類非常細的設計素材網站，好多免費素材可以下載喔！。",
            tags: "psd free photoshop adobe resource 資源 免費 mockups"
        },
        {
            linkurl: "http://freebiesbug.com/",
            thumbnail: "images/rscs/freebiesbug.jpg",
            name: "Freebiesbug",
            descript: "分類非常細的免費 PSD 素材網站，你可以在這裡找到非常棒的免費素材。",
            tags: "psd free photoshop adobe resource 資源 免費"
        }, {
            linkurl: "http://apppsd.com/",
            thumbnail: "images/rscs/apppsd.jpg",
            name: "APPPSD",
            descript: "對岸收藏免費 PSD 素材的網站，素材的品質都很不錯",
            tags: "psd free photoshop adobe resource 資源 免費"
        }, {
            linkurl: "http://www.designfreebies.com/",
            thumbnail: "images/rscs/designfreebies.jpg",
            name: "Design Freebies",
            descript: "精選的 PSD 素材整理下載，提供個人、商用的版權",
            tags: "psd free photoshop adobe resource 資源 免費"
        }, {
            linkurl: "http://graphicburger.com/",
            thumbnail: "images/rscs/graphicburger.jpg",
            name: "GraphicBurger",
            descript: "非常多免費的設計素材可以下載，很多素材都有商業授權，實在非常佛心。",
            tags: "psd free photoshop adobe resource 資源 免費"
        }, {
            linkurl: "http://fribbble.com/",
            thumbnail: "images/rscs/fribbble.jpg",
            name: "Fribbble",
            descript: "Fribbble 從名字就能猜出它在做什麼，這裡收藏很多來自 Dribbble 設計師之手的免費 PSD 素材。",
            tags: "psd free photoshop adobe resource 資源 免費"
        }, ]
    }, {
        category: "Sketch  相關資源",
        descript: "Sketch 資源整理，找資源先來這幾個網站看看",
        items: [
        {
            isNew: true,
            linkurl: "http://sketchrepo.com/",
            thumbnail: "images/rscs/sketchrepo.png",
            name: "Sketch Repo",
            descript: "這裡只收藏高品質的 Sketch 設計素材，全部都是每費下載的哦！",
            tags: "sketch free resource 資源 免費 Bohemian Coding"
        },
        {
            isNew: true,
            linkurl: "http://sketchtalk.io/",
            thumbnail: "images/rscs/sketchtalk.jpg",
            name: "Sketch Talk",
            descript: "Sketch 使用者社區，時時關注 Sketch 最新的開發動態。",
            tags: "sketch free resource 資源 免費 Bohemian Coding 社團 社區 social talk"
        },
        {
            isNew: true,
            linkurl: "https://www.youtube.com/playlist?list=PLLnpHn493BHE6UIsdKYlS5zu-ZYvx22CS",
            thumbnail: "images/rscs/sketch_tutorials.jpg",
            name: "Sketch 3 Tutorial",
            descript: "免費 Sketch 3 使用教學，非常適合給初次入門的設計師學習。",
            tags: "sketch free resource 資源 免費 Bohemian Coding tutorial 教學 入門 learn 學習"
        },
        {
            linkurl: "http://www.sketchappsources.com/",
            thumbnail: "images/rscs/sketchappsources.jpg",
            name: "Sketch App Sources",
            descript: "Sketch 官方的素材分享網站，裡面有非常多的素材可以免費下載。",
            tags: "sketch free resource 資源 免費 Bohemian Coding"
        }, {
            linkurl: "http://sketchcn.com/",
            name: "Sketch 中文網",
            color: "#45BF7B",
            descript: "Sketch 中文網整理了非常多 Sketch 相關的素材、教學，使用 Sketch 的朋友千萬要來看看",
            tags: "sketch free resource 資源 免費 Bohemian Coding 中文 chinese"
        }, {
            linkurl: "http://brilliantsketch.com/",
            thumbnail: "images/rscs/brilliantsketch.jpg",
            name: "Brilliant Sketch",
            descript: "Dribbble 上一位印尼設計師分享自己的 Sketch 文件和創作技巧。",
            tags: "sketch free resource 資源 免費 Bohemian Coding"
        }, {
            linkurl: "http://www.sketchgems.com/",
            thumbnail: "images/rscs/sketchmine_logo.jpg",
            name: "Sketch MINE",
            descript: "一位法國設計師收集的Sketch 資源，分類清晰，能一鍵免費下載",
            tags: "sketch free resource 資源 免費 Bohemian Coding"
        }, {
            linkurl: "http://www.sketchgems.com/",
            thumbnail: "images/rscs/sketchgems.jpg",
            name: "Sketch GEMS",
            descript: "一個用 Sketch 創作UI 套件和圖示的團隊網站，部分免費。",
            tags: "sketch free resource 資源 免費 Bohemian Coding"
        }, {
            linkurl: "http://sketchshortcuts.com/",
            thumbnail: "images/rscs/sketchshortcuts.jpg",
            name: "Sketch Shortcuts",
            descript: "最齊全的 Sketch 快捷鍵集合，網站最底部還有自定義快捷鍵的方法。",
            tags: "sketch Bohemian Coding shortcut 快速鍵"
        }, {
            linkurl: "http://sketchtips.tumblr.com/",
            thumbnail: "images/rscs/tumblrtips.jpg",
            name: "Sketch Tips",
            descript: "Sketch 的開發團隊 Bohemian Coding 在 tumblr 上維護的一個官方技巧博客。",
            tags: "sketch Bohemian Coding 技巧 Tips 密技"
        }, {
            linkurl: "http://sketchtricks.com/",
            thumbnail: "images/rscs/trickslogo.jpg",
            name: "Sketch Tricks",
            descript: "集合了一些 Sketch 的使用心得，同時提供針對Android 的素材。",
            tags: "sketch free resource 資源 免費 Bohemian Coding android"
        }, {
            linkurl: "https://github.com/sketchplugins/plugin-directory",
            thumbnail: "images/rscs/github.jpg",
            name: "Sketch Plugins",
            descript: "Github上由 Bomber Studios 製作的一系列外掛程式，幫助你更高效的使用Sketch。",
            tags: "sketch free 插件 外掛 plugin Bohemian Coding"
        }, {
            linkurl: "http://www.sketchcasts.net/",
            thumbnail: "images/rscs/sketchcasts.jpg",
            name: "SketchCasts",
            descript: "一個葡萄牙設計團隊創作的 Sketch 教學視頻，每週更新。",
            tags: "sketch Bohemian Coding tutorial 教學 learn"
        }, {
            linkurl: "https://medium.com/sketch-app/",
            thumbnail: "images/rscs/medium.jpg",
            name: "Sketch App Collect",
            descript: "Medium 上關於 Sketch 的 collection, 聚合了很多很棒的討論",
            tags: "sketch Bohemian Coding Medium 新聞 news"
        }, {
            linkurl: "http://aegeank.com/sketchactive/",
            thumbnail: "images/rscs/sketchactive.jpg",
            name: "SketchActive",
            descript: "用 Sketch 創作的360個向量圖示，免費下載。",
            tags: "sketch free resource 資源 免費 Bohemian Coding"
        }, ]
    }, 
    {
        category: "Prototype  原型設計",
        descript: "透過產品雛形設計，快速驗證你的想法！",
        items: [
            {
                isNew: true,
                linkurl: "https://www.flinto.com/mac",
                thumbnail: "images/rscs/flinto.jpg",
                name: "Flinto for Mac",
                descript: "Flinto 在 Mac 上的原型製作工具，幾乎大部分的效果都可以模擬，非常的威猛！",
                tags: "prototype 原型 雛形 快速 工具 溝通 "
            },
            {
                isNew: true,
                linkurl: "http://www.invisionapp.com",
                thumbnail: "images/rscs/invision.jpg",
                name: "InVision",
                descript: "讓 UI 設計師共享自己的原型同時與他人互動及討論，並獲得立即的意見回應。有了InVision以後，公司內部許多人都可以對設計師給出自己的意見。",
                tags: "prototype 原型 雛形 快速 工具 溝通 "
            },
            {
                isNew: true,
                linkurl: "https://marvelapp.com",
                thumbnail: "images/rscs/marvel.jpg",
                name: "Marvel App",
                descript: "好用又免費的原型製作工具，與 Sketch 搭配，快速製作產品原型！",
                tags: "prototype 原型 雛形 快速 工具 溝通 "
            },
        ]           
    }, 
    {
        category: "CC0 Stocks  免費圖庫",
        descript: "所有提供編輯、商用的 CC0 授權圖庫整理！",
        items: [
            {
                isNew: true,
                linkurl: "http://www.pexels.com/",
                color: "#7A9EAF",
                name: "Pexels",
                descript: "一網打盡所有免費圖",
                tags: "圖庫 stock photo image cc cc0 free gallery search 免費 圖片 授權"
            },
            {
                isNew: true,
                linkurl: "http://pixabay.com/",
                color: "#655989",
                name: "Pixabay",
                descript: "一網打盡所有免費圖",
                tags: "圖庫 stock photo image cc cc0 free gallery search 免費 圖片 授權"
            },
            {
                isNew: true,
                linkurl: "http://thestocks.im/",
                color: "#DE88A5",
                name: "The Stocks",
                descript: "一網打盡所有免費圖",
                tags: "圖庫 stock photo image cc cc0 free gallery search 免費 圖片 授權"
            },
            {
                isNew: true,
                linkurl: "http://finda.photo/",
                color: "#7FCBD7",
                name: "Find a photo",
                descript: "一站搜尋所有熱門免費圖庫網站",
                tags: "圖庫 stock photo image cc cc0 free gallery search 免費 圖片 授權"
            },
            {
                isNew: true,
                linkurl: "http://streetwill.co/",
                color: "#857EBB",
                name: "Street Will",
                descript: "一網打盡所有免費圖",
                tags: "圖庫 stock photo image cc cc0 free gallery search 免費 圖片 授權"
            },
            
            
        ]           
    }, 
    {
        category: "Tools  設計工具",
        descript: "省下時間，喝咖啡！",
        items: [
            {
                isNew: true,
                linkurl: "http://uifaces.com/",
                thumbnail: "images/rscs/uifaces.jpg",
                name: "UI Faces",
                descript: "設計時找不到適當的大頭照嗎？ 下次到 uifaces 來找找！",
                tags: "avatar photo 大頭照 face tool 工具 image 假頭像"
            },
            {
                isNew: true,
                linkurl: "http://nukesaq88.github.io/Pngyu/",
                color: "#97CCCD",
                name: "Pngyu",
                descript: "Mac 上最強 PNG 圖片壓縮軟體，使用方式非常簡單！",
                tags: "壓縮 Compress png 圖片 image picture reduce tool 工具"
            },
            {
                isNew: true,
                linkurl: "http://www.jpegmini.com/",
                thumbnail: "images/rscs/jpegmini.jpg",
                name: "JPEGmini",
                descript: "可樂罐是 Mac 上非常知名的軟體，也最強的 JPG 圖片壓縮軟體！",
                tags: "壓縮 Compress jpeg jpg 圖片 image picture reduce tool 工具"
            },
            {
                linkurl: "http://www.getmarkman.com//",
                thumbnail: "images/rscs/getmarkman.jpg",
                name: "馬克鰻",
                descript: "你還在用PS標注設計稿？馬上試試超高效的設計稿標註、測量工具",
                tags: "標注 標搞 Measure 標號 測量 效率"
            }, {
                linkurl: "http://www.fancynode.com/colorcube/",
                thumbnail: "images/rscs/colorcube.jpg",
                name: "配色神器ColorCube",
                descript: "簡單易用，支持下列功能：1.批量網頁截圖 2.屏幕吸管 3.色彩分析,色板導出",
                tags: "color picker, cube tool 工具"
            }, {
                linkurl: "http://macrabbit.com/slicy/",
                thumbnail: "images/rscs/slicy.jpg",
                name: "Slicy",
                descript: "自動切圖神器！減少了很多設計師的工作量！",
                tags: "切圖 slice tool 工具"
            }, {
                linkurl: "http://www.cutterman.cn/",
                thumbnail: "images/rscs/cutterman.jpg",
                name: "Cutterman",
                descript: "它是款Photoshop插件，幫助你快速完成切圖工作",
                tags: "切圖 slice tool 工具"
            }, {
                linkurl: "http://xscopeapp.com/",
                thumbnail: "images/rscs/xscopeapp.jpg",
                name: "xScope",
                descript: "xScope是一套強大的專業設計輔助工具，專門為設計師和開發人員設計。它是一個非常理想的測量，校準，檢查屏幕上的圖形和佈局的軟體",
                tags: "tool 工具"
            },
            {
                linkurl: "https://www.tailorbrands.com/",
                name: "Tailor",
                color: "#000",
                descript: "只要輸入你的品牌名稱，Tailor就會自動產生精美的Logo設計，設計師沒靈感的時候也可以來玩玩！",
                tags: "brand 品牌 字體 商標 cis 商業設計 名片 busienss logo tool 工具"
            },

            

        ]
    }, {
        category: "Guideline  設計規範",
        descript: "設計規範一定有它的道理，了解各種平台上的設計細節",
        items: [
        {
            isNew: true,
            linkurl: "https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/",
            thumbnail: "images/rscs/appleguide.jpg",
            name: "iOS Human Interface Guidelines",
            descript: "蘋果人機界面設計規範，設計師應該都要看過！",
            tags: "hig guideline 規範 ios 蘋果 apple 人機介面 ui"
        }, 
        {
            isNew: true,
            linkurl: "http://isux.tencent.com/ios8-human-interface-guidelines.html",
            thumbnail: "images/rscs/appleguide.jpg",
            name: "iOS 設計規範",
            descript: "由對岸翻譯的蘋果人機界面設計規範，翻譯的品質還不錯。",
            tags: "hig guideline 規範 ios 蘋果 apple 人機介面 ui 中文 翻譯"
        }, 

        
        {
            isNew: true,
            linkurl: "https://developer.apple.com/watch/human-interface-guidelines/",
            thumbnail: "images/rscs/applewatch.jpg",
            name: "Apple Watch HIG",
            descript: "蘋果手錶人機界面設計規範，也許你可以看看！",
            tags: "hig guideline 規範 ios 蘋果 apple 人機介面 ui watch 手錶"
        }, 
        {
            isNew: true,
            linkurl: "http://news.ipadown.com/41950",
            thumbnail: "images/rscs/applewatch.jpg",
            name: "Apple Watch 設計規範",
            descript: "蘋果手錶人機界面設計規範，也許你可以看看！",
            tags: "hig guideline 規範 ios 蘋果 apple 人機介面 ui 中文 翻譯 watch 手錶"
        }, 
        {
            isNew: true,
            linkurl: "https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/",
            thumbnail: "images/rscs/osx.jpg",
            name: "OSX HIG",
            descript: "蘋果作業系統人機界面設計規範，設計應用程式的你一定要讀讀！",
            tags: "hig guideline 規範 蘋果 apple 人機介面 ui osx"
        }, 
        {
            isNew: true,
            linkurl: "https://developer.android.com/design/wear/index.html",
            thumbnail: "images/rscs/androidwear.jpg",
            name: "Android Wear Design Guideline",
            descript: "Android Wear Design 的設計規範，設計手錶前可以來看看哦。",
            tags: "hig guideline 規範 google material wear 手錶 watch"
        },
        {
            isNew: true,
            linkurl: "http://www.ui.cn/detail/12022.html",
            thumbnail: "images/rscs/androidwear.jpg",
            name: "Android Wear 設計規範",
            descript: "Android Wear Design 的設計規範中文版，不習慣看英文的設計師可以看看哦！",
            tags: "hig guideline 規範 google material wear watch 手錶"
        },
        {
            linkurl: "http://www.google.com/design/spec/material-design/introduction.html",
            thumbnail: "images/rscs/material-design.jpg",
            name: "Google Material Design",
            descript: "Goolge Material Design 的設計規範，可以從裡頭學到很多很多。",
            tags: "hig guideline 規範 google material"
        }, {
            linkurl: "https://wcc723.gitbooks.io/google_design_translate/content/index.html",
            thumbnail: "images/rscs/material-design.jpg",
            name: "Google Material 設計規範",
            descript: "來自對岸翻譯的 Material Design 中文版！",
            tags: "hig guideline 規範 google material chinese 中文 翻譯"
        }, 

        ]
    }, {
        category: "Papers  設計用紙",
        descript: "印出來幫助你更快繪製草圖",
        items: [
        {
            isNew: true,
            linkurl: "http://medialoot.com/item/free-wireframe-sketch-sheets/",
            thumbnail: "images/rscs/medialoot.jpg",
            name: "Wireframe Sketch Sheets",
            descript: "著名設計資源網站 Medialoot 上的設計點點紙張，不容錯過！",
            tags: "sheet paper 紙 sketch"
        },
        {
            isNew: true,
            linkurl: "http://www.interfacesketch.com/",
            color: "#E48F24",
            name: "INTERFACE SKETCH",
            descript: "提供網頁、移動和平板電腦平台免費素描模板。",
            tags: "sheet paper 紙 sketch"
        }, 
        {
            isNew: true,
            linkurl: "http://www.pixle.pl/#post-64",
            color: "#CF5430",
            name: "Outline and Tapsize",
            descript: "提供 28 種網頁、移動和平板電腦平台免費素描模板。",
            tags: "sheet paper 紙 sketch"
        }, 
        {
            linkurl: "http://sneakpeekit.com/",
            color: "#7A3A8F",
            name: "Sneakpeekit",
            descript: "最完整的設計紙免費下載，有 Mobile、Tablet、Web、點點紙等等",
            tags: "sheet paper 紙 sketch"
        }, 
        ]
    }, ];

    var allTags = [];
    $scope.resources.forEach(function (rsc) {
        rsc.items.forEach(function (item) {
            if (item.tags) {
                var tags = item.tags.split(" ");
                allTags = allTags.concat(tags);
            }
        })
    });

    $scope.allTags = allTags.filter(onlyUnique).sort(function(a, b){
        if(a < b) return -1;
        if(a > b) return 1;
        return 0;
    });

    $scope.addTag = function (tag) {
        $scope.keyword += " " + tag;
    };

    // $scope.tagFilter = function(tag) {
    //     if ($scope.keyword.indexOf(tag) !== -1) {
    //         return false;
    //     }
    //     else {
    //         return true;
    //     }
    //     return false;
    // };
});


function onlyUnique(value, index, self) { 
    return self.indexOf(value) === index;
}


function throttle(fn, delay) {
    var timer = null;
    return function() {
        var context = this,
            args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    };
}