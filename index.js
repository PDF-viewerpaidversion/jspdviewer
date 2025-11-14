function pdf() {
    const pfdinfo; //add pdf 
    var pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = ''; // upgrade for cMapUrl

    const pdfContainer = document.getElementById('pdf-container'); // Container for all pages
    pdfContainer.innerHTML = ''; // Clear previous content

    pdfjsLib.getDocument({
        url: '', //add your pdf url
        cMapUrl: '', // upgrade for cMapUrl
        cMapPacked: true,
    }).promise.then(function (pdf) {
        const totalPages = pdf.numPages;

        // Render each page
        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber++) {
            pdf.getPage(pageNumber).then(function (page) {
                const scale = 1.5;
                const viewport = page.getViewport({ scale: scale });

                // Create canvas for each page
                const canvas = document.createElement('canvas');
                canvas.classList.add('pdf-page');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const context = canvas.getContext('2d');
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                // Append canvas to container
                pdfContainer.appendChild(canvas);

                // Render the page
                page.render(renderContext).promise.then(function () {
                    // Hide loader once all pages are rendered
                    if (pageNumber === totalPages) {
                        document.getElementById('loader').style.display = 'none';
                    }
                });
            });
        }
    }).catch(function (error) {
        console.error(error);
        // Hide loader
        document.getElementById('loader').style.display = 'none';
    });
}
