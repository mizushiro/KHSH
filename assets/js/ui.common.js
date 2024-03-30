 document.addEventListener('DOMContentLoaded', () => {
    console.log('header');

    UI.exe.nav = () => {
        const dep1Links = document.querySelectorAll('.nav-dep1-link');
        const dep2Links = document.querySelectorAll('.nav-dep2-link');
        const _body = document.body;
        const _header = document.querySelector('.base-header');
        const _firstItem = _header.querySelector('.logo');
        const _lastItem = _header.querySelector('.btn-search');
        const _btns = _header.querySelectorAll('button, a');

        const keyStart = (e) => {
            if (e.shiftKey && e.keyCode == 9) {
                actClose();
            }
        }
        const keyEnd = (e) => {
            if (!e.shiftKey && e.keyCode == 9) {
                actClose();
            }
        }

        const onLIne = (v) => {
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
            onLIne(_this)
            (isHeader) ? _body.dataset.nav = 'open' : _body.dataset.nav = 'close';
        }
        const actClose = (e) => {
            _body.dataset.nav = 'close';
        }
        const actOpen = (e) => {
            const _this = e.currentTarget;

            onLIne(_this);
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
            item.addEventListener('mouseover', onLIne);
        }
    }

    UI.parts.include({
        src: 'common/header.html',
        id: 'header',
        callback:() => {
            UI.exe.nav();
        }
    });


   
});