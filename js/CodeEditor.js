function CodeEditor(id, name) {
    const _self = this;

    this.id = id;
    this.name = name;
    
    this.code_editor   = document.querySelector(`#editor_${id}.editor`);
    this.sectionParent = _self.code_editor.parentElement;
    this.editorTabset  = _self.code_editor.querySelector('.editor_tabset');
    this.editorTabs    = _self.editorTabset.querySelectorAll('li');
    this.editorDisplay = _self.code_editor.querySelector('.editor_display');
    this.editorWindows = _self.editorDisplay.querySelectorAll('.editor_window');

    this.firstTab      = _self.editorTabs[0].querySelector('span');
    this.firstTargetId = _self.firstTab.getAttribute('data-target').replace('#editor_window-', '');

    this.initSetup = () => {
        _self.activateTab(_self.firstTargetId); // opens first tab on load
        _self.listenHistoryStateChange();

        _self.editorTabset.addEventListener('click', (e) => {
            const clickedLi = e.target.closest('li');
            if (!clickedLi) return;

            const clickedTab = clickedLi.querySelector('span');
            const targetId   = clickedTab.getAttribute('data-target').replace('#editor_window-', '');

            _self.activateTab(targetId);
        });
    }

    this.activateTab = (targetId, scrollIntoView = false) => {
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
                _self.sectionParent.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });

        _self.editorWindows.forEach(editorWindow => editorWindow.setAttribute('hidden', ''));
        activeTab.setAttribute('aria-selected', 'true');
        activeWindow.removeAttribute('hidden');
    }

    this.listenHistoryStateChange = () => {
        window.addEventListener('url-change', () => {
            const urlParams   = new URLSearchParams(window.location.search);
            const courseParam = urlParams.get('course');
            const editorParam = urlParams.get('editor');

            if (courseParam && editorParam === _self.name.toString()) {
                _self.activateTab(courseParam, true);
            }
        });
    };

    document.addEventListener("DOMContentLoaded", _self.initSetup);
}