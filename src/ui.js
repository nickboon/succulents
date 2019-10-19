class Ui {
    download(filename, url) {
        var element = document.createElement('a');
        element.setAttribute('href', url);
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    setKeyListener(keyCode, action) {
        window.addEventListener('keydown', function (event) {
            if (event.keyCode === keyCode) {
                event.preventDefault();
                action();
            }
        });
    }
}

module.exports = Ui;