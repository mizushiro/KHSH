 document.addEventListener('DOMContentLoaded', () => {
    UI.parts.include({
        src: 'header.html',
        dataId: 'header',
        callback:() => {
            UI.exe.toggle = new ToggleUI();

            UI.exe.accordion = new Accordion({
                id :'navAcco',
                current: 0,
                callback: (v) => {
                    console.log('callback:', v);
                }
            });
        }
    });
    UI.parts.include({
        src: 'footer.html',
        dataId: 'footer',
        callback:() => {
            const el_top = document.querySelector('.floating-top');

            el_top.addEventListener('click', () => {
                UI.scroll.move({
                    top: 0
                })
            });

            UI.exe.toggle = new ToggleUI();
            UI.exe.modal_sass_0213 = new Layer({
                id :'modal_sass_0213',
                type: 'modal',
                src: 'SASS_0213_modal.html',
                callback: () => {
                }
            });
        }
    });

    UI.callback.nav = (v) => {
        console.log(v.state);
        const wrap = document.querySelector('html');

        if (v.state === 'true') {
            wrap.dataset.nav = 'open';
        } else {
            wrap.dataset.nav = 'close';
        }
    }
});