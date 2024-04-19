 document.addEventListener('DOMContentLoaded', () => {

    UI.exe.nav = () => {
        const dep1Links = document.querySelectorAll('.nav-dep1-link');
        const dep2Links = document.querySelectorAll('.nav-dep2-link');
        const _body = document.body;
        const _header = document.querySelector('.base-header');
        const _firstItem = _header.querySelector('.logo');
        const _lastItem = _header.querySelector('.btn-etc-nav');
        const searchBtn = _header.querySelector('.btn-search');
        const _btns = _header.querySelectorAll('button, a');

        const keyStart = (e) => {
           (e.shiftKey && e.keyCode == 9) && actClose();
        }
        const keyEnd = (e) => {
            (!e.shiftKey && e.keyCode == 9) && actClose();
        }
        const onLine = (v) => {
            const _base = !!v.currentTarget ? v.currentTarget : v;
            const wrapDep1 = _base.closest('.nav-dep1-item');
            const dep1 = wrapDep1.querySelector('.nav-dep1-link');
            const dep1_on = document.querySelector('.nav-dep1-link[data-state="on"]');

            !!dep1_on ? dep1_on.dataset.state = 'off' : '';
            dep1.dataset.state = 'on';
        }
        const isIn = (e) => {
            const _this = e.currentTarget;
            const isHeader = !!_this.closest('.base-header');
            onLine(_this);
            (isHeader) ? _body.dataset.nav = 'open' : _body.dataset.nav = 'close';
        }
        const actClose = (e) => {
            _body.dataset.nav = 'close';
        }
        const actOpen = (e) => {
            const _this = e.currentTarget;

            onLine(_this);
            _body.dataset.nav = 'open';
            _header.addEventListener('mouseleave', actClose);
            _lastItem.addEventListener('keydown', keyEnd);
            _firstItem.addEventListener('keydown', keyStart);
        }

        for (let item of dep1Links) {
            item.addEventListener('mouseover', actOpen);
            item.addEventListener('focus', actOpen);
        }
        for (let item of _btns) {
            item.addEventListener('keyup', isIn);
        }
        for (let item of dep2Links) {
            item.addEventListener('mouseover', onLine);
        }
        searchBtn.addEventListener('click', UI.exe.search.show);
    }
    UI.callback.nav = (v) => {
        console.log(v.state);
        const wrap = document.querySelector('html');

        if (v.state === 'true') {
            wrap.dataset.nav = 'open';
        } else {
            wrap.dataset.nav = 'close';
        }
    }

    //header
    if (document.querySelector('[data-id="header"]')) {
        UI.parts.include({
            src: 'common/header.html',
            id: 'header',
            callback:() => {
                UI.exe.nav();
                UI.exe.toggle = new ToggleUI();
                UI.callback.toggle_nav = (v) => {
                    UI.exe.allMenu.show();
                    // (v.state === 'true') ? UI.exe.allMenu.show() : UI.exe.allMenu.hide();
                }
            }
        });
    }
    //footer
    if (document.querySelector('[data-id="footer"]')) {
        UI.parts.include({
            src: 'common/footer.html',
            id: 'footer',
            callback:() => {
                const btnTop = document.querySelector('.btn-top');
                btnTop.addEventListener('click', () => {
                    document.querySelector('html').scrollTo({
						top: 0,
						behavior: 'smooth'
					});
                });
            }
        });
    }
   

    //전체메뉴
    UI.exe.allMenu = new Layer({
        id :'modal_allMenu',
        type: 'modal',
        src: './common/modal_allMenu',
        callback: () => {
            if (!UI.exe.navMobile) {
                UI.exe.navMobile = new Accordion({
                    id :'navMobile',
                    current: 0,
                    callback: (v) => {
                        console.log('callback:', v);
                    }
                });
            }
        }
    });
    //검색
    UI.exe.search = new Layer({
        id :'modal_search',
        type: 'modal',
        src: './common/modal_search',
        callback: () => {
            
        }
    });
});