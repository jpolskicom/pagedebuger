
import html2canvas from 'html2canvas';

var before_loadtime = new Date().getTime();
window.onload = Pageloadtime;
function Pageloadtime() {
    var aftr_loadtime = new Date().getTime();
    window.pgloadtime = (aftr_loadtime - before_loadtime) / 1000
}

(async () => {

    ga(function (tracker) {
        console.log(tracker.get('clientId'));
    });


    const getScreenshot = async (scale = 1, quality = .9) => {
        let canvas = await html2canvas(document.querySelector('body'), {
            allowTaint: true,
            scale,
            useCORS: true,
        })
        return canvas.toDataURL('image/jpeg', quality);
    };

    const previewScreenshot = await getScreenshot(1, .15);


    var pagebytes = window.document.documentElement.innerHTML.length
    var pagekbytes = pagebytes;


    var metaDescription = document.querySelector('meta[name="description"]')
    metaDescription = metaDescription ? metaDescription.content : null;

    let m = document.querySelectorAll('meta')
    var meta = m && m.length > 0 ? [...m].map(e => {
        return {
            content: e.content,
            name: e.name
        }
    }) : []


    const getTechnologies = () => {
        var frameworks = [];
        const setFrameworkName = (name) => {
            console.log(name);
            frameworks = [...frameworks, name]
        }

        if (!!window.React ||
            !!document.querySelector('[data-reactroot], [data-reactid]'))
            setFrameworkName('React.js');

        if (!!document.querySelector('script[id=__NEXT_DATA__]'))
            setFrameworkName('Next.js');

        if (!!document.querySelector('[id=___gatsby]'))
            setFrameworkName('Gatsby.js');

        if (!!window.angular ||
            !!document.querySelector('.ng-binding, [ng-app], [data-ng-app], [ng-controller], [data-ng-controller], [ng-repeat], [data-ng-repeat]') ||
            !!document.querySelector('script[src*="angular.js"], script[src*="angular.min.js"]'))
            setFrameworkName('Angular.js');

        if (!!window.getAllAngularRootElements ||
            !!window.ng?.coreTokens?.NgZone)
            setFrameworkName('Angular 2+');

        if (!!window.Backbone) setFrameworkName('Backbone.js');
        if (!!window.Ember) setFrameworkName('Ember.js');
        if (!!window.Vue) setFrameworkName('Vue.js');
        if (!!window.Vuex) setFrameworkName('Vuex');
        if (!!window.Meteor) setFrameworkName('Meteor.js');
        if (!!window.Zepto) setFrameworkName('Zepto.js');
        if (!!window.jQuery) setFrameworkName('jQuery.js');
        if (!!window.__NUXT__) setFrameworkName('Nuxt.js');
        return frameworks;
    }

    chrome.runtime.onMessage.addListener(
        async (request, sender, sendResponse) => {
            switch (request.action) {
                case 'previewScreenshot':
                    await sendResponse(previewScreenshot);
                    break;
                default:
                    sendResponse({
                        height: screen.height,
                        width: screen.width,
                        url: window.location.href,
                        pgloadtime: window.pgloadtime,
                        pagekbytes,
                        frameworks: getTechnologies(),
                        seo: {
                            title: document.title,
                            meta
                        }
                    });
                    break;
            }
        }
    );






})();