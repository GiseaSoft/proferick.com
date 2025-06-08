function CodeEditor(id) {
    const _self = this;

    this.id = id;
    this.code_editor   = {};
    this.editorTabset  = {};
    this.editorTabs    = {};
    this.editorDisplay = {};
    this.editorWindows = {};

    this.init = () => {
        _self.code_editor   = document.querySelector(`#${id}.editor`);
        _self.editorTabset  = _self.code_editor.querySelector('.editor_tabset');
        _self.editorTabs    = _self.editorTabset.querySelectorAll('li');
        _self.editorDisplay = _self.code_editor.querySelector('.editor_display');
        _self.editorWindows = _self.editorDisplay.querySelectorAll('.editor_window');

        const scrollIntoView = false;
        const updateUrl      = true;

        _self.editorTabset.addEventListener('click', (e) => {
            const clickedLi = e.target.closest('li');
            if (!clickedLi) return;

            const clickedTab = clickedLi.querySelector('span');
            const targetId   = clickedTab.getAttribute('data-target').replace('#editor_window-', '');

            _self.activateTab(targetId, scrollIntoView, updateUrl);
        });

        _self.setupDraggable();
        _self.onStart();
    }

    this.setupDraggable= () => {
        let isDown = false;
        let startX, scrollLeft;

        _self.editorTabset.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - _self.editorTabset.offsetLeft;
            scrollLeft = _self.editorTabset.scrollLeft;
        });

        _self.editorTabset.addEventListener('mouseleave', () => {
            isDown = false;
            _self.editorTabset.classList.remove('dragging');
        });

        _self.editorTabset.addEventListener('mouseup', () => {
            isDown = false;
            _self.editorTabset.classList.remove('dragging');
        });

        _self.editorTabset.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            _self.editorTabset.classList.add('dragging');
            const x = e.pageX - _self.editorTabset.offsetLeft;
            const walk = x - startX;
            _self.editorTabset.scrollLeft = scrollLeft - walk;
        });
    }

    this.activateTab = (targetId, scrollIntoView = false, updateUrl = false) => {
        const targetSelector = `#editor_window-${targetId}`;
        const activeTab      = _self.code_editor.querySelector(`span[data-target="${targetSelector}"]`).closest('li');
        const activeWindow   = _self.editorDisplay.querySelector(targetSelector);
        if (!activeWindow) return;

        _self.editorTabs.forEach(tab => {
            const tabSpan    = tab.querySelector('span');
            const dataTarget = tabSpan.getAttribute('data-target');
            const isActive   = dataTarget === targetSelector;

            tab.removeAttribute('aria-selected');
            if (isActive && scrollIntoView) {
                _self.code_editor.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        _self.editorWindows.forEach(editorWindow => editorWindow.setAttribute('hidden', ''));
        activeTab.setAttribute('aria-selected', 'true');
        activeWindow.removeAttribute('hidden');

        //if (updateUrl) _self.updateUrl(targetId);
    }

    this.onStart = () => {
        if (!window.location.search) return;
        const urlParams      = new URLSearchParams(window.location.search);
        const targetEditor   = urlParams.get('tabset');
        const targetTab      = urlParams.get('tab');
        const scrollIntoView = true;

        const firstTab      = _self.editorTabs[0].querySelector('span');
        const firstTargetId = firstTab.getAttribute('data-target').replace('#editor_window-', '');

        if (targetTab && targetEditor === _self.id) {
            _self.activateTab(targetTab, scrollIntoView);
        } else {  
            _self.activateTab(firstTargetId); // opens first tab on load
        }
    }

    this.updateUrl = (targetTab) => {
        const url = new URL(window.location);
        url.searchParams.set('tabset', _self.id);
        url.searchParams.set('tab', targetTab);
        history.replaceState(null, '', url);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    let editors = document.querySelectorAll('.editor');

    editors.forEach(editor => {
        const id = editor.getAttribute('id');
        const thisInstance = new CodeEditor(id);
        thisInstance.init();
    });
});